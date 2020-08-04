import {
    FETCH_QUOTE_OF_THE_DAY
} from '../services/QuoteService';

const initialState = {
    quote: null
};

export const QuoteOfTheDayReducer = (state = initialState, action) => {
    console.log('action-->>', action);
    switch (action.type) {
        case FETCH_QUOTE_OF_THE_DAY:
            return {
                ...state,
                quote: action.payload.quote,
            };
        default:
            return state;
    }
};