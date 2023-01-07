import './SpotCard.css';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { deleteSpotThunk } from '../../store/spots';
import { useDispatch } from 'react-redux';

const SpotCard = ({ spot }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const viewSpotInfo = () => {
        history.push(`/spots/${spot.id}`);
    }

    const editSpotInfo = () => {
        history.push(`/spots/edit/${spot.id}`);
    }

    const deleteButton = () => {
        dispatch(deleteSpotThunk(spot.id))
    }

    const sessionUser = useSelector(state => state.session.user);
    const isOwner = sessionUser.id === spot.ownerId;

    return (
        <div className='spot-card'>
            <div>{spot.address}</div>
            <div>{spot.name}</div>
            <button onClick={viewSpotInfo}>View Spot Info</button>
            {isOwner && <button onClick={deleteButton}>Delete</button>}
            {isOwner && <button onClick={editSpotInfo}>Edit Spot</button>}
        </div>
    )
}

export default SpotCard;