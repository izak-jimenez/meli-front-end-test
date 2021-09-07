/**
 * ItemsResponse class
 * This class represents an ItemsResponse object
 */

export class ItemsResponse {
  constructor(author, categories, items) {
    this.author = author;
    this.categories = categories;
    this.items = items;
  }
}

/**
 * ItemDetailsResponse class
 * This class represents an ItemDetailsResponse object
 */
export class ItemDetailsResponse {
  constructor(author, item) {
    this.author = author;
    this.item = item;
  }
}
