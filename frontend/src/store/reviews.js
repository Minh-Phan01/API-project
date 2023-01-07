import { csrfFetch } from "./csrf";

const GET_REVIEWS = 'reviews/getReviews';

const getReviews = (reviews) => {
    return {
        type: GET_REVIEWS,
        reviews
    };
};

export const allReviews = (spot) => async (dispatch) => {
    const { id } = spot

    const response = await csrfFetch(`/api/spots/${id}/reviews`);
    const data = await response.json();
    dispatch(getReviews(...data));
    return {...data};
}

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
    let newState = {...state};
    switch(action.type) {
        case GET_REVIEWS:
            // newState = {...action.reviews}
            // console.log(action.reviews)
            action.reviews = [action.reviews];
            action.reviews.forEach(review => {
                newState[review.id] = review
            })
            return newState;
        default:
            return state;
    }
}

export default reviewsReducer;