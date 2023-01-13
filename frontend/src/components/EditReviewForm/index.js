import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { reviewEdit } from '../../store/reviews';

const EditReviewForm = () => {
    const { reviewId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    
    const editedReview = useSelector(state => state.reviews[reviewId]);
    const currentUser = useSelector(state => state.session.user)
    console.log(currentUser);

    const [review, setReview] = useState(editedReview?.review);
    const [stars, setStars] = useState(editedReview?.stars);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let payload = {
            id: reviewId,
            review,
            stars, 
            currentUser
        }

        let updatedReview;
        updatedReview = await dispatch(reviewEdit(payload))
        .catch(async res => {
            const data = await res.json();
            if(data.errors) setErrors(data.errors);
        })
        history.push(`/spots/${editedReview.spotId}`)
    }

    return (
        <section>
            <h1>Edit Review</h1>
            <form onSubmit={handleSubmit}>
                {errors.map((errors, idx) => <li key={idx}>{errors.map}</li>)}
            <textarea 
                type='text'
                placeholder='Edit Review'
                value={review}
                required='yes'
                onChange={e => setReview(e.target.value)}
                />
                <input 
                type='number'
                placeholder='Stars'
                value={stars}
                min='1'
                max='5'
                required='yes'
                onChange={e => setStars(e.target.value)}
                />
                <button type='submit'>Edit Review</button>
            </form>
        </section>
    )
}

export default EditReviewForm;