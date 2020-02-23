import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, Descriptions } from 'antd';
import { postLoginDetails } from '../../api/Login';

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            loading: false,
        };
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.setState({
                    loading: true,
                }, () => {
                    this.signInDetails();
                });
            }
            else {
                this.setState({
                    loading: false,
                });
            }
        });
    };
    signInDetails = () => {
        var url = "https://zlitmus.herokuapp.com/login?email=" + this.state.email + "&password=" + this.state.password;
        var method = 'POST';
        Promise.all([
            postLoginDetails(url, method)
        ]).then(responses => responses.forEach(
            response => alert(response.message)
        ))
            .catch(err => alert(err));
    };
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    handleSignUp = () => {
        this.props.handleSignUp(true);
    }
    render() {
        const { loading } = this.state;
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
               
                    <Descriptions>
                        <Descriptions.Item><Icon type="exclamation-circle" />This is an invite only portal.If you are an NRAI
                                            member and haven't received an
                    invite yet please contact us.</Descriptions.Item>
                    </Descriptions>
              
                <Form.Item>
                    Sign in to your Account
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please Enter Email Id!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Email"
                            onChange={this.handleChange}
                            name="email"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please Enter Password!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                            onChange={this.handleChange}
                            name="password"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(<Checkbox>Remember me</Checkbox>)}
                    {/* <br></br>
                            <a className="login-form-forgot" href="">
                                Forgot password
                            </a> */}
                    <br></br>
                    <Button
                        htmlType="submit"
                        className="login-form-button">
                        Log in
                            </Button>
                    &nbsp; Or &nbsp;
                            <Button
                        loading={loading}
                        htmlType="button"
                        onClick={this.handleSignUp}>
                        New user? Signup!
                            </Button>
                </Form.Item>
            </Form>
        );
    }
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(SignIn);
export default WrappedNormalLoginForm;