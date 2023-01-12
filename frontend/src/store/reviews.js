import { csrfFetch } from "./csrf";

const GET_REVIEWS = 'reviews/getReviews';
const ADD_REVIEW = 'reviews/addReview';
const EDIT_REVIEW = 'reviews/editReview';
const DELETE_REVIEW = 'reviews/deleteReview';

const getReviews = (reviews) => {
    return {
        type: GET_REVIEWS,
        reviews
    };
};

const addReview = (payload) => {
    return {
        type: ADD_REVIEW,
        payload
    };
};

const editReview = (payload) => {
    return {
        type: EDIT_REVIEW,
        payload
    };
};

const deleteReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
    }
}


//GET ALL REVIEWS
export const allReviews = (spot) => async (dispatch) => {
    const { id } = spot

    const response = await csrfFetch(`/api/spots/${id}/reviews`);
    const data = await response.json();
    dispatch(getReviews(...data));
    return {...data};
}

//CREATE A REVIEW
export const createReview = (review) => async (dispatch) => {
    const {spotId} = review;
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        body: JSON.stringify(review)
    });

    const addedReview = await response.json();
    dispatch (addReview(addedReview));
    console.log(addedReview);
    return response;
}


//EDIT A REVIEW
export const reviewEdit = (reviewEdit) => async (dispatch) => {
    const { id, review, stars } = reviewEdit;
    const response = await csrfFetch(`/api/reviews/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            id, 
            review,
            stars
        })
    })

    if (response.ok) {
        const editedReview = await response.json();
        dispatch(editReview(editedReview));
        console.log(editedReview);
        return editReview;
    }
}

//DELETE A REVIEW
export const deletedReview = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const destroyedReview = await response.json();
        dispatch(deleteReview(reviewId));
        return destroyedReview;
    }
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
        case ADD_REVIEW:
            newState[action.payload.id] = action.payload;
            return newState;
        case EDIT_REVIEW:
            newState[action.payload.id] = action.payload;
            return newState;    
        case DELETE_REVIEW:
            delete newState[action.reviewId];
            return newState;
        default:
            return state;
    }
}

export default reviewsReducer;