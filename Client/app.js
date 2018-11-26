import React, {Component } from 'react';
import Login from './Components/Login.js'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router,Route,Link } from 'react-router-dom';
import BookPage from './Components/BookPage.js';
import {Provider} from 'react-redux';
import { createStore } from 'redux';
import RootReducer from './redux/reducers/RootReducer';
import store from './store';

import LeftPanel from './Components/LeftPanel';
import MiddlePanel from './Components/MiddlePanel';
import RightPanel from './Components/RightPanel';
import Header from './Components/Header';
// import './app.css';


//
//getInitialState()

class App extends Component{
    render(){
        return(
            <div>
                <Provider store = {store}>
                <Router>
                    <div>
                        <Route path = "/" component = {Login} />
                        <Header />
                        <LeftPanel />
                        <MiddlePanel />
                        <RightPanel />
                    </div>
                </Router>
                </Provider>
            </div>
        )
    }
}

const domContainer = document.getElementById("react-container");
ReactDOM.render(<App />,domContainer);
console.log("was inside the app component")

export default App;