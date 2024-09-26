import {testProjectTasks} from "./test_data.ts";

type Minutes = number;
type AbsMinutes = number;

// Tasks interfaces
export interface TaskData {
    id: string;
    name: string;
    duration: Minutes;
    elapsed?: Minutes;
    deadline?: AbsMinutes;
    fixed_at?: AbsMinutes;
}

interface Task {
    data: TaskData;
    elapsed: Minutes;
}

interface TimeFrame {
    task: Task
    duration: Minutes
}


// MCTS interfaces
interface Node {
    parent: Node | null;
    children: Node[];
    // State
    timeFrame: TimeFrame;
}




export class Simulation {
    getAllTasks() {
        // Call rust parser and get tasks from .tasks file
        return testProjectTasks
    }

    getRemainingTasks() {
        return this.getAllTasks().filter(t => t.elapsed != t.duration)
    }

    genSchedule() {
        let tasks = this.getAllTasks()

    }

    /**
     * Creates a new node
     */
    applyTimeFrame(node: Node, timeFrame: TimeFrame) {
        const newNode = {
            parent: node,
            children: [],
            timeFrame: timeFrame
        }
        node.children.push(newNode)
        return newNode
    }

}
