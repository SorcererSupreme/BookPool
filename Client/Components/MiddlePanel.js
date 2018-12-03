import React, { Component } from 'react';
import './MiddlePanel.css';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import styles from './PanelStyle';
import {bookChanged} from '../redux/actions/BookActions'
import {thunk_book_add_action} from '../redux/actions/BookActions'

class MiddlePanel extends Component{
    constructor(props){
        super(props);
        // this.handleSubmit = this.handleSubmit.bind(this)
    }



    render(){
        const { classes } = this.props;
        if(this.props.isLoggedIn == true){
            return (
                <Grid item xs = {6}> 
                    <Paper className = {classes.paper} >
                        <form onSubmit = {this.props.handleSubmit}>
                            <label>book name</label>
                            <input type = "text" name = "book_name" onChange = {this.props.handleChange} />
                            <label>authors list</label>
                            <input type = "text" name = "authors_list" onChange = {this.props.handleChange}/>
                            <label>genre</label>
                            <input type = "text" name="genre" onChange = {this.props.handleChange}/>
                            <input type = "submit" value = "Add" />
                        </form>
                            
                    </Paper>
                </Grid>
            ) 
        }
        else return null;
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    //add all the properties and than feed them in again as input values;
    //and than also dispatch a submit action that will hit the api backend and add the book
    return {
        isLoggedIn: state.LoginReducer.isLoggedIn,
        user_name: state.BookReducer.user_name
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleChange: event => {
            console.log(event.target.name);
            dispatch(bookChanged(event));
        },
        handleSubmit: (event) => {
            dispatch(thunk_book_add_action());
            event.preventDefault();
        }
    }
}

export default withStyles(styles)(connect(
    mapStateToProps,
    mapDispatchToProps
)(MiddlePanel));