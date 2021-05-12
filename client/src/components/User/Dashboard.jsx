import React, { useState, useEffect } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { database } from '../../firebase'
import { Favorite } from '../Channel'


//Code source: https://www.youtube.com/watch?v=PKwu15ldZ7k
export default function Dashboard() {
    const [error, setError] = useState("")
    const { currentUser, logout, clearFavorites } = useAuth()
    const [mystreams, setmystreams] = useState(null)
    const history = useHistory()

    //Get the favorited streams of the current user.
    useEffect(() => {
        const ref = database.ref('users/' + currentUser.uid)

        ref.on("value", (snapshot) => {
            if(snapshot.val()){
                setmystreams(Object.values(snapshot.val()))
            }
        })

        return () => ref.off()
    }, [currentUser.uid])

    //console.log(`mystreams: ${mystreams}`)

    //Log current user out and return to login page
    async function handleLogout() {
        setError('')
        try {
            await logout()
            history.push("/login")
        } catch {
            setError("Failed to log out")
        }
    }

    //Clear current user's favorite channels/streams
    async function handleReset() {
        clearFavorites(currentUser.uid)
    }

    return (
        <span className="w-100" style={{ maxWidth: "400px" }}>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <strong>Email:</strong> {currentUser.email}
                    <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
                        Update Profile
                    </Link>
                    <Link to="/search" className="btn btn-primary w-100 mt-3">
                        Find Streams
                    </Link>
                </Card.Body>
            </Card>
            <div className ="w-100 text-center mt-2">
                <Button variant="link" onClick={handleLogout}>Log Out</Button>
            </div>            
           <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Your Favorite Channels</h2>
                    <Button className="w-100" variant="link" onClick={handleReset}>Clear Favorites</Button>

                    {!mystreams
                        ? <p>No results</p>
                        : <div>
                            {mystreams.map((stream,index) => (
                            <span key={index}>
                                <Favorite id={stream.channelId} channelTitle={stream.channelTitle} />
                            </span>
                            ))}
                        </div>
                    }
                </Card.Body>
            </Card>
        </span>
    )
}
