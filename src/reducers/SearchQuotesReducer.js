import {
    SEARCH_QUOTES
} from '../services/QuoteService';

const initialState = {
    filteredQuotes: null,
};

export const SearchQuotesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_QUOTES:
            return {
                ...state,
                filteredQuotes: action.payload.filterQuotes
            };
        default:
            return state;
    }
};