// Example type definitions - replace with your domain types

export interface ExampleEntity {
    id: number
    name: string
    properties: {
        value1: number
        value2: number
    }
    tags?: string[]
    flags?: {
        active: boolean
        visible: boolean
        editable: boolean
        // Add your custom flags here
    }
}

export interface ExampleCollection {
    entityId: number
    collectionIndex: number
    position: number
    quantity: number
    metadata: any
}

export interface ExampleUpdate {
    updateId: number
    action: "create" | "update" | "delete"
    payload?: any
    timestamp?: number
}

// Example test function - replace with your tests
export const exampleTest = () => {
    const entities: ExampleEntity[] = [
        {
            id: 1,
            name: "Example Entity",
            properties: {
                value1: 10,
                value2: 20
            }
        }
    ]
    
    return entities
}
