import {container, singleton} from "tsyringe";
import {makeObservable, observable} from "mobx";


export const useAppStore = () => {
    return container.resolve(AppStore);
}

@singleton()
export class AppStore {

    @observable
    loading = false;

    @observable
    count = 0;

    constructor() {
        makeObservable(this);
        this.init();
    }


    init() {
        // Reserved for starter-specific initialization.
    }

    setCounter(nextCount: number) {
        this.count = nextCount;
    }
}
