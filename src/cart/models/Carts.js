// 장바구니 아이템 모델
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

    // 총 가격 계산
    getTotalPrice() {
        return this.price * this.quantity;
    }

    // 할인 금액 계산
    getDiscountAmount() {
        return this.price * this.quantity * this.discountRate / 100;
    }

    // 최종 가격 계산
    getFinalPrice() {
        return this.getTotalPrice() - this.getDiscountAmount();
    }
}