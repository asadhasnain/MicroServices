import { InventoryItem } from "../models/InventoryItem";

let inventory: InventoryItem[] = [
  { id: 1, name: "Laptop", quantity: 10, price: 1200 },
  { id: 2, name: "Mouse", quantity: 50, price: 20 },
];

export const getAllItems = (): InventoryItem[] => {
  return inventory;
};

export const getItemById = (id: number): InventoryItem | undefined => {
  return inventory.find(item => item.id === id);
};

export const addItem = (item: InventoryItem): InventoryItem => {
  inventory.push(item);
  return item;
};

export const updateItem = (id: number, updatedData: Partial<InventoryItem>): InventoryItem | null => {

  const index = inventory.findIndex(item => item.id === id);
  console.log(`index: ${index}`);
    if (index === -1) return null;

    // Always start with the existing item
    const currentItem = inventory[index];

    // If quantity is provided, subtract instead of overwrite
    let newQuantity = currentItem.quantity;
    if (updatedData.quantity !== undefined) {
      newQuantity = currentItem.quantity - updatedData.quantity;

      // prevent going below 0
      if (newQuantity < 0) {
        throw new Error(`❌ Not enough stock for item ${id}`);
      }
    }

    // Merge everything else (except quantity which we computed above)
    inventory[index] = {
      ...currentItem,
      ...updatedData,
      quantity: newQuantity,
    };

    console.log(inventory[index]);

    return inventory[index];
};

export const deleteItem = (id: number): boolean => {
  const index = inventory.findIndex(item => item.id === id);
  if (index === -1) return false;

  inventory.splice(index, 1);
  return true;
};
