import React, { useEffect, useState } from "react";
import { deleteReview, userReviewList } from "../api/reviewApi";

export default function UserListViewModel() {
    const [error, setError] = useState(null);
    const [reviews, setReviews] = useState([]);

useEffect(() => {
    // 리뷰 목록을 가져오는 비동기 함수
    async function fetchReviews() {
        try {
             // API를 호출하여 리뷰 목록을 가져옴
            const fetchedReviews= await userReviewList();
            // 페이지네이션 객체에서 content 배열 확인
             if (fetchedReviews && Array.isArray(fetchedReviews.content)) {
                setReviews(fetchedReviews.content);
            } else {
                // 배열이 아니면 에러 로그를 출력하고 빈 배열로 설정
                console.error('Fetched reviews is not an array:', fetchReviews);
                setReviews([]);
            }
        } catch (error) {
            // 에러가 발생하면 error state를 업데이트
            setError(error.message || 'An error occurred while fetching reviews');
        }
    }
    // 컴포넌트가 마운트될 때 fetchReviews 함수를 호출
    fetchReviews();
}, []); // 빈 배열을 넣어 컴포넌트가 마운트될 때만 실행되도록 함

// 리뷰 삭제 함수
const handleDeleteReview = async (reviewId) => {
    try {
        await deleteReview(reviewId);
        // 삭제 후 리뷰 업데이트
        setReviews(reviews.filter(review => review.reviewId !== reviewId));
    } catch (error) {
        setError(error.message || 'An error occurred while deleting the review');
    }
};

return {
    reviews,
    error,
    handleDeleteReview
};
}