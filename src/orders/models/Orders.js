export class ItemOrder {
  constructor(itemOrderId, itemId, itemTitle, quantity, price, totalPrice, color, size) {
    this.itemOrderId = itemOrderId;
    this.itemId = itemId;
    this.itemTitle = itemTitle;
    this.quantity = quantity;
    this.price = price;
    this.totalPrice = totalPrice;
    this.color = color;
    this.size = size;
  }
}

export class Order {
  constructor(orderId, userId, name, address, detailAddress, phone, orderStatus, totalItems, totalPrice, totalDiscountPrice, expectPrice, itemOrders, createdAt, updatedAt) {
    this.orderId = orderId;
    this.userId = userId;
    this.name = name;
    this.address = address;
    this.detailAddress = detailAddress;
    this.phone = phone;
    this.orderStatus = orderStatus;
    this.totalItems = totalItems;
    this.totalPrice = totalPrice;
    this.totalDiscountPrice = totalDiscountPrice;
    this.expectPrice = expectPrice;
    this.itemOrders = itemOrders.map(item => new ItemOrder(
      item.itemOrderId,
      item.itemId,
      item.itemTitle,
      item.quantity,
      item.price,
      item.totalPrice,
      item.color,
      item.size
    ));
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}