import React, { useState } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from 'react-router-dom'

const Channel = ({ title, id, channelTitle}) => {
    const { writeUserData, currentUser } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e){
        e.preventDefault()

        try{
            setError('')
            setLoading(true)
            await writeUserData(currentUser.uid, channelTitle, id)
        } catch {
            setError('Failed to favorte channel')
        }

        setLoading(false)
    }
    return (
        <>
            <Card>
                <Card.Body>
                    <h3>{title}</h3>
                    <a href={`https://www.youtube.com/channel/${id}`}>{channelTitle}'s Channel</a>
                    <Button variant="link" onClick={handleSubmit}>Favorite</Button>
                    {error && <Alert variant="danger">{error}</Alert>}
                </Card.Body>
            </Card>
        </>
    )
}

const FavoriteChannel = ({ id, channelTitle}) => {
    const { writeUserData, currentUser } = useAuth()

    return (
        <>
            <Card>
                <Card.Body>
                    <h3>{channelTitle}</h3>
                    <a href={`https://www.youtube.com/channel/${id}`}>Go To Channel</a>
                </Card.Body>
            </Card>
        </>
    )
}

export const Favorite = FavoriteChannel
export default Channel
