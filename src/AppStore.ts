import {container, singleton} from "tsyringe";
import {makeObservable, observable} from "mobx";


export let useAppStore = () => {
    return container.resolve(AppStore);
}

// @ts-ignore
@singleton()
export class AppStore {

    @observable
    loading = false;

    @observable
    count = 0;

    constructor() {
        this.init();
        makeObservable(this);
    }


    init() {

    }

    setCounter(param: any) {
        this.count = param;
    }
}
