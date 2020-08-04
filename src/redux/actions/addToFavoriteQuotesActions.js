import {addToFavoriteQuotes} from '../../services/firebase';
export const ADD_TO_FAVORITE_QUOTES = 'ADD_TO_FAVORITE_QUOTES';

const addToFavoriteQuotesAction = (body,author) =>  {
       return (dispatch)=> {
           dispatch({
               type: ADD_TO_FAVORITE_QUOTES,
               payload: addToFavoriteQuotes(body,author)
           })
       }
};
export {
    addToFavoriteQuotesAction as addToFavoriteQuotes,
};