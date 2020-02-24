import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import { postLoginDetails } from '../../api/Login';
import '../../styles/account.css';

class ManageDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstname: '',
            lastname: '',
            title: '',
            currentpassword: '',
            password: '',
            confirmpassword: '',
            confirmDirty: false,
        };
    }
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
    validateTitle = (rule, value, callback) => {
        if (!value) {
            callback(' ');
        } else {
            callback();
        }
    };
    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                //this.updateProfile();
            }
        });
    };
    updateProfile = () => {
        var url = "";
        var method = 'POST';
        Promise.all([
            postLoginDetails(url, method)
        ]).then(responses => responses.forEach(
            response => alert(response.message)
        ))
            .catch(err => alert(err));
    }
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
                        placeholder="First Name"
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
                        placeholder="Last Name"
                    />)}
                </Form.Item>
                <Form.Item label="Title">
                    {getFieldDecorator('title', {
                        rules: [
                            {
                                required: true,
                                message: 'Please Enter Title!',
                            },
                            {
                                validator: this.validateTitle
                            },
                        ],
                    })(<Input
                        onChange={this.handleChange}
                        name="title"
                        placeholder="Title"
                    />)}
                </Form.Item>
                <Form.Item label="Enter Current Password" hasFeedback>
                    <div className="form-password">
                        {getFieldDecorator('currentpassword', {
                            rules: [
                                {
                                    min: 5,
                                    max: 12,
                                    message: 'Password length should be more than 5 and less than 10 characters!',
                                },
                            ],
                        })(<Input.Password
                            onChange={this.handleChange}
                            name="currentpassword"
                            placeholder="Current Password"
                        />)}
                    </div>
                </Form.Item>
                <Form.Item label="Password" hasFeedback>
                    <div className="form-password">
                        {getFieldDecorator('password', {
                            rules: [
                                {
                                    min: 5,
                                    max: 12,
                                    message: 'Password length should be more than 5 and less than 10 characters!',
                                },
                                {
                                    validator: this.validateToNextPassword,
                                },
                            ],
                        })(<Input.Password
                            onChange={this.handleChange}
                            name="password"
                            placeholder="Password"
                        />)}
                    </div>
                </Form.Item>
                <Form.Item label="Confirm Password" hasFeedback>
                    <div className="form-password">
                        {getFieldDecorator('confirm', {
                            rules: [
                                {
                                    validator: this.compareToFirstPassword,
                                },
                            ],
                        })(<Input.Password
                            onBlur={this.handleConfirmBlur}
                            onChange={this.handleChange}
                            name="confirmpassword"
                            placeholder="Confirm Password"
                        />)}
                    </div>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button
                        htmlType="submit">
                        Update
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}

const ManageUserDetail = Form.create({ name: 'register' })(ManageDetails);
export default ManageUserDetail;