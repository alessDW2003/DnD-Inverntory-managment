class Item {
  constructor({ id = null, name, description, type, userId }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.type = type;
    this.userId = userId;
  }
}

export default Item;
