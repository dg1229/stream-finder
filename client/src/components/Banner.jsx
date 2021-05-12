import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { database } from '../firebase'
import { useAuth } from '../contexts/AuthContext'

//Starter code for navbar sourced from https://react-bootstrap.github.io/components/navbar/
export default function Banner() {
    const [sponsored, setSponsored] = useState(null)

    useEffect(() => {
        const ref = database.ref('sponsored/')

        ref.on("value", (snapshot) => {
            setSponsored(snapshot.val())
        })

        return () => ref.off()
    }, [])

    if(!sponsored) return <></>
  return (
    <>
        <Container bg="dark" variant="dark" className="padding-lg">
            <h2>Sponsored Streamer {sponsored.channelTitle}</h2>
            <a href={`https://www.youtube.com/channel/${sponsored.channelId}`}>Go To Channel</a>
        </Container>
      </>
  )
}
