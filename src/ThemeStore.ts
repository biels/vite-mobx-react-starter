import {container, singleton} from "tsyringe";
import {action, makeObservable, observable, reaction} from "mobx";

export let useThemeStore = () => {
    return container.resolve(ThemeStore);
}

@singleton()
export class ThemeStore {

    @observable
    darkModeActive = false;

    private prefersDarkQuery: MediaQueryList | null = null;

    constructor() {
        makeObservable(this);
        this.init();
    }

    init() {
        this.prefersDarkQuery = window.matchMedia
            ? window.matchMedia('(prefers-color-scheme: dark)')
            : null;

        this.loadDarkModePreference();

        if (this.prefersDarkQuery) {
            if (typeof this.prefersDarkQuery.addEventListener === 'function') {
                this.prefersDarkQuery.addEventListener('change', this.onSystemPreferenceChange);
            } else if (typeof (this.prefersDarkQuery as any).addListener === 'function') {
                (this.prefersDarkQuery as any).addListener(this.onSystemPreferenceChange);
            }
        }

        reaction(
            () => this.darkModeActive,
            (isDark) => this.applyDarkModeClass(isDark),
            {fireImmediately: true},
        );
    }

    private isAutoModeActive() {
        return localStorage.getItem('darkMode') === null;
    }

    @action
    toggleDarkMode(e?: { shiftKey?: boolean }) {
        if (e?.shiftKey) {
            this.setDarkModeAuto();
            return;
        }
        this.darkModeActive = !this.darkModeActive;
        localStorage.setItem('darkMode', this.darkModeActive.toString());
    }

    @action
    setDarkModeAuto() {
        this.darkModeActive = this.prefersDarkQuery?.matches ?? false;
        localStorage.removeItem('darkMode');
    }

    private loadDarkModePreference() {
        const savedPreference = localStorage.getItem('darkMode');
        if (savedPreference !== null) {
            this.darkModeActive = savedPreference === 'true';
            return;
        }
        this.darkModeActive = this.prefersDarkQuery?.matches ?? false;
    }

    private onSystemPreferenceChange = (event: MediaQueryListEvent) => {
        if (!this.isAutoModeActive()) {
            return;
        }
        this.darkModeActive = event.matches;
    };

    private applyDarkModeClass(isDark: boolean) {
        const root = document.documentElement;
        root.classList.add('theme-switching');
        if (isDark) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        window.setTimeout(() => root.classList.remove('theme-switching'), 0);
    }
}
