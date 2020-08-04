import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
// IMPORT REDUCERS

import { QuoteOfTheDayReducer } from '../reducers/quoteOfTheDayReducer';
import { favoriteQuotesReducer } from '../reducers/favoriteQuotesReducer';
import { SearchQuotesReducer } from '../reducers/SearchQuotesReducer';

// EXPORT REDUCER

export const AppReducer = combineReducers({
    quoteOfTheDay: QuoteOfTheDayReducer,
    favorites: favoriteQuotesReducer,
    filteredQuotes: SearchQuotesReducer,
    form: formReducer
});