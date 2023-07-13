import ReviewCardBoard from "../items/ReviewCardBoard";


function ReviewList({reviewList}) {
    return (
        <>
            {reviewList && reviewList.map(review => <ReviewCardBoard key = {review.reviewId} review={review}/>)}
        </>
    );
}

export default ReviewList;