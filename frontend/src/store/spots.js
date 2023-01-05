import { csrfFetch } from './csrf';

const GET_SPOTS = 'spots/getSpots';
const ADD_SPOT = 'spots/addSpot';

const getSpots = (spots) => {
    return {
        type: GET_SPOTS,
        spots
    };
};

const addSpot = (payload) => {
    return {
        type: ADD_SPOT,
        payload
    };
};

//GET ALL SPOTS
export const allSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots'
    );
    const data = await response.json();
    dispatch(getSpots(data.spots));
    return response;
};

//ADD A SPOT
export const createSpot = (spot) => async (dispatch) => {
    const { address, city, state, country, lat, lng, name, description, price, previewImage } = spot;
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        body: JSON.stringify({
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
            previewImage
        }),
    });

    const data = await response.json();
    console.log(data);
    dispatch(addSpot(data));
    return data;
}

const initialState = {};

const spotsReducer = (state = initialState, action) => {
    let newState = {...state};
    switch(action.type) {
        case GET_SPOTS:
            console.log(action);
            action.spots.forEach(spot => {
                newState[spot.id] = spot;
            })
            return newState;
        case ADD_SPOT:
            newState[action.payload.id] = action.payload;
            return newState;
        default:
            return state;
    }
};

export default spotsReducer;