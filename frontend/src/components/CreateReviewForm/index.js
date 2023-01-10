import { useParams, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { createReview } from '../../store/reviews';

const CreateReviewForm = () => {
    const { spotId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        // e.preventDefault();

        let newReview = {
            spotId,
            review,
            stars
        }

        await dispatch(createReview(newReview));
        history.push(`/spots/${spotId}`)
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
        })
    }

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <textarea 
                type='text'
                placeholder='Add Review'
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
                <button type='submit'>Add Review</button>

                
            </form>
        </section>
    )
}

export default CreateReviewForm;