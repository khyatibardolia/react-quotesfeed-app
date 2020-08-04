import {
    FETCH_FAVORITE_QUOTES
} from '../../services/QuoteService';

const initialState = {
    favorites: null,
};

export const favoriteQuotesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_FAVORITE_QUOTES:
            return {
                ...state,
                favorites: action.payload
            };
        default:
            return state;
    }
};