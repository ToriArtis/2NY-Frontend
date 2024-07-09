export class ItemOrder {
  constructor(itemOrderId, itemId, itemTitle, quantity, price, totalPrice, discountRate, discountPrice, color, size, thumbnail) {
    this.itemOrderId = itemOrderId;
    this.itemId = itemId;
    this.itemTitle = itemTitle;
    this.quantity = quantity;
    this.price = price;
    this.totalPrice = totalPrice;
    this.discountRate = discountRate;
    this.discountPrice = discountPrice;
    this.color = color;
    this.size = size;
    this.thumbnail = thumbnail;
  }
}

export class Order {
  constructor(orderId, userId, email, name, address, detailAddress, phone, orderStatus, totalItems, totalPrice, totalDiscountPrice, expectPrice, itemOrders, createdAt, updatedAt) {
    this.orderId = orderId;
    this.userId = userId;
    this.email = email;
    this.name = name;
    this.address = address;
    this.detailAddress = detailAddress;
    this.phone = phone;
    this.orderStatus = orderStatus;
    this.totalItems = totalItems;
    this.totalPrice = totalPrice;
    this.totalDiscountPrice = totalDiscountPrice;
    this.expectPrice = expectPrice;
    this.itemOrders = Array.isArray(itemOrders) 
      ? itemOrders.map(item => new ItemOrder(
          item.itemOrderId,
          item.itemId,
          item.itemTitle,
          item.quantity,
          item.price,
          item.totalPrice,
          item.discountRate,
          item.discountPrice,
          item.color,
          item.size,
          item.thumbnail
        ))
      : [];
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}