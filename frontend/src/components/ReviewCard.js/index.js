import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deletedReview } from "../../store/reviews";

const ReviewCard = ({review}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const editReviewInfo = () => {
        history.push(`/spots/${review.spotId}/reviews/edit/${review.id}`);
    }

    const deleteButton = () => {
        dispatch(deletedReview(review.id))
    }

    const sessionUser = useSelector(state => state.session.user);
    const isOwner = sessionUser.id === review.userId;
    return (
        <div>
            <p>{review?.User?.firstName} {review?.User?.lastName}: {review.review} </p>
            <dl>Stars: {review.stars}</dl>
            {isOwner && <button onClick={editReviewInfo}>Edit Review</button>}
            {isOwner && <button onClick={deleteButton}>Delete Review</button>}
        </div>
    )
}

export default ReviewCard;