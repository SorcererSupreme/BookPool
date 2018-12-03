import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux';

class Header extends Component{
    render(){
        if(this.props.isLoggedIn == true){
            return (
                <div>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="title" color="inherit">
                                BookPool
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </div>
            )
        }
        else return null;
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.LoginReducer.isLoggedIn
    }
}

export default connect(
    mapStateToProps
)(Header);