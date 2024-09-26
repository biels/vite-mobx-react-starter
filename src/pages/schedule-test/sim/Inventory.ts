// Inventory
interface Item {
    id: number
    name: string
    volume: number
    weight: number
    labels?: string[]
    flags?: {
        pocket: boolean
        container: boolean
        wearable: boolean
        consumable: boolean
        stackable: boolean
        // Other flags
    }
}

/// A stack of items, can be represented as a u64
interface ItemStack {
    itemId: number // u16
    containerIdx: number // u16
    containerSlot: number // u8
    amount: number // u8
    data: any // u16
}

interface ItemStackUpdate {
    itemStackIdx: number // u16
    action: "add" | "remove" | "update" // u8
    amount?: number // u8
    data?: any // u16
}

let inventoryTest = () => {
    let items: Item[] = [
        {
            id: 0,
            name: "Item 0",
            volume: 1,
            weight: 1,
        }
    ]


}
