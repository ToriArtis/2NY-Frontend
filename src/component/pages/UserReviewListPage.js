import React, { useState } from "react";
import UserListViewModel from "../../review/viewModels/UserListViewModel";
import "../css/UserReviewListPage.css";
import { Link } from "react-router-dom";
import { getImageUrl } from "../../config/app-config";
import ModifyReviewView from "../../review/views/ModifyReviewView";
import Pagination from "../../review/components/Pagination";
import { Typography } from "@mui/material";

function UserReviewListPage() {
    const { reviews, error, handleDeleteReview, currentPage, totalPages, paginate } = UserListViewModel();
    const [selectedReviewId, setSelectedReviewId] = useState(null);

    if (error) {
        return <div>Error: {error}</div>
    }

    if (!reviews || reviews.length === 0) {
        return <div style={{ margin: "0 auto", padding: "5rem 2rem" }}>
            <Typography component="h1" variant="h5"
                style={{ textAlign: "left", borderBottom: "1px solid #ddd", paddingBottom: "10px", marginBottom: "20px" }}>
                <b>Review</b>
            </Typography>
            <br />작성한 후기가 없습니다.</div>
    }

    if (selectedReviewId) {
        return <ModifyReviewView
            reviewId={selectedReviewId}
            onCancel={() => setSelectedReviewId(null)}
        />;
    }

    const handleDeleteClick = (reviewId) => {
        if (window.confirm("정말 삭제하시겠습니까? \n삭제된 후기는 복구 불가합니다.")) {
            handleDeleteReview(reviewId);
        }
    };

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
                        <img src={getImageUrl(review.thumbnail)} alt={`Item ${review.itemId}`} className="review-item-image" />
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
                            <span
                                onClick={() => setSelectedReviewId(review.reviewId)}
                                style={{ textDecoration: "none", color: "#888", cursor: "pointer" }}
                            >
                                수정
                            </span>
                            | <span onClick={() => handleDeleteClick(review.reviewId)} style={{ cursor: "pointer" }}>삭제</span>
                        </div>
                    </div>
                ))}
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate}
            />
        </div>
    );
}

export default UserReviewListPage;