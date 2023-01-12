import { csrfFetch } from './csrf';

const GET_SPOTS = 'spots/getSpots';
const ADD_SPOT = 'spots/addSpot';
const EDIT_SPOT = 'spots/editSpot';
const DELETE_SPOT = '/spots/deleteSpot';

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

const editSpot = (payload) => {
    return {
        type: EDIT_SPOT,
        payload
    };
}

const deleteSpot = (spotId) => ({
    type: DELETE_SPOT,
    spotId
})

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

    if (response.ok) {
        const data = await response.json();
        dispatch(addSpot(data));
        return data;
    }

    return response;
}


//EDIT A SPOT
export const editingSpot = (spot) => async (dispatch) => {
    const {id, address, city, state, country, lat, lng, name, description, price, previewImage } = spot;
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: "PUT",
        body: JSON.stringify({
            id,
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
        })
    })

    if (response.ok) {
        const editedSpot = await response.json();
        dispatch(editSpot(editedSpot));
        return editedSpot;
    }
}


//DELETE A SPOT
export const deleteSpotThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`api/spots/${spotId}`, {
        method:'DELETE'
    })

    if (response.ok) {
        const destroyedSpot = await response.json();
        dispatch(deleteSpot(spotId));
        return destroyedSpot;
    }
}

const initialState = {};

const spotsReducer = (state = initialState, action) => {
    let newState = {...state};
    switch(action.type) {
        case GET_SPOTS:
            action.spots.forEach(spot => {
                newState[spot.id] = spot;
            })
            return newState;
        case ADD_SPOT:
            newState[action.payload.id] = action.payload;
            return newState;
        case EDIT_SPOT:
            newState[action.payload.id] = action.payload;
            return newState;
        case DELETE_SPOT:
            delete newState[action.spotId];
            return newState;    
        default:
            return state;
    }
};

export default spotsReducer;