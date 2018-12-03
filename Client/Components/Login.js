import React, {Component} from 'react';
import {connect} from 'react-redux';
import {thunk_login_action} from '../redux/actions/loginActions';
import Button from '@material-ui/core/Button'

class Login extends Component {
    constructor(props){
        super(props);
        console.log(props);
    }

    componentDidMount(){
        this.props.dispatch(thunk_login_action())
    }

    render(){

        if(this.props.isLoggedIn == false){
            return (
                <div>
                    <Button href = "/auth/facebook/" variant="contained" color="primary" >
                        FB login
                     </Button>
                </div>
            )
        }

        else return null;

    }
}

const mapStateToProps = (state) =>
{
    console.log(state);
    return {
        userName: state.LoginReducer.userName,
        isLoggedIn: state.LoginReducer.isLoggedIn
    }
}

export default connect(mapStateToProps)(Login);