import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const ReviewCard = ({review}) => {
    const history = useHistory();
    console.log(review.User.firstName)
    const editReviewInfo = () => {
        history.push(`/spots/${review.spotId}/reviews/edit/${review.id}`);
    }

    const sessionUser = useSelector(state => state.session.user);
    const isOwner = sessionUser.id === review.userId;
    return (
        <div>
            <p>{review.User.firstName}: {review.review} </p>
            {isOwner && <button onClick={editReviewInfo}>Edit Review</button>}
        </div>
    )
}

export default ReviewCard;