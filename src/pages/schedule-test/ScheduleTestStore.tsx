import {container, singleton} from "tsyringe";
import {makeObservable, observable} from "mobx";
import {Simulation} from "./sim/Simulation.ts";


export let useScheduleTestStore = () => {
    return container.resolve(ScheduleTestStore);
}

// @ts-ignore
@singleton()
export class ScheduleTestStore {

    @observable
    loading = false;

    sim: Simulation = new Simulation();

    constructor() {
        this.init();
        makeObservable(this);
    }


    init() {
        window['sim'] = this.sim;
    }
}
