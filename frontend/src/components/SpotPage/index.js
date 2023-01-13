import './SpotPage.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allSpots } from '../../store/spots';
import SpotList from '../SpotList';
import CreateSpotButton from '../CreateSpotButton/CreateSpotButton';
import MySpotButton from '../MySpotButton';
import MyReviewsButton from '../MyReviewsButton';

function SpotPage() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(allSpots());
    }, []);

    return (
        <div className='background'>
            <div className='buttons-bar'>
                <div className='buttons'>
                    <div className='create-spot-button'>
                        <CreateSpotButton />
                    </div>
                    <div className='my-spot-button'>
                         <MySpotButton />
                    </div>
                    <div className='my-reviews-button'>
                         <MyReviewsButton />
                    </div>
                </div>
            </div>
            <SpotList />

        </div>
    )
}


export default SpotPage;