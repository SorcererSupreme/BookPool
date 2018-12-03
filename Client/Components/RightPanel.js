import React, { Component } from 'react';
import './RightPanel.css';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import styles from './PanelStyle';

class RightPanel extends Component {
    render(){

        const { classes } = this.props;
        if(this.props.isLoggedIn == true){
            return (
                <Grid item xs = {3}>
                    {/* <Paper className = {classes.paper} /> */}
                </Grid>
            )
        }
        else return null;
    }
}

const mapStateToProps = (state) =>{
    return {
        isLoggedIn: state.LoginReducer.isLoggedIn
    }
}

export default withStyles(styles)(connect(
    mapStateToProps
)(RightPanel));