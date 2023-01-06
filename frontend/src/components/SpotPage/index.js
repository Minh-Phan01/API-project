import './SpotPage.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allSpots } from '../../store/spots';
import SpotList from '../SpotList';
import CreateSpotButton from '../CreateSpotButton/CreateSpotButton';

function SpotPage() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(allSpots());
    }, []);

    return (
        <div>
            <CreateSpotButton />
            <SpotList />

        </div>
    )
}


export default SpotPage;