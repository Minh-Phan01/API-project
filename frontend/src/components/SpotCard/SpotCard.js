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

    const deleteButton = (e) => {
        
        const accept = window.confirm('Deleting Spot');
        if (accept) {
            dispatch(deleteSpotThunk(spot.id));
        }
    }

    const sessionUser = useSelector(state => state.session.user);
    const isOwner = sessionUser.id === spot.ownerId;

    return (
        <div className='spot-card'>
            <div className='spot-image'>
                <img className='spot-card-images' src={spot.previewImage}/>
            </div>
            <div className='spot-card-address'>
                 <div>{spot.address}</div>
            </div>
            <div className='spot-card-name'>
                 <div>{spot.name}</div>
            </div>
            <div className='spot-card-price'>
                 <div>${spot.price}/night</div>
            </div>
            <div className='spot-card-buttons'>
                <button onClick={viewSpotInfo}>View Spot Info</button>
                {isOwner && <button onClick={deleteButton}>Delete</button>}
                {isOwner && <button onClick={editSpotInfo}>Edit Spot</button>}
            </div>
        </div>
    )
}

export default SpotCard;