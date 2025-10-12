import {container, singleton} from "tsyringe";
import {makeObservable, observable} from "mobx";

export let useThemeStore = () => {
    return container.resolve(ThemeStore);
}

export type Theme = 'light' | 'dark';

@singleton()
export class ThemeStore {

    @observable
    theme: Theme = 'light';

    constructor() {
        makeObservable(this);
        this.init();
    }

    init() {
        // Check for saved theme preference or default to system preference
        const savedTheme = localStorage.getItem('theme') as Theme;
        if (savedTheme) {
            this.theme = savedTheme;
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.theme = 'dark';
        }
        this.applyTheme();
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        this.applyTheme();
        localStorage.setItem('theme', this.theme);
    }

    setTheme(theme: Theme) {
        this.theme = theme;
        this.applyTheme();
        localStorage.setItem('theme', theme);
    }

    applyTheme() {
        if (this.theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }
}
