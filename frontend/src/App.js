import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Bookings from './components/Bookings';
import Login from './components/Login';
import Signup from './components/Signup';

const App = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/" component={Bookings} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;
