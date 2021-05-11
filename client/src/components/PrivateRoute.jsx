import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

//Code source: https://www.youtube.com/watch?v=PKwu15ldZ7k
export default function PrivateRoute({ component: Component, ...rest }) {
    const { currentUser } = useAuth()
    
    return (
        <Route
            {...rest}
            render={props => {
                return currentUser ? <Component {...props} /> : <Redirect to="/login" />
            }}
        ></Route>
    )
}