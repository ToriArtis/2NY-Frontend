class Review {
    constructor(reviewId, itemId, userId, nickName, star, content, createdAt, updatedAt) {
      this.reviewId = reviewId;
      this.itemId = itemId;
      this.userId = userId;
      this.nickName = nickName;
      this.star = star;
      this.content = content;
      this.createdAt = new Date(createdAt);
      this.updatedAt = new Date(updatedAt);
    }
  }
  
  export default Review;