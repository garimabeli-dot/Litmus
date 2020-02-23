import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import { postLoginDetails } from '../../api/Login';

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstname:'',
            lastname:'',
            company:'',
            brand:'',
            email:'',
            password:'',
            confirmpassword:'',
            confirmDirty: false,
            autoCompleteResult: [],
        };
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.signUpDetails();
            }
        });
    };   
    signUpDetails = () => {
        var url="https://zlitmus.herokuapp.com/signup?email="+this.state.email
        +"&fName="+this.state.firstname
        +"&lName="+this.state.lastname
        +"&company="+this.state.company
        +"&brand="+this.state.brand
        +"&password="+this.state.password;
        var method='POST';
        Promise.all([
            postLoginDetails(url,method)
        ]).then(responses => responses.forEach(
                response => alert(response.message)
            ))
            .catch(err => alert(err));
    };
    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    validateFirstName = (rule, value, callback) => {
        if (!value) {
            callback(' ');
        } else {
            callback();
        }
    };

    validateLastName = (rule, value, callback) => {
        if (!value) {
            callback(' ');
        } else {
            callback();
        }
    };
    validateCompany = (rule, value, callback) => {
        if (!value) {
            callback(' ');
        } else {
            callback();
        }
    };
    validateBrand = (rule, value, callback) => {
        if (!value) {
            callback(' ');
        } else {
            callback();
        }
    };

    handleChange = (event) => {
        this.setState({ 
            [event.target.name] : event.target.value 
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item label="First Name">
                    {getFieldDecorator('fname', {
                        rules: [
                            {
                                required: true,
                                message: 'Please Enter First Name!',
                            },
                            {
                                validator: this.validateFirstName,
                            },
                        ],
                    })(<Input 
                            onChange={this.handleChange}
                            name="firstname"
                        />)}
                </Form.Item>
                <Form.Item label="Last Name">
                    {getFieldDecorator('lname', {
                        rules: [
                            {
                                required: true,
                                message: 'Please Enter Last Name!',
                            },
                            {
                                validator: this.validateLastName,
                            },
                        ],
                    })(<Input 
                            onChange={this.handleChange}
                            name="lastname"
                        />)}
                </Form.Item>
                <Form.Item label="Company">
                    {getFieldDecorator('company', {
                        rules: [
                            {
                                required: true,
                                message: 'Please Enter Company!',
                            },
                            {
                                validator: this.validateCompany
                            },
                        ],
                    })(<Input 
                            onChange={this.handleChange}
                            name="company"
                    />)}
                </Form.Item>
                <Form.Item label="Brand">
                    {getFieldDecorator('brand', {
                        rules: [
                            {
                                required: true,
                                message: 'Please Enter Brand!',
                            },
                            {
                                validator: this.validateBrand
                            },
                        ],
                    })(<Input 
                            onChange={this.handleChange}
                            name="brand"
                    />)}
                </Form.Item>
                <Form.Item label="E-mail">
                    {getFieldDecorator('email', {
                        rules: [
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ],
                    })(<Input 
                            onChange={this.handleChange}
                            name="email"
                    />)}
                </Form.Item>
                <Form.Item label="Password" hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                min:5,
                                max:12,
                                message: 'Password length should be more than 5 and less than 10 characters!',
                            },
                            {                               
                                validator: this.validateToNextPassword,
                            },
                        ],
                    })(<Input.Password 
                            onChange={this.handleChange}
                            name="password"
                      />)}
                </Form.Item>
                <Form.Item label="Confirm Password" hasFeedback>
                    {getFieldDecorator('confirm', {
                        rules: [
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            {
                                validator: this.compareToFirstPassword,
                            },
                        ],
                    })(<Input.Password 
                            onBlur={this.handleConfirmBlur}
                            onChange={this.handleChange}
                            name="confirmpassword" 
                        />)}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button 
                        htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const SignUpForm = Form.create({ name: 'register' })(SignUp);

export default SignUpForm;