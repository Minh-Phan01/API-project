import './SpotInfo.css';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { allSpots } from '../../store/spots';
import ReviewList from '../ReviewList';
import CreateReviewForm from '../CreateReviewForm';

const SpotInfo = ({ spot }) => {
    const { spotId } = useParams();
    const thisSpot = useSelector(state => state.spots[spotId]);
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(allSpots()).then(() => setIsLoaded(true));
    }, [dispatch]);
    

    return (
        <div> 
           {thisSpot &&  
          (<>
           <h1>{thisSpot.address}</h1>
                <h2>{thisSpot.name}'s Spot</h2>
                    <div>{thisSpot.city}</div>
                    <div>${thisSpot.price}</div>
                    <div>{thisSpot.previewImage}</div>
                <h2>
                    <ReviewList spot={spot}/>
                </h2>
                <h2>
                    <CreateReviewForm />
                </h2>
            </>)}
        </div>
    )
};

export default SpotInfo;