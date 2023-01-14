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
    console.log(thisSpot);
    useEffect(() => {
        dispatch(allSpots()).then(() => setIsLoaded(true));
    }, [dispatch]);
    
    let isOwner;
    const sessionUser = useSelector(state => state.session.user);

    if (thisSpot) {
        isOwner = sessionUser.id === thisSpot.ownerId;
    }
    
    return (
        <div className='spot-info-page'> 
           {thisSpot &&  
          (<>
          <div className='spot-info-content'>
            <img src={thisSpot.previewImage}/>
            <div className='spot-info'>
                <h1 className='spot-address'>{thisSpot.address}</h1>
                 <h2 className='spot-name'>{thisSpot.name}'s Spot</h2>
                    <div className='spot-city'>{thisSpot.city}</div>
                    <div className='spot-price'>${thisSpot.price}/night</div>
                    <div className='spot-description'>{thisSpot.description}</div>
            </div>
          </div>
                <h2 className='review-list-form'>
                    <ReviewList spot={spot}/>
                </h2>
                <h2 className='add-review'>
                   {isOwner ||  <CreateReviewForm spot={spot}/> }
                </h2>
            </>)}
        </div>
    )
};

export default SpotInfo;