import React from 'react'
import Channel from './Channel'

const Search = () => {
  const [word, setWord] = React.useState('software');
  const [streams, setStreams] = React.useState(null);
  const getStreams = () => {
    fetch('/api/streams/' + word)
    .then(result => result.json())
    .then(body => {
      setStreams(body);
      this.setState({streams: []});
    })
    .catch(error => console.log(error))
  };

    return (
        <div className="app">
            <h2>Search for a YouTube livestream, view your current favorites, or manually add a favorite channel!</h2>
            <input value={word} type="text" onChange={e => setWord(e.target.value)} />
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
