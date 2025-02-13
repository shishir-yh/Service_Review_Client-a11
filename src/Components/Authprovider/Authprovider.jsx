import {
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile
} from "firebase/auth";

import React, { createContext, useEffect, useState } from "react";
import auth from "../../firebase/firebase.config";
export const authContext = createContext()
const Authprovider = ({ router }) => {

    //declared the usestate for keep the user
    const [user, setUser] = useState(null);

    // usestate of loading
    const [loading, setLoading] = useState(true);

    // create the google auth provider
    const googleProvider = new GoogleAuthProvider();

    // create the registration function in context api
    const handleRegistration = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // crete the login function in context api
    const handleLogin = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    // create the google login with function

    const handleGoogleLogin = () => {
        return signInWithPopup(auth, googleProvider)
    }
    // manage profile

    //     import { getAuth, updateProfile } from "firebase/auth";
    // const auth = getAuth();
    // updateProfile(auth.currentUser, {
    //   displayName: "Jane Q. User", photoURL: "https://example.com/jane-q-user/profile.jpg"
    // }).then(() => {
    //   // Profile updated!
    //   // ...
    // }).catch((error) => {
    //   // An error occurred
    //   // ...
    // });



    const manageProfile = (name, image) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: image
        })

    }
    // create the signout function in context api
    const handleSignOut = () => {
        return signOut(auth)
    }

    const authInfo = {
        handleRegistration,
        handleLogin,
        handleGoogleLogin,
        handleSignOut,
        manageProfile,
        user,
        setUser,
        setLoading,
        loading
    }

    //     import { getAuth, onAuthStateChanged } from "firebase/auth";

    // const auth = getAuth();
    // onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     // User is signed in, see docs for a list of available properties
    //     // https://firebase.google.com/docs/reference/js/auth.user
    //     const uid = user.uid;
    //     // ...
    //   } else {
    //     // User is signed out
    //     // ...
    //   }
    // });

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {



            if (currentUser) {
                setUser(currentUser)
            }
            else {
                setUser(null)
            }
            setLoading(false)

            return () => {
                unsubscribe()
            }

        });

    }, [])


    return (
        <div>
            <authContext.Provider value={authInfo}>
                {
                    router
                }
            </authContext.Provider>
        </div>
    );
};

export default Authprovider;