import {exampleData} from "./example_data.ts";

// Example interfaces - replace with your own domain models
export interface ExampleItem {
    id: string;
    name: string;
    value: number;
    metadata?: Record<string, any>;
}

interface ExampleState {
    items: ExampleItem[];
    currentIndex: number;
}

interface ExampleNode {
    parent: ExampleNode | null;
    children: ExampleNode[];
    state: ExampleState;
}




export class ExampleLogic {
    getExampleData() {
        // Example method - replace with your logic
        return exampleData
    }

    processItems(items: ExampleItem[]) {
        // Example processing logic
        return items.filter(item => item.value > 0)
    }

    /**
     * Example tree operation - replace with your logic
     */
    addChildNode(node: ExampleNode, state: ExampleState) {
        const newNode = {
            parent: node,
            children: [],
            state: state
        }
        node.children.push(newNode)
        return newNode
    }

}
