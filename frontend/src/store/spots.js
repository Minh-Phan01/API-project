import { csrfFetch } from './csrf';

const GET_SPOTS = 'spots/getSpots';

const getSpots = (spots) => {
    return {
        type: GET_SPOTS,
        spots
    };
};

export const allSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots'
    );
    const data = await response.json();
    dispatch(getSpots(data.spots));
    return response;
};

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
        default:
            return state;
    }
};

export default spotsReducer;