import * as firebase from 'firebase';
const config = {
    apiKey: "AIzaSyClJOWh1BBZhphWuMSltV3ebuf4SyfZM6c",
    authDomain: "quotlify-4ac13.firebaseapp.com",
    databaseURL: "https://quotlify-4ac13.firebaseio.com",
    projectId: "quotlify-4ac13",
    storageBucket: "",
    messagingSenderId: "828716127470",
    appId: "1:828716127470:web:5eac257df2a01832",
};
firebase.initializeApp(config);

const QUOTES_COLLECTION = 'favorite_quotes';

export const addToFavoriteQuotes = (body,author) => {
    const a = firebase.database().ref('favorite_quotes');
    const newquote= a.push();
    newquote.set({
        body: body,
        author: author,
    });
    return newquote;
};

export const fetchFavoriteQuotes = () => {
    return firebase.database().ref(QUOTES_COLLECTION).once('value');
};

export const removeFavoriteQuotes = (id) => {
    return firebase.database().ref(`${QUOTES_COLLECTION}/${id}`).remove();
};