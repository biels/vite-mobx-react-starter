import "reflect-metadata";
import { configure } from "mobx";
import { container, singleton } from "tsyringe";
import { AppStore } from "../../src/AppStore.ts";

configure({ enforceActions: "never" });

// Constructor injection must survive both development and production transforms.
@singleton()
export class StoreWithDependency {
    constructor(readonly appStore: AppStore) {}
}

export const resolveStoreWithDependency = () => container.resolve(StoreWithDependency);

export { autorun, isObservableProp } from "mobx";
export { useAppStore } from "../../src/AppStore.ts";
export { ThemeStore } from "../../src/ThemeStore.ts";
