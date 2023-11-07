import { initializeApp } from "firebase/app";
import { ServiceContainer } from "./service/service-container";

const firebaseConfig = {
    apiKey: "AIzaSyD3vdgEU78rYiSpinsW7O1mwX6RhWcmEQc",
    authDomain: "boilermake-apply.firebaseapp.com",
    databaseURL: "https://boilermake-apply-default-rtdb.firebaseio.com",
    projectId: "boilermake-apply",
    storageBucket: "boilermake-apply.appspot.com",
    messagingSenderId: "498052090901",
    appId: "1:498052090901:web:e5e108750a2fcf9233921c",
    measurementId: "G-WJFVRNQ1M9",
};

export const app = initializeApp(firebaseConfig);
ServiceContainer.initialize(app);
