import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"

const AuthContext = React.createContext(undefined)

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider( { children }) {
    const [currentUser, setCurrentUser] = useState()

    function signupCreation(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    useEffect(() => {
        const unsub = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
        })
        return unsub
    }, [])

    const value = {
        currentUser,
        signupCreation
    }
    return (
        <AuthContext.Provider value={ value }>
            { children }
        </AuthContext.Provider>
    )
}