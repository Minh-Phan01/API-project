import './MyReviewsButton.css';
import { useHistory } from 'react-router-dom';

const MyReviewsButton = () => {
    const history = useHistory();
    const myReviews = () => {
        history.push(`/user/reviews`);
    }

    return (
        <button className='button' onClick={myReviews}>My Reviews</button>
    )
}

export default MyReviewsButton;