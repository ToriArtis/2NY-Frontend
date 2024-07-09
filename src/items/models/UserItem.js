export class UserItem {
    constructor(itemData) {
      this.itemId = itemData.itemId;
      this.title = itemData.title;
      this.content = itemData.content;
      this.thumbnail = itemData.thumbnail;
      this.descriptionImage = itemData.descriptionImage;
      this.price = itemData.price;
      this.discountPrice = itemData.discountPrice;
      this.discountRate = itemData.discountRate;
      this.sales = itemData.sales;
      this.size = itemData.size;
      this.color = itemData.color;
      this.category = itemData.category;
      this.avgStar = itemData.avgStar;
      this.createdAt = itemData.createdAt;
      this.updatedAt = itemData.updatedAt;
    }
  
    get formattedPrice() {
      return `₩${this.price.toLocaleString()}`;
    }
  
    get formattedDiscountPrice() {
      return `₩${this.discountPrice.toLocaleString()}`;
    }
  }