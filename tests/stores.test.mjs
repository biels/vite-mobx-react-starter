import "reflect-metadata";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import { build, createServer } from "vite";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const fixturePath = fileURLToPath(new URL("./fixtures/Stores.ts", import.meta.url));

function verifyStores(stores) {
    const appStore = stores.useAppStore();
    assert.equal(appStore, stores.useAppStore(), "DI resolves the same singleton");
    assert.equal(stores.resolveStoreWithDependency().appStore, appStore,
        "constructor metadata enables dependency injection");
    assert.equal(stores.isObservableProp(appStore, "count"), true);

    const observedCounts = [];
    const disposeCounterReaction = stores.autorun(() => observedCounts.push(appStore.count));
    try {
        appStore.setCounter(1);
        appStore.setCounter(2);
        assert.deepEqual(observedCounts, [0, 1, 2], "decorated state remains reactive");
    } finally {
        disposeCounterReaction();
        appStore.setCounter(0);
    }
}

function verifyTheme(ThemeStore) {
    const previousGlobals = new Map(
        ["window", "document", "localStorage"].map(name => [name, Object.getOwnPropertyDescriptor(globalThis, name)]),
    );
    const preferences = new Map([["darkMode", "true"]]);
    const rootClasses = new Set();
    let preferenceChangeListener;
    const mediaQuery = {
        matches: false,
        addEventListener(event, listener) {
            assert.equal(event, "change");
            preferenceChangeListener = listener;
        },
    };
    const browserGlobals = {
        window: {
            matchMedia: () => mediaQuery,
            setTimeout: callback => callback(),
        },
        document: {
            documentElement: {
                classList: {
                    add: className => rootClasses.add(className),
                    remove: className => rootClasses.delete(className),
                },
            },
        },
        localStorage: {
            getItem: key => preferences.get(key) ?? null,
            setItem: (key, value) => preferences.set(key, value),
            removeItem: key => preferences.delete(key),
        },
    };

    for (const [name, value] of Object.entries(browserGlobals)) {
        Object.defineProperty(globalThis, name, { value, configurable: true });
    }
    try {
        const themeStore = new ThemeStore();
        assert.equal(themeStore.darkModeActive, true, "saved preference overrides the system theme");
        assert.equal(rootClasses.has("dark"), true);

        themeStore.toggleDarkMode();
        assert.equal(themeStore.darkModeActive, false);
        assert.equal(preferences.get("darkMode"), "false");
        assert.equal(rootClasses.has("dark"), false);
        preferenceChangeListener({ matches: true });
        assert.equal(themeStore.darkModeActive, false, "system changes preserve manual preference");

        mediaQuery.matches = true;
        themeStore.toggleDarkMode({ shiftKey: true });
        assert.equal(preferences.has("darkMode"), false, "shift-click restores automatic mode");
        assert.equal(rootClasses.has("dark"), true);
        preferenceChangeListener({ matches: false });
        assert.equal(themeStore.darkModeActive, false);
        assert.equal(rootClasses.has("dark"), false, "automatic mode follows system changes");
    } finally {
        for (const [name, descriptor] of previousGlobals) {
            if (descriptor) Object.defineProperty(globalThis, name, descriptor);
            else delete globalThis[name];
        }
    }
}

test("development transforms preserve decorators, injection, and theme behavior", async () => {
    const developmentServer = await createServer({
        root: projectRoot,
        cacheDir: `${projectRoot}node_modules/.vite-tests`,
        logLevel: "silent",
        server: { middlewareMode: true, hmr: false },
    });
    try {
        const stores = await developmentServer.ssrLoadModule(fixturePath);
        verifyStores(stores);
        verifyTheme(stores.ThemeStore);
    } finally {
        await developmentServer.close();
    }
});

test("production bundles preserve decorators, injection, and theme behavior", async () => {
    const buildResult = await build({
        root: projectRoot,
        logLevel: "silent",
        build: {
            write: false,
            minify: true,
            lib: { entry: fixturePath, formats: ["es"] },
        },
    });
    const bundle = buildResult[0].output.find(chunk => chunk.type === "chunk" && chunk.isEntry);
    assert.ok(bundle, "production build produced an entry bundle");
    const stores = await import(`data:text/javascript;base64,${Buffer.from(bundle.code).toString("base64")}`);
    verifyStores(stores);
    verifyTheme(stores.ThemeStore);
});
