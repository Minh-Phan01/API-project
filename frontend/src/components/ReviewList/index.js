import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { allReviews } from "../../store/reviews";
import { useParams } from "react-router-dom";
import ReviewCard from "../ReviewCard.js";

function ReviewList({spot}) {
    const dispatch = useDispatch();

    const {spotId} = useParams();
    const thisSpot = useSelector(state => state.spots[spotId])
    const [isLoaded, setIsLoaded] = useState(false);

    const spotReviewObj = useSelector(state => state.reviews);
    const spotReviews = Object.values(spotReviewObj)
    console.log(spotReviews);
    

    useEffect(() => {
        dispatch(allReviews(thisSpot)).then(() => setIsLoaded(true));
    }, [dispatch]);

    return (
      <div>
        {
            spotReviews.map(review => {
                return <div>{review.review}</div>
            })
        }
      </div>
    )
}

export default ReviewList;