import React from "react";
import UserListViewModel from "../viewModels/UserListViewModel";


export default function UserListView() {
    const { reviews, error } = UserListViewModel();

    if(error){
        return <div>Error: {error} </div>
    }

    if(!reviews || reviews.length === 0){
        return <div>No reviews found</div>
    }

    //리뷰 목록
    return(
        <div>
        <h2>Your Reviews</h2>
        {reviews.map((review) => (
            <div key={review.reviewId}>
                <h3>Item ID: {review.itemId}</h3>
                <p>Nickname: {review.nickName}</p>
                <p>star: {review.star} stars</p>
                <p>Content: {review.content}</p>
                <p>Created: {review.createdAt.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '.').slice(0, -1)}</p>
                <p>Updated: {review.updatedAt.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '.').slice(0, -1)}</p>
            </div>
        ))}
    </div>
);
}