import firebase from 'firebase/app';
import "firebase/database";

let config = {
    apiKey: "XYZ",
    authDomain: "XXX.firebaseapp.com",
    databaseURL: "https://XXX.firebaseio.com",
    projectId: "XXX",
    storageBucket: "XXX.appspot.com",
    appId: "ZZZ",
};

firebase.initializeApp(config);

export default firebase.database();
