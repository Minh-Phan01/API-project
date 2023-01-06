import { allSpots } from "../../store/spots";
import { useSelector, useDispatch } from "react-redux";
import SpotCard from "../SpotCard/SpotCard";
import './SpotList.css';
import { useEffect, useState } from "react";

function SpotList() {
    const dispatch = useDispatch();

    const [isLoaded, setIsLoaded] = useState(false);

    const spotsObj = useSelector(state => state.spots);
    const spots = Object.values(spotsObj);
    
    useEffect(() => {
        dispatch(allSpots()).then(() => setIsLoaded(true));
    }, [dispatch]);

    return (
       <div>
        {
            spots.length > 0 && spots.map(spot => {
               return <SpotCard key={spot.id} spot={spot} />
            })
        }
       </div>
    );
};

export default SpotList