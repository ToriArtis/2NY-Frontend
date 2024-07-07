import React from "react";
import UserListViewModel from "../../review/viewModels/UserListViewModel";
import "../css/UserReviewListPage.css";
import { Link } from "react-router-dom";


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

    // 날짜
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString; // 유효하지 않은 날짜면 원본 문자열 반환
        return date.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '.').slice(0, -1);
    };

    return (
        <div className="user-review-list-page">
            <h2>Review</h2>
            <div className="review-list">
                {reviews.map((review) => (
                    <div key={review.reviewId} className="review-item">
                        <img src={review.thumbnail[0]} alt={`Item ${review.itemId}`} className="review-item-image" />
                        <div className="review-item-content">
                            <h3>{review.itemName}</h3>
                            <div className="review-rating">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span key={star} className={star <= review.star ? "star filled" : "star"}>★</span>
                                ))}

                                <span className="review-date">
                                    {review.updatedAt && review.updatedAt !== review.createdAt
                                        ? `${formatDate(review.updatedAt)}` // 수정된 날짜 표시
                                        : formatDate(review.createdAt)}
                                </span>
                            
                            </div>
                            <p className="review-text">{review.content}</p>
                        </div>
                        <div className="review-item-actions">
                            <Link to={`/review/modify/${review.reviewId}`} style={{ textDecoration: "none", color: "#888"}}>
                                수정</Link> 
                                | <span onClick={() => handleDeleteReview(review.reviewId)} style={{ cursor: "pointer" }}>삭제</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserReviewListPage;