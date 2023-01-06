import './SpotCard.css';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SpotCard = ({ spot }) => {
    const history = useHistory();

    const viewSpotInfo = () => {
        history.push(`/spots/${spot.id}`);
    }

    const sessionUser = useSelector(state => state.session.user);
    const isOwner = sessionUser.id === spot.ownerId;

    return (
        <div className='spot-card'>
            <div>{spot.address}</div>
            <div>{spot.name}</div>
            <button onClick={viewSpotInfo}>View Spot Info</button>
            {isOwner && <button>Delete</button>}
        </div>
    )
}

export default SpotCard;