import {container, singleton} from "tsyringe";
import {makeObservable, observable} from "mobx";
import {ExampleLogic} from "./example-logic/ExampleLogic.ts";


export const useExampleStore = () => {
    return container.resolve(ExampleStore);
}

@singleton()
export class ExampleStore {

    @observable
    loading = false;

    exampleLogic: ExampleLogic = new ExampleLogic();

    constructor() {
        makeObservable(this);
        this.init();
    }

    init() {
        // Initialize starter-specific store state here.
    }
}
