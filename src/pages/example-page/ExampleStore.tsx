import {container, singleton} from "tsyringe";
import {makeObservable, observable} from "mobx";
import {ExampleLogic} from "./example-logic/ExampleLogic.ts";


export let useExampleStore = () => {
    return container.resolve(ExampleStore);
}

// @ts-ignore
@singleton()
export class ExampleStore {

    @observable
    loading = false;

    exampleLogic: ExampleLogic = new ExampleLogic();

    constructor() {
        this.init();
        makeObservable(this);
    }


    init() {
        window['exampleLogic'] = this.exampleLogic;
    }
}
