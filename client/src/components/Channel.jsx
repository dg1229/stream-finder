import React from 'react'

const Channel = ({ title, id, channelTitle}) => {
    return (
        <div>
            <h1>{title}</h1>
            <a href={`https://www.youtube.com/channel/${id}`}>{channelTitle}'s Channel</a>
        </div>
    )
}

export default Channel
