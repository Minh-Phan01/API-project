import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSpot } from "../../store/spots";
import { useHistory } from "react-router-dom";

function CreateSpotForm() {
    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector(state => state.session.user);
    

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState(0);
    const [name, setName] = useState(0);
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [errors, setErrors] = useState([]);

    const updateAddress = e => setAddress(e.target.value);
    const updateCity = e => setCity(e.target.value);
    const updateCountry = e => setCountry(e.target.value);
    const updateState = e => setState(e.target.value);
    const updateLat = e => setLat(e.target.value);
    const updateLng = e => setLng(e.target.value);
    const updateName = e => setName(e.target.value);
    const updateDescription = e => setDescription(e.target.value);
    const updatePrice = e => setPrice(e.target.value);
    const updatePreviewImage = e => setPreviewImage(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            address,
            city,
            country,
            country,
            state,
            lat,
            lng,
            name,
            description,
            price,
            previewImage
        };

        let newSpot;
        newSpot = await dispatch(createSpot(payload));
        
        if (newSpot) {
            history.push(`/spots/${newSpot.id}`);
        }

    }

    return sessionUser.id ? (
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
                <button type="submit">Create new spot</button>
            </form>
        </section>
    ) : null;
};

export default CreateSpotForm;