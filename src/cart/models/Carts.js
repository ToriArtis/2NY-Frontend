export class Cart {
    constructor(itemCartId, itemId, itemTitle, thumbnail, quantity, price, discountRate) {
        this.itemCartId = itemCartId;
        this.itemId = itemId;
        this.itemTitle = itemTitle;
        this.thumbnail = thumbnail;
        this.quantity = quantity;
        this.price = price;
        this.discountRate = discountRate;
    }

    getTotalPrice() {
        return this.price * this.quantity;
    }

    getDiscountAmount() {
        return this.price * this.quantity * this.discountRate / 100;
    }

    getFinalPrice() {
        return this.getTotalPrice() - this.getDiscountAmount();
    }
}