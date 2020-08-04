import {removeFavoriteQuotes} from '../../services/QuoteService';
export const REMOVE_FAVORITE_QUOTES = 'REMOVE_FAVORITE_QUOTES';

export const removeFavoriteQuote = id => {
    return (dispatch) => {
        return dispatch({
            type: REMOVE_FAVORITE_QUOTES,
            payload: removeFavoriteQuotes(id)
        });
    };
};