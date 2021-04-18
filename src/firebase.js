import firebase from 'firebase/app';
import "firebase/database";

let config = {
    apiKey: "AIzaSyDNT2gxcTIRMVQQZ2bGLO8R9zWl1Sza8T8",
    authDomain: "firecast-3f455.firebaseapp.com",
    databaseURL: "https://firecast-3f455.firebaseio.com",
    projectId: "firecast-3f455",
    storageBucket: "firecast-3f455.appspot.com",
    appId: "1:230208311970:android:1aaeb557b5c704a2",
};

firebase.initializeApp(config);

export default firebase.database();
