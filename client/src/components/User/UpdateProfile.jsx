import React, { useRef, useState } from 'react'
import { Card, Button, Form, Alert } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

//Code source: https://www.youtube.com/watch?v=PKwu15ldZ7k
export default function UpdateProfile() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser, updatePassword, updateEmail } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    //Update current user's email and or password.
    function handleSubmit(e){
        e.preventDefault()
        
        //Confirm entered passwords match
        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('Passwords do not match')
        }

        const promises = []
        setLoading(true)
        setError("")

        //Update email only if user has a different one entered.
        if(emailRef.current.value !== currentUser.email){
            promises.push(updateEmail(emailRef.current.value))
        }

        //Update password if user has entered new password.
        if(passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }

        //Update all specified user info.
        Promise.all(promises).then(() => {
            history.push('/')
        }).catch(() => {
            setError("Failed to update account")
        }).finally(() => {
            setLoading(false)
        })

        try{
            setError('')
            setLoading(true)
        } catch {
            setError('Failed to create an account')
        }

        setLoading(false)
    }

    return (
    <span className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Update Profile</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required
                         defaultValue={currentUser.email} />
                    </Form.Group>
                    <Form.Group id="passworld">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} 
                        placeholder="Leave blank to keep the same" />
                    </Form.Group>
                    <Form.Group id="password-confirm">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type="password" ref={passwordConfirmRef}
                        placeholder="Leave blank to keep the same" />
                    </Form.Group>
                    <Button disabled={loading} className="w-100" type="submit">Update</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className ="w-100 text-center mt-2">
            <Link to="/">Cancel</Link>
        </div>
    </span>
    )
}
