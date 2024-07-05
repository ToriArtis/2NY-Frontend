import React from "react";
import UserListViewModel from "../../review/viewModels/UserListViewModel";
import "../css/UserReviewListPage.css";


function UserReviewListPage() {
    const { reviews, error, handleDeleteReview } = UserListViewModel();
    // console.log("Reviews:", reviews);
    // console.log("Error:", error);

    if (error) {
        return <div>Error: {error}</div>
    }

    if (!reviews || reviews.length === 0) {
        return <div>리뷰 표시</div>
    }

    return (
        <div className="user-review-list-page">
            <h2>Review</h2>
            <div className="review-list">
                {reviews.map((review) => (
                    <div key={review.reviewId} className="review-item">
                        <img src={review.itemImage} alt={review.itemName} className="review-item-image" />
                        <div className="review-item-content">
                            <h3>{review.itemName}</h3>
                            <div className="review-rating">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span key={star} className={star <= review.star ? "star filled" : "star"}>★</span>
                                ))}
                                <span className="review-date">{review.createdAt}</span>
                            </div>
                            <p className="review-text">{review.content}</p>
                        </div>
                        <div className="review-item-actions">
                            <span>수정</span> | <span onClick={() => handleDeleteReview(review.reviewId)}>삭제</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserReviewListPage;