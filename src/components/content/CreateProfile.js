import React, { Component } from 'react';
import { Form, Select, Button, Upload, Icon, Input } from 'antd';
import { postProfileDetails } from '../../api/Login';
import '../../styles/search.css';

const { Option } = Select;

class CreateProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstname: '',
            lastname: '',
            adhaarno: '',
            profilepicture: null,
        }
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
    validateAdhaar = (rule, value, callback) => {
        if (isNaN(value) || value.length != 12) {
            callback(' ');
        } else {
            callback();
        }
    };
    normFile = e => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    onChangeHandler = (event) => {
        this.setState({
            profilepicture: event.target.files[0]
        })
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.createProfile();
            }
        });
    };
    createProfile = () => {
        var data = new FormData();
        data.append('fName', this.state.firstname);
        data.append('lName', this.state.lastname);
        data.append('aadhaar', this.state.adhaarno);
        data.append('image', this.state.profilepicture);
        let url = "https://zlitmus.herokuapp.com/candidate/create"
        let method = 'POST';
        let header = {
            "Content-Type": "multipart/form-data"
        };
        Promise.all([
            postProfileDetails(url, method, header, data)
        ]).then(responses => responses.forEach(
            response => alert(response.message)
        ))
            .catch(err => alert(err));
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item label="">
                    <span className="ant-form-text">Create Profile</span>
                </Form.Item>
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
                <Form.Item label="Adhaar Number">
                    {getFieldDecorator('adhaar', {
                        rules: [
                            {
                                required: true,
                                message: 'Please Enter Valid Adhaar Number!',
                            },
                            {
                                validator: this.validateAdhaar,
                            },
                        ],
                    })(<Input
                        onChange={this.handleChange}
                        name="adhaarno"
                        maxLength={12}
                        placeholder="Adhaar Number"
                    />)}
                </Form.Item>
                <Form.Item label="Upload Profile">
                    {/* {getFieldDecorator('upload',{
                        rules: [
                            {
                                required: true,
                                message: 'Please Upload Profile Picture!',
                            },
                            {
                                valuePropName: 'fileList',
                                getValueFromEvent: this.normFile,
                            }
                        ]
                        })(
                        <Upload 
                            name="profilepicture" 
                            action="/upload.do" 
                            listType="picture">
                            <Button>
                                <Icon type="upload" /> Click to upload
                            </Button>
                        </Upload>,
                    )} */}
                    <div className="upload-input">
                        <Input
                            className="profile-upload"
                            type="file"
                            name="file"
                            onChange={this.onChangeHandler}
                        />
                    </div>
                </Form.Item>
                <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                    <Button type="primary" htmlType="submit">
                        Create Profile
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}

const CreateUserProfile = Form.create({ name: 'validate_other' })(CreateProfile);
export default CreateUserProfile;