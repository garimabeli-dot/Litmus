import React, { Component } from 'react';
import SignUp from './signUp';
import SignIn from './SignIn';
import { Modal, Button } from 'antd';
import '../../styles/login.css';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            showSignIn: this.props.showSignIn,
            showSignUp: this.props.showSignUp
        };
    }    

    handleCancel = () => {
        this.setState({
            showSignIn: false
        });
    };

    handleSignUp = (value) => {
        this.setState({
            showSignUp: value
        });
    }
    render() {
        const { showSignIn, loading } = this.state;
        return (
            <div>
                <Modal
                    visible={showSignIn}
                    title="Welcome to LITMUS"
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            Cancel
                        </Button>
                    ]}
                >
                    {
                        this.state.showSignUp ? 
                            <SignUp /> 
                            : 
                            <SignIn 
                                handleSignUp={this.handleSignUp}
                                visible={this.props.showSignIn}/>
                    }
                </Modal>

            </div>
        );
    }
}
export default Login;