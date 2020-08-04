import axios from 'axios';
import * as firebase from './firebase';

const API_BASE_URL = 'https://favqs.com/api';
//const API_KEY = process.env.FAVQS_API_KEY;

/*
const requestConfig = {
    headers: {
        Authorization: `Token token="${API_KEY}"`
    }
};*/
const API_KEY = '3bbf53fc6a6db08b43b9e22575eea9f0';
export const FETCH_QUOTE_OF_THE_DAY = 'FETCH_QUOTE_OF_THE_DAY';
export const FETCH_FAVORITE_QUOTES = 'FETCH_FAVORITE_QUOTES';
export const SEARCH_QUOTES = 'SEARCH_QUOTES';

//for searching
const requestConfig = {
    headers: {
        Authorization: `Token token="${API_KEY}"`
    }
};

const fetchQuoteOfTheDayAction = () => {
    const url = `${API_BASE_URL}/qotd`;
    return (dispatch) => {
        return axios.get(url)
            .then((response) => {
                if (!response.error) {
                    console.log('response--->>>', response);
                    dispatch({
                        type: FETCH_QUOTE_OF_THE_DAY,
                        payload: {quote: response.data.quote}
                    });
                }
                return response;
            })
            .catch((error) => {
                console.log(error)
            })
    }
};
const fetchFavoriteQuotesAction = () => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            firebase
                .fetchFavoriteQuotes()
                .then(data => {

                    const quotes = [];

                    data.forEach(quote => {
                        quotes.push({
                            id: quote.key,
                            value: quote.val(),
                        });
                    });
                    console.log('data11--->>>>', quotes);
                    dispatch({
                        type: FETCH_FAVORITE_QUOTES,
                        payload: quotes
                    });
                    return resolve(quotes);
                })
                .catch(error => {
                    console.log(error);
                    return reject(error);
                });
        });
    }
};
const removeFavoriteQuoteAction = id => {
    console.log('idFromService', id);
    return new Promise((resolve, reject) => {
        firebase
            .removeFavoriteQuotes(id)
            .then(() => resolve())
            .catch(error => {
                console.log(error);
                return reject(error);
            });
    });
};

export const searchQuotes = text => {
    console.log('textInService--->>', text);
    const url = `${API_BASE_URL}/quotes/?filter=${text}`;
    return (dispatch) => {
        return axios.get(url,requestConfig)
            .then(response => {
                console.log('searchResponse->>>>>>>', response);
                dispatch({
                    type: SEARCH_QUOTES,
                    payload: {filterQuotes:response.data.quotes}
                });
                return response
            })
            .catch(error => {
                console.log(error);
            })
    }
};
export {fetchQuoteOfTheDayAction as fetchQuoteOfTheDay};
export {fetchFavoriteQuotesAction as fetchFavoriteQuotes};
export {removeFavoriteQuoteAction as removeFavoriteQuotes};
