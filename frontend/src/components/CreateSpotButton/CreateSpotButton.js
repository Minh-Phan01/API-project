import './CreateSpotButton.css';
import { useHistory } from 'react-router-dom';

const CreateSpotButton = () => {

    const history = useHistory();
    const createSpot = () => {
        history.push(`/spots/new`);
    }

    

    return (
        <button className='button' onClick={createSpot}>Create New Spot</button>
    )
}

export default CreateSpotButton;