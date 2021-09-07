/**
 * Item class
 * This class represents an Item object
 */

export class Item {
  constructor(
    id,
    title,
    price,
    picture,
    condition,
    free_shipping,
    sold_quantity,
    description,
    state_name
  ) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.picture = picture;
    this.condition = condition;
    this.free_shipping = free_shipping;
    this.sold_quantity = sold_quantity;
    this.description = description;
    this.state_name = state_name;
  }
}
