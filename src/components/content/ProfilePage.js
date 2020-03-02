import React, { Component } from 'react';
import { Card, Row, Col, Rate, Icon, Button, Collapse } from 'antd';
import '../../styles/search.css';

const { Panel } = Collapse;

class ProfilePage extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }
    render() {
        return (
            <div>
                <Row gutter={16} className="user-row-profile">
                    <Col span={6} className="show-profile">
                        <Card
                            className="image-card"
                            hoverable
                            cover={<img
                                alt="Profile Picture"
                                src={this.props.profileDetails.candidate.imageUrl}
                            //src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" //fortesting
                            />}
                        >

                        </Card>
                        <span className="profile-name">{this.props.profileDetails.candidate.fName}</span><br></br>
                        <span className="profile-last-name">{this.props.profileDetails.candidate.lName}</span><br></br>
                        <div>
                            <ul>
                                <li className="profile-heading">Average Rating</li>
                                <li className="profile-desc"><Rate disabled defaultValue={3} /></li>
                                <li className="profile-heading">Adhaar Number</li>
                                <li className="profile-desc">{this.props.profileDetails.candidate.aadhaar}</li>
                                <li className="profile-heading">Date Of Birth</li>
                                <li className="profile-desc">11 November 1995</li>
                                <li className="profile-heading">Gender</li>
                                <li className="profile-desc">Male</li>
                            </ul>
                        </div>
                    </Col>
                    <Col span={16} className="show-reviews">
                        <Card>
                            <div>
                                <Row gutter={8}>
                                    <Col span={12}>
                                        <span className="review-head">JOB TIMELINE</span>
                                    </Col>
                                    <Col span={12}>
                                        <Button
                                            onClick={this.props.addReview}
                                            className="profile-btn"
                                        >
                                            <Icon type="plus" />
                                            ADD REVIEW
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
                            <Collapse
                                defaultActiveKey={['1']}
                                expandIconPosition="right"
                            >
                                {this.props.profileDetails.reviews.map(function (item, index) {
                                    // let review = 0;
                                    // rating.map(function (rate) {
                                    //     if (item.review == rate.type) {
                                    //         review = rate.id;
                                    //         return false;
                                    //     }
                                    // })
                                    let header = item.title +' '+item.company;
                                    return (
                                        <Panel 
                                            header = {header}
                                            key = {index}
                                            extra = {<Rate disabled defaultValue = { item.review } />}
                                            className="panel-title"
                                            >
                                                <span className="panel-body">REVIEWS & RATINGS</span>
                                                <div>{item.brand}</div>
                                        </Panel>  

                            );                            
                        }.bind(this))}
                            </Collapse>
                        </Card>
                    </Col>
                </Row>
            </div >
        )
    }
}

export default ProfilePage;