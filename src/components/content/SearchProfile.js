import React, { Component } from 'react';
import { Empty, Input, Button, Form, Icon } from 'antd';

import NoProfile from './NoProfile';
import ProfilePage from './ProfilePage';
import AddReviewModal from './AddReviewModal';

import '../../styles/search.css';
import { postLoginDetails } from '../../api/Login';

class SearchProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            adhaar: '',
            showSearch: this.props.showSearch,
            showProfile: false,
            profileDetails: [],
            showAddReview: false
        }
    }
    validateAdhaar = (rule, value, callback) => {
        if (isNaN(value) || value.length != 12) {
            callback(' ');
        } else {
            callback();
        }
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
                this.getDetailByAdhaar(this.state.adhaar);
            }
        });
    };
    getDetailByAdhaar(adhaar) {
        var url = "https://zlitmus.herokuapp.com/check?aadhaar=" + adhaar;
        var method = 'GET';
        Promise.all([
            postLoginDetails(url, method)
        ]).then(responses => responses.forEach(
            response => {
                {
                    //alert(response.message);
                    if (response.reviews.length > 0 && response.candidate != "") {
                        this.setState({
                            showProfile: true,
                            showSearch: false,
                            profileDetails: response
                        })
                    }
                    else {
                        this.setState({
                            showProfile: false,
                            showSearch: false
                        })
                    }
                }
            }
        ))
            .catch(err => {alert(err);
                this.setState({
                    showProfile: false,
                    showSearch: false
                })
            });
    }
    addReviews = (e) => {
        this.setState({
            showAddReview : true
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                {this.state.showSearch ?
                    <Empty
                        image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                        imageStyle={{
                            height: 60,
                        }}
                        description={
                            <span>
                                <span className="search-span">Search or Create</span><br></br>
                                <span className="search-span-two">via Adhaar</span>
                            </span>
                        }
                    >
                        Enter Adhaar Number<br></br>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Item label="">
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
                                    name="adhaar"
                                    maxLength={12}
                                    placeholder="Adhaar Number"
                                />)}
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    htmlType="submit">
                                    Search
                                </Button>
                                &nbsp;&nbsp;&nbsp;
                                    <Button
                                        htmlType="button"
                                        onClick={this.addReviews}
                                >
                                        <Icon type="plus" />
                                        Add Reviews
                                    </Button>
                            </Form.Item>
                        </Form>
                    </Empty>

                    :
                    (this.state.showProfile ?
                        <ProfilePage
                            profileDetails={this.state.profileDetails}
                            addReview={this.addReviews}
                        />
                        :
                        <NoProfile />
                    )                
                }
                {this.state.showAddReview ? <AddReviewModal showAddReview={this.state.showAddReview}/> : ''}
                
            </div>

        )
    }
}

const SearchAdhaarProfile = Form.create({ name: 'search' })(SearchProfile);

export default SearchAdhaarProfile;