import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deletedReview } from "../../store/reviews";
import './ReviewCard.css'

const ReviewCard = ({review}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const editReviewInfo = () => {
        history.push(`/spots/${review.spotId}/reviews/edit/${review.id}`);
    }

    const deleteButton = (e) => {
        const accept = window.confirm('Deleting Review');
        if (accept) {
            dispatch(deletedReview(review.id));
        }
    }

    const sessionUser = useSelector(state => state.session.user);
    const isOwner = sessionUser.id === review.userId;
    return (
        <div className="review-card">
            <p className="review-text">{review?.User?.firstName} {review?.User?.lastName}: {review.review} </p>
            <dl className="review-text">Stars: {review.stars}</dl>
            <div className="review-card-buttons">
                {isOwner && <button  className='review-edit-button' onClick={editReviewInfo}>Edit Review</button>}
                {isOwner && <button className='review-delete-button' onClick={deleteButton}>Delete Review</button>}
            </div>
        </div>
    )
}

export default ReviewCard;