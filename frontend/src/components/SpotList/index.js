import { allSpots } from "../../store/spots";
import { useSelector } from "react-redux";
import './SpotList.css';

function SpotList() {
    
    const spotsObj = useSelector(state => state.spots);
    const spots = Object.values(spotsObj);
    console.log(spots);

    return (
       <div>
        {
            spots.length > 0 && spots.map(spot => {
               return <div key={spot.id}>{spot.address}</div>
            })
        }
       </div>
    );
};

export default SpotList