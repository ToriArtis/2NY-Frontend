export class Cart {
    // Cart 클래스의 생성자
    constructor(cartId, itemId, itemTitle, itemImage, quantity, price, discountRate, totalDiscountPrice) {
      this.cartId = cartId;            // 장바구니 ID
      this.itemId = itemId;            // 상품 ID
      this.itemTitle = itemTitle;      // 상품 제목
      this.itemImage = itemImage;      // 상품 이미지
      this.quantity = quantity;        // 수량
      this.price = price;              // 가격
      this.discountRate = discountRate;// 할인율
      this.totalDiscountPrice = totalDiscountPrice; // 할인금액
    }

    // 상품의 총 가격 계산 (할인 전)
    calculateItemTotalPrice() {
        return this.price * this.quantity;
    }
    
    // 상품의 할인 금액 계산
    calculateItemDiscount() {
        return this.price * this.quantity * (this.discountRate / 100);
    }

    // 상품의 최종 가격 계산 (할인 후)
    calculateItemFinalPrice() {
        return this.calculateItemTotalPrice() - this.calculateItemDiscount();
    }

    // 총 할인 금액 계산 (totalItems가 정의되어 있다고 가정)
    calculateItemTotalDiscount() {
        return this.quantity * this.calculateItemDiscount();
    }

    calculateItems() {
        return this.calculateItemFinalPrice() * this.quantity;
    }

}