import React from 'react'
import Channel from './Channel'
import Banner from './Banner'

const Search = () => {
  const [word, setWord] = React.useState('software');
  const [streams, setStreams] = React.useState(null);
  const getStreams = () => {
    fetch('/api/streams/' + word)
    .then(result => result.json())
    .then(body => {
      setStreams(body)
    })
    .catch(error => console.log(error))
  };

    return (
        <div className="app text-center">
            <Banner />
            <h2>Search for a YouTube livestream, view your current favorites, or manually add a favorite channel!</h2>
            <input className="w-100" value={word} type="text" onChange={e => setWord(e.target.value)} />
            <button onClick={getStreams}>Search</button>
            {streams && (
              streams.length === 0
              ? <p>No results</p>
              : <div>
                {streams.map((stream,index) => (
                  <span key={index}>
                    <Channel title={stream.snippet.title} id={stream.snippet.channelId} channelTitle={stream.snippet.channelTitle} />
                  </span>
                ))}
              </div>
          )}
        </div>
    );
}

export default Search;
