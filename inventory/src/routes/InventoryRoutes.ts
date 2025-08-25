import { Router } from "express";
import { getItems, getItem, createItem, updateItem, deleteItem } from "../controllers/InventoryController";

const router: Router = Router();

router.get("/", getItems);
router.get("/:id", getItem);
router.post("/", createItem);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

export default router;
