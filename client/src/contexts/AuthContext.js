import React, { useContext, useState, useEffect } from 'react'
import { auth, database } from '../firebase'

//Code source: https://www.youtube.com/watch?v=PKwu15ldZ7k
//Used for firebase authentication and database connections and actions.
const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true)

    //Create an account with input.
    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    //Login to account with input.
    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    //Logout of current session.
    function logout() {
        return auth.signOut()
    }

    //Update email of user.
    function updateEmail(email){
        return currentUser.updateEmail(email)
    }

    //Update password of user.
    function updatePassword(password){
        return currentUser.updatePassword(password)
    }

    //Reset password of user.
    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }
    
    //Add favorite channel to database under user.
    function writeUserData(userId, channelTitle, channelId) {
        return database.ref('users/' + userId).push({
            channelTitle, channelId
        });
    }

    //Change information for current sponsor.
    function changeSponsor(title, id) {
        return database.ref('sponsored/').set({
            channelTitle: title,
            channelId: id
        })
    }

    //Clear users favorited channels/streams
    function clearFavorites(userId){
        database.ref(`users/` + userId).remove()
    }

    //Retrieve user data.
    function getUserData(userId) {
        return database.ref().child("users").child(userId).get().then((snapshot) => {
            if (snapshot.exists()) {
                return Object.values(snapshot.val())
            } else {
                return "No data available"
            }
            }).catch((error) => {
            console.error(error);
            });
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        writeUserData,
        getUserData,
        changeSponsor,
        clearFavorites
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
