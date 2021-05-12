import React, { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Card, Button, Form, Alert } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'


export default function Sponsor() {
    const titleRef = useRef()
    const idRef = useRef()
    const { changeSponsor } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    //Update current sponsor with inputed information
    async function handleSubmit(e){
        e.preventDefault()

        try{
            setError('')
            setLoading(true)
            await changeSponsor(titleRef.current.value, idRef.current.value)
            history.push('/search')
        } catch {
            setError('Failed to favorite channel')
        }

        setLoading(false)
    }

    return (
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Sponsor Channel</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="title">
                        <Form.Label>Channel Title</Form.Label>
                        <Form.Control type="text" ref={titleRef} required />
                    </Form.Group>
                    <Form.Group id="id">
                        <Form.Label>Channel ID</Form.Label>
                        <Form.Control type="text" ref={idRef} required />
                    </Form.Group>
                    <Button disabled={loading} className="w-100" type="submit">Submit</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}