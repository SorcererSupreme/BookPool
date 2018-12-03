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
import Grid from '@material-ui/core/Grid';

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
                        <Header />
                        <Route path = "/" component = {Login} />
                        <Grid container spacing = {24} 
                                style = {{backgroundColor :'#e9ebee', height: 'auto'}}
                                justify = "center">
                            <LeftPanel />
                            <MiddlePanel />
                            <RightPanel />
                        </Grid>
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