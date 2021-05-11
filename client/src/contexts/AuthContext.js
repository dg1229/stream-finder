import React, { useContext, useState, useEffect } from 'react'
import { auth, database } from '../firebase'
import firebase from'firebase/app';

//Code source: https://www.youtube.com/watch?v=PKwu15ldZ7k
const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true)

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return auth.signOut()
    }

    function updateEmail(email){
        return currentUser.updateEmail(email)
    }

    function updatePassword(password){
        return currentUser.updatePassword(password)
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }
    
    function writeUserData(userId, channelTitle, channelId) {
        return database.ref('users/' + userId).push({
            channelTitle, channelId
        });
    }

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
        getUserData
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
