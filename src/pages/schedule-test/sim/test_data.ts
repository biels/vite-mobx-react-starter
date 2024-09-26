import {TaskData} from "./Simulation.ts";

export let testProjectTasks: TaskData[] = [
    {
        name: "Task 1 - 30 min",
        duration: 30,
        elapsed: 0,
        deadline: 60,
    }
].map((t, i) => ({ id: `${i}`, ...t}));
