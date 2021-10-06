import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA7sXIVAvBUDBzONdZ_IYbR7mKTPebsDs8",
    authDomain: "course-planner-app.firebaseapp.com",
    databaseURL: "https://course-planner-app-default-rtdb.firebaseio.com",
    projectId: "course-planner-app",
    storageBucket: "course-planner-app.appspot.com",
    messagingSenderId: "1050267746391",
    appId: "1:1050267746391:web:29a679c592af1349322312",
    measurementId: "G-YW1256Y6LL"
};

export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
  
    useEffect(() => {
        const dbRef = ref(database, path);
        const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
        if (devMode) { console.log(`loading ${path}`); }
        return onValue(dbRef, (snapshot) => {
          const val = snapshot.val();
          if (devMode) { console.log(val); }
          setData(transform ? transform(val) : val);
          setLoading(false);
          setError(null);
        }, (error) => {
          setData(null);
          setLoading(false);
          setError(error);
        });
      }, [path, transform]);
    
      return [data, loading, error];
    };
  

  const firebase = initializeApp(firebaseConfig);
  const database = getDatabase(firebase);

  export const setData = (path, value) => (
    set(ref(database, path), value)
  );