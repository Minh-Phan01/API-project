import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const ReviewCard = ({review}) => {
    return (
        <div>
            <p>{review.User.firstName}</p>
        </div>
    )
}

export default ReviewCard;