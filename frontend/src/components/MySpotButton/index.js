import './MySpotButton.css';
import { useHistory } from 'react-router-dom';

const MySpotButton = () => {
    const history = useHistory();
    const mySpot = () => {
        history.push(`/spots/user`);
    }

    return (
        <button className='button' onClick={mySpot}>My Spots</button>
    )
}

export default MySpotButton;