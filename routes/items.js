/**
 * Routes
 * Route configuration for the items endpoints
 */

import { Router } from "express";
import { ITEMS_ENDPOINT, ITEM_DETAILS_ENDPOINT } from "../constants.js";
import { searchItems, displayItem } from "../controllers/index.js";

export const itemsRouter = Router();
itemsRouter.get(ITEMS_ENDPOINT, searchItems);
itemsRouter.get(ITEM_DETAILS_ENDPOINT, displayItem);
