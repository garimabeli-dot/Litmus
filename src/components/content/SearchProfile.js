import React, { Component, Fragment } from 'react';
import { Input, Button, Form, Icon, notification, message } from 'antd';

import NoProfile from './NoProfile';
import ProfilePage from './ProfilePage';
import AddReviewModal from './AddReviewModal';

import '../../styles/search.css';
import { postLoginDetails } from '../../api/Login';

message.config({
    top: 560,
    left:300,
  });

class SearchProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            adhaar: '',
            //showSearch: this.props.showSearch,
            showSearch: true,
            showProfile: false,
            profileDetails: [],
            showAddReview: false
        }
    }
    openNotification(title){
        const args = {
          message: title,
          //duration: 0,
        };
        notification.open(args);
      };
      success(title){
        message.success(title,5);
      };
      
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
                    // if (response.reviews.length > 0 && response.candidate != "") {
                        if (response.candidate != "") {
                        this.setState({
                            showProfile: true,
                            showSearch: false,
                            profileDetails: response
                        });
                        this.success(response.message);
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
                    <Fragment
                        // image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                        // imageStyle={{
                        //     height: 60,
                        // }}
                        //description={
                            
                        //}
                    >
                        <div className="search-adhaar-no">
                            <span>
                                <span className="search-span">Search or Create</span><br></br>
                                <span className="search-span-two">via Adhaar</span>
                            </span>
                        </div>
                        <br></br>
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
                                    placeholder="                                   Enter Adhaar Number"
                                />)}
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    htmlType="submit">
                                    SEARCH
                                </Button>
                                &nbsp;&nbsp;&nbsp;
                                    <Button
                                        htmlType="button"
                                        onClick={this.addReviews}
                                >
                                        <Icon type="plus" />
                                        ADD REVIEW
                                    </Button>
                            </Form.Item>
                        </Form>
                    </Fragment>

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