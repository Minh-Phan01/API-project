import { useSelector } from "react-redux";

const MySpotsPage = () => {

    const currentUser = useSelector(state => state.session)
    const allSpotsObj = useSelector(state => state.spots);
    const allSpots = Object.values(allSpotsObj);

    const mySpots = allSpots.filter(spot => {
        if (spot.ownerId === currentUser.user.id) {
            return spot
        }
    })


    return (
        <div>
            <h1>{currentUser.user.firstName} {currentUser.user.lastName}'s Spots</h1>
           {
            mySpots.map(spot => {
                return <>
                    <img src={spot.previewImage}/>
                    <li>{spot.address}</li>
                    <li>{spot.city}</li>
                    <li>{spot.price}</li>
                    <li>{spot.description}</li>
                </>
            })
           }
        </div>
    )
}

export default MySpotsPage;