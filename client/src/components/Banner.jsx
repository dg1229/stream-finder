import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { database } from '../firebase'

//Starter code for navbar sourced from https://react-bootstrap.github.io/components/navbar/
export default function Banner() {
    const [sponsored, setSponsored] = useState(null)

    //Get current sponsor
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
        <Container>
            <h2>Sponsored Streamer {sponsored.channelTitle}</h2>
            <a href={`https://www.youtube.com/channel/${sponsored.channelId}`}>Go To Channel</a>
        </Container>
      </>
  )
}
