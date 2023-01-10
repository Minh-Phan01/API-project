import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Redirect } from 'react-router-dom';
import { editingSpot, allSpots, deleteSpot } from '../../store/spots';

const EditSpotFrom = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(allSpots)
    }, [dispatch])

    const editedSpot = useSelector(state => state.spots.id);

    const [address, setAddress] = useState(editedSpot?.address);
    const [city, setCity] = useState(editedSpot?.city);
    const [country, setCountry] = useState(editedSpot?.country);
    const [state, setState] = useState(editedSpot?.state);
    const [lat, setLat] = useState(editedSpot?.lat);
    const [lng, setLng] = useState(editedSpot?.lng);
    const [name, setName] = useState(editedSpot?.name);
    const [description, setDescription] = useState(editedSpot?.description);
    const [price, setPrice] = useState(editedSpot?.price);
    const [previewImage, setPreviewImage] = useState(editedSpot?.previewImage);
    const [errors, setErrors] = useState([]);

    const updateAddress = e => setAddress(e.target.value);
    const updateCity = e => setCity(e.target.value);
    const updateState = e => setState(e.target.value);
    const updateCountry = e => setCountry(e.target.value);
    const updateLat = e => setLat(e.target.value);
    const updateLng = e => setLng(e.target.value);
    const updateName = e => setName(e.target.value);
    const updateDescription = e => setDescription(e.target.value);
    const updatePrice = e => setPrice(e.target.value);
    const updatePreviewImage = e => setPreviewImage(e.target.value);
    

    const handleSubmit = async e => {
        e.preventDefault();
        
        let payload = {
            id: spotId,
            address,
            city,
            country,
            state,
            lat,
            lng,
            name,
            description,
            price,
            previewImage
        }

        let updatedSpot;
        updatedSpot = await dispatch(editingSpot(payload));
        console.log(updatedSpot);
        history.push(`/spots/${updatedSpot.id}`)
    }

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <input 
                    type='text'
                    placeholder="Address"
                    value={address}
                    onChange={updateAddress}/>
                <input 
                    type='text'
                    placeholder="City"
                    value={city}
                    onChange={updateCity}/>
                <input 
                    type='text'
                    placeholder="Country"
                    value={country}
                    onChange={updateCountry}/>
                <input 
                    type='text'
                    placeholder="State"
                    value={state}
                    onChange={updateState}/>
                <input 
                    type='number'
                    placeholder="Latitude"
                    value={lat}
                    onChange={updateLat}/>
                <input 
                    type='number'
                    placeholder="Longitude"
                    value={lng}
                    onChange={updateLng}/>
                <input 
                    type='text'
                    placeholder="Name"
                    value={name}
                    onChange={updateName}/>
                <input 
                    type='text'
                    placeholder="Description"
                    value={description}
                    onChange={updateDescription}/>
                <input 
                    type='number'
                    placeholder="Price"
                    min='1'
                    value={price}
                    onChange={updatePrice}/>
                <input 
                    type='text'
                    placeholder="Preview Image"
                    value={previewImage}
                    onChange={updatePreviewImage}/>
                <button type="submit">Edit spot</button>
            </form>
        </section>
    )
}

export default EditSpotFrom;