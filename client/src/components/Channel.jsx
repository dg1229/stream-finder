import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Card, Button } from 'react-bootstrap'

const Channel = ({ title, id, channelTitle}) => {
    const { currentUser, addFavorite } = useAuth()
    const [error, setError] = useState("")

    async function Favorite() {
        setError('')
        try {
            await addFavorite(channelTitle, id)
        } catch {
            setError("Failed to log out")
        }
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h3>{title}</h3>
                    <a href={`https://www.youtube.com/channel/${id}`}>{channelTitle}'s Channel</a>
                    <Button onClick={Favorite}>Log Out</Button>
                </Card.Body>
            </Card>
        </>
    )
}

export default Channel
