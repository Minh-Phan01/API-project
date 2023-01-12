import './MyReviewsPage.css';
import { useSelector } from 'react-redux';

const MyReviewsPage = () => {
    const allReviewsObj = useSelector(state => state.reviews);
    const currentUser = useSelector(state => state.session);
    const allReviews = Object.values(allReviewsObj);
    

    const myReviews = allReviews.filter(review => {
        if (review.User.id === currentUser.user.id) {
            return review
        }
    })

    console.log(myReviews);
    return (
        <div>
            <h1>{currentUser.user.firstName} {currentUser.user.lastName}'s Reviews</h1>
            {
                myReviews.map(review => {
                    return <>
                        <li>{review.spotId}: {review.review}</li>
                    </>
                })
            }
        </div>
    )
}

export default MyReviewsPage;