import {container, singleton} from "tsyringe";
import {makeObservable, observable} from "mobx";


export let useAppStore = () => {
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

    }

    setCounter(param: any) {
        this.count = param;
    }
}
