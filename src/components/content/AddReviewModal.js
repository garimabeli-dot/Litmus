import React, { Component, Fragment } from 'react';
import { Modal, Button, Form, Select, DatePicker, Upload, Input, Rate, Row, Col } from 'antd';
import moment from 'moment';

import { postReviews } from '../../api/Login';
import '../../styles/search.css';

const { Option } = Select;

const rating = [
    { type: 'excellent', id: 1 },
    { type: "positive", id: 2 },
    { type: "neutral", id: 3 },
    { type: "bad", id: 4 },
    { type: "worse", id: 5 }
]
class AddReview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            showAddReview: this.props.showAddReview,
            title: '',
            company: '',
            brand: '',
            startDate: '',
            endDate: '',
            rate: 0,
            remarks: ''
        };
    }

    handleCancel = () => {
        this.setState({
            showAddReview: false
        });
    };

    handleSignUp = (value) => {
        this.setState({
            showSignUp: value
        });
    }
    validateTitle = (rule, value, callback) => {
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
    validateRate = (rule, value, callback) => {
        if (value == 0) {
            callback('Please Select Rating!');
        } else {
            callback();
        }
    };
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    handleStartDate = (event) => {
        this.setState({
            startDate: event
        });
    };
    handleEndDate = (event) => {
        this.setState({
            endDate: event
        });
    };
    handleChangeRate = (event) => {
        this.setState({
            rate: event
        });
    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.postReviews();
            }
        });
    };

    postReviews() {
        // let rate = '';
        // rating.map(function (rateObj) {
        //     if (rateObj.id == this.state.rate) {
        //         rate = rateObj.type;
        //     }
        // }.bind(this));
        let startDate = moment(this.state.startDate).valueOf();
        let endDate = moment(this.state.endDate).valueOf();
        let obj = {
            candidate: 1,
            addedBy: 1,
            company: this.state.company,
            title: this.state.title,
            brand: this.state.brand,
            review: this.state.rate,
            startDate: startDate,
            endDate: endDate
        }

        let url = "https://zlitmus.herokuapp.com/review/create",
            method = 'POST',
            header = {
                "Content-Type": "application/json"
            };

        Promise.all([
            postReviews(url, method, header, obj)
        ]).then(responses => responses.forEach(
            (response => {
                alert(response.message);
                this.setState({
                    showAddReview: false
                })
            })
        ))
            .catch(err => alert(err));
    }
    // normFile = e => {
    //     console.log('Upload event:', e);
    //     if (Array.isArray(e)) {
    //         return e;
    //     }
    //     return e && e.fileList;
    // };
    render() {
        const { showAddReview, loading } = this.state;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        return (
            <div>
                <Modal
                    visible={showAddReview}
                    title="ADD REVIEW"
                    onCancel={this.handleCancel}
                    footer={[
                        <Fragment>
                            <Button key="1" className="delete-review" onClick={this.handleCancel}>
                                Delete
                            </Button>
                            <Button key="2" onClick={this.handleSubmit}>
                                Publish
                        </Button>
                        </Fragment>
                    ]}
                >
                    <Form {...formItemLayout}>
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
                                placeholder="Enter Job Title"
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
                                placeholder="Enter Company"
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
                                placeholder="Enter Brand"
                            />)}
                        </Form.Item>

                        <Form.Item label="Start Date">
                            {getFieldDecorator('startdate',
                                {
                                    rules: [
                                        {
                                            type: 'object',
                                            required: true,
                                            message: 'Please select Start Date!'
                                        }],
                                })(<DatePicker
                                    onChange={this.handleStartDate}
                                    name="startDate"
                                    placeholder="Select Start Date"
                                />)}
                        </Form.Item>
                        <Form.Item label="End date">
                            {getFieldDecorator('enddate',
                                {
                                    rules: [
                                        {
                                            type: 'object',
                                            required: true,
                                            message: 'Please select End Date!'
                                        }],
                                })(<DatePicker
                                    onChange={this.handleEndDate}
                                    name="endDate"
                                    placeholder="Select End Date"
                                />)}
                        </Form.Item>
                        <Form.Item label="Rating">
                            {getFieldDecorator('rate', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please Select Rating!',
                                    },
                                    {
                                        validator: this.validateRate
                                    }
                                ],
                            })(<Rate
                                onChange={this.handleChangeRate}
                                name="rate"
                            />)}
                        </Form.Item>

                        <Form.Item label="Your Reviews">
                            {getFieldDecorator('description', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please Write Some Remarks!',
                                    }]
                            })(<Input
                                type="textarea"
                                onChange={this.handleChange}
                                name="remarks"
                                placeholder="Enter Reviews"
                            />)}
                        </Form.Item>
                        {/* <Form.Item label="Upload" extra="longgggg">
                            {getFieldDecorator('upload', {
                                valuePropName: 'fileList',
                                getValueFromEvent: this.normFile,
                            })(
                                <Upload name="logo" action="/upload.do" listType="picture">
                                    <Button>
                                        <Icon type="upload" /> Click to upload
                                </Button>
                                </Upload>,
                            )}
                        </Form.Item> */}

{/* 

                        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                        </Button>
                        </Form.Item> */}
                    </Form>
                </Modal>

            </div>
        );
    }
}
const AddReviewModal = Form.create({ name: 'validate_other' })(AddReview);
export default AddReviewModal;