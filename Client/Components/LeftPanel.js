import React, { Component } from 'react';
import './LeftPanel.css';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';
import styles from './PanelStyle';

class LeftPanel extends Component {
    render(){
        const { classes } = this.props;
        if(this.props.isLoggedIn == true){
            return (
                
                    <Grid item xs = {2}>
                        {/* <Paper className = {classes.paper}> */}
                        <Typography variant="h6" color="inherit">
                            {this.props.userName}
                        </Typography>
                        
                        <button>Get All Books</button>
                        {/* </Paper> */}
                    </Grid>
            )
        }
        else return null;
    }
}

const mapStateToProps = (state) => {
    // console.log(state)
    return {
        isLoggedIn: state.LoginReducer.isLoggedIn,
        userName: state.LoginReducer.userName
    }
}



export default withStyles(styles)(connect(
    mapStateToProps
)(LeftPanel));