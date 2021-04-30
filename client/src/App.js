import React from 'react';
import './App.css';
import Nav from './components/Nav';
import Search from './components/Search';
import { BrowserRouter as Router, Route} from 'react-router-dom';

function App() {
  const [word, setWord] = React.useState('software');
  const [associations, setAssociations] = React.useState(null);
  const getAssociations = () => {
    fetch('/api/associations/' + word)
    .then(result => result.json())
    .then(body => setAssociations(body))
    .catch(error => console.log(error))
  };

  return (
    <Router>      
      <Nav />
      <Route path='/' exact render={(props) => (
        <Search />
      )} />
    </Router>
  );
}

export default App;