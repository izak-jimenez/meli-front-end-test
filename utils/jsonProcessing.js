/**
 * JSON Processing functions
 * Contains all the functions necessary for processing JSON data
 */

import { Author, Item, Price } from "../models/common/index.js";
import {
  ItemsResponse,
  ItemDetailsResponse,
} from "../models/response/index.js";
import { splitFloatingPointNumber } from "./math.js";
import { MAX_RESULTS_COUNT } from "../constants.js";

/**
 * generateItemsResponse function
 * @param {any} mlaItemsResponse
 * @return {*}
 */
export const generateItemsResponse = (mlaItemsResponse) => {
  const items = [];
  const author = new Author("Juan", "Pérez");
  const category = mlaItemsResponse.filters.filter(
    (filter) => filter.id === "category"
  );
  const extractedCategoryArray =
    category.length > 0 ? category[0].values[0].path_from_root : [];

  const reducedResults = mlaItemsResponse.results.slice(0, MAX_RESULTS_COUNT);

  reducedResults.map((item) => {
    const splitAmount = splitFloatingPointNumber(item.price);
    const price = new Price(
      item.currency_id,
      splitAmount.integer,
      splitAmount.decimal
    );
    const itemToInsert = new Item(
      item.id,
      item.title,
      price,
      item.thumbnail,
      item.condition,
      item.shipping.free_shipping,
      null,
      null,
      item.address.state_name
    );
    items.push(itemToInsert);
  });
  const itemsJsonResponse = new ItemsResponse(
    author,
    extractedCategoryArray,
    items
  );
  return itemsJsonResponse;
};

export const generateItemDetailResponse = (
  mlaItemDetailsResponse,
  mlaItemDescriptionResponse
) => {
  const author = new Author("Juan", "Pérez");
  const splitAmount = splitFloatingPointNumber(mlaItemDetailsResponse.price);
  const price = new Price(
    mlaItemDetailsResponse.currency_id,
    splitAmount.integer,
    splitAmount.decimal
  );
  const pictureStringsArray = [];
  mlaItemDetailsResponse.pictures.map((picture) => {
    pictureStringsArray.push(picture.url);
  });
  const picturesString = pictureStringsArray.toString();
  const item = new Item(
    mlaItemDetailsResponse.id,
    mlaItemDetailsResponse.title,
    price,
    picturesString,
    mlaItemDetailsResponse.condition,
    mlaItemDetailsResponse.shipping.free_shipping,
    mlaItemDetailsResponse.sold_quantity,
    mlaItemDescriptionResponse.plain_text
  );
  const itemDetailsJsonResponse = new ItemDetailsResponse(author, item);
  return itemDetailsJsonResponse;
};
