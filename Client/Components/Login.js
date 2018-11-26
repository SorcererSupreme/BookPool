import React, {Component} from 'react';
import {connect} from 'react-redux';
import {thunk_login_action} from '../redux/actions/loginActions'

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
                    <a href = "/auth/facebook/">FB login</a>
                    <h3>login Component</h3>
                </div>
            )
        }

        else if (this.props.isLoggedIn == true) {
            return (
                <div>

                    <div>{this.props.userName}</div>
                    <h3>login Component</h3>
                </div>
            )
        }

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