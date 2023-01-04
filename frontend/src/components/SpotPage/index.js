import './SpotPage.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allSpots } from '../../store/spots';

function SpotPage() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(allSpots());
    }, []);

    return (
        <div>Spot Page</div>
    )
}


export default SpotPage;