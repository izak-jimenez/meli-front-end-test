/**
 * Items Controller
 * The items controller handles all of the requests routed via the items/* routes
 */

import fetch from "cross-fetch";
import { response } from "express";
import {
  MELI_QUERY_ENDPOINT,
  MELI_ITEM_DETAILS_ENDPOINT,
  MELI_ITEM_DESCRIPTION_ENDPOINT,
} from "../constants.js";
import {
  generateItemsResponse,
  generateItemDetailResponse,
} from "../utils/jsonProcessing.js";

/**
 * searchItems function
 * Calls the MLA API with a query parameter to receive a list of results
 * @param {any} req
 * @param {any} res
 * @return {ItemsResponse} processedJsonResponse
 */
export const searchItems = async (req, res) => {
  const { q } = req.query;
  try {
    const endpoint = encodeURI(MELI_QUERY_ENDPOINT.replace(":query", q));
    const itemsResponse = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (itemsResponse.status >= 400) {
      throw new Error("Server error");
    }
    const jsonResponse = await itemsResponse.json();
    res.set("Access-Control-Allow-Origin", "*");
    if (jsonResponse.results.length === 0) {
      await res.status(404).json({ status: 404, message: "No results" });
    } else {
      const processedJsonResponse = generateItemsResponse(jsonResponse);
      await res.json(processedJsonResponse);
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * displayItem function
 * Calls the MLA API with an ID parameter to receive the details of a specific item
 * @param {any} req
 * @param {any} res
 * @return {ItemDetailsResponse} processedJsonResponse
 */
export const displayItem = async (req, res = response) => {
  const { id } = req.params;
  try {
    const itemDetailsEndpoint = encodeURI(
      MELI_ITEM_DETAILS_ENDPOINT.replace(":id", id)
    );

    const itemDescriptionEndpoint = encodeURI(
      MELI_ITEM_DESCRIPTION_ENDPOINT.replace(":id", id)
    );

    const itemDetailsResponse = await fetch(itemDetailsEndpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const itemDescriptionResponse = await fetch(itemDescriptionEndpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const itemDetailsJson =
      itemDetailsResponse.status >= 400 ? {} : await itemDetailsResponse.json();
    const itemDescriptionJson =
      itemDescriptionResponse.status >= 400
        ? {}
        : await itemDescriptionResponse.json();
    const processedJsonResponse = generateItemDetailResponse(
      itemDetailsJson,
      itemDescriptionJson
    );
    res.set("Access-Control-Allow-Origin", "*");
    await res.json(processedJsonResponse);
  } catch (error) {
    console.log(error);
  }
};
