import { Request, Response } from "express";
import * as inventoryService from "../services/InventoryService";

export const getItems = (req: Request, res: Response): void => {
  res.json(inventoryService.getAllItems());
};

export const getItem = (req: Request, res: Response): void => {
  const id = parseInt(req.params.id);
  const item = inventoryService.getItemById(id);

  if (!item) {
    res.status(404).json({ message: "Item not found" });
    return;
  }

  res.json(item);
};

export const createItem = (req: Request, res: Response): void => {
  const { id, name, quantity, price } = req.body;
  const newItem = inventoryService.addItem({ id, name, quantity, price });
  res.status(201).json(newItem);
};

export const updateItem = (req: Request, res: Response): void => {
  const id = parseInt(req.params.id);
  const updatedItem = inventoryService.updateItem(id, req.body);

  if (!updatedItem) {
    res.status(404).json({ message: "Item not found" });
    return;
  }

  res.json(updatedItem);
};

export const deleteItem = (req: Request, res: Response): void => {
  const id = parseInt(req.params.id);
  const deleted = inventoryService.deleteItem(id);

  if (!deleted) {
    res.status(404).json({ message: "Item not found" });
    return;
  }

  res.status(204).send();
};
