import './SpotPage.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allSpots } from '../../store/spots';
import SpotList from '../SpotList';

function SpotPage() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(allSpots());
    }, []);

    return (
        <div>
            <SpotList />
            
        </div>
    )
}


export default SpotPage;