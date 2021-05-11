import React, { useState } from 'react'
//import { useAuth } from '../contexts/AuthContext'
import { Card, Button } from 'react-bootstrap'

const Channel = ({ title, id, channelTitle}) => {
    // const { currentUser, addFavorite } = useAuth()
    // const [error, setError] = useState("")

    return (
        <>
            <Card>
                <Card.Body>
                    <h3>{title}</h3>
                    <a href={`https://www.youtube.com/channel/${id}`}>{channelTitle}'s Channel</a>
                </Card.Body>
            </Card>
        </>
    )
}

export default Channel
