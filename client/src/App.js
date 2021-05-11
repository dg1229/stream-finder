import React from 'react';
import './App.css';
import Nav from './components/Nav';
import Search from './components/Search';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Signup from './components/User/Signup';
import { Container } from 'react-bootstrap'
import { AuthProvider } from './contexts/AuthContext';
import { auth } from './firebase';
import Dashboard from './components/User/Dashboard'
import Login from './components/User/Login'
import PrivateRoute from "./components/PrivateRoute"
import ForgotPassword from "./components/User/ForgotPassword"
import UpdateProfile from './components/User/UpdateProfile'

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
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
      >
        <Nav fixed="top" />
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Router>
            <AuthProvider>
              <Switch>
                <PrivateRoute exact path="/" component={Dashboard} />
                <PrivateRoute path="/update-profile" component={UpdateProfile} />
                <Route path="/search" component={Search} />
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
                <Route path="/forgot-password" component={ForgotPassword} />
              </Switch>
            </AuthProvider>
          </Router>
        </div>
      </Container>
  );
}

export default App;