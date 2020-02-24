import React, { Component } from 'react';
import { Card, Row, Col, Rate, Icon, Button } from 'antd';
import '../../styles/search.css';

const rating = [
    { type: 'excellent', id: 1 },
    { type: "positive", id: 2 },
    { type: "neutral", id: 3 },
    { type: "bad", id: 4 },
    { type: "worse", id: 5 }
]
class ProfilePage extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }
    render() {
        return (
            <div>
                <Row gutter={16}>
                    <Col span={8} className="show-profile">
                        <Card
                            hoverable
                            cover={<img
                                alt="Profile Picture"
                                //src={this.props.profileDetails.candidate.imageUrl} 
                                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" //fortesting
                            />}
                        >
                            <span className="profile-name">{this.props.profileDetails.candidate.fName}{' '}{this.props.profileDetails.candidate.lName}</span><br></br>
                            <span className="profile-adhaar">Adhaar Number : {this.props.profileDetails.candidate.aadhaar}</span>

                        </Card>
                    </Col>
                    <Col span={16}>
                        <Card>
                            <div>
                                <Row gutter={8}>
                                    <Col span={12}>
                                        <h3>Reviews</h3>
                                    </Col>
                                    <Col span={12}>
                                        <Button
                                            onClick={this.props.addReview}
                                            className="profile-btn"
                                        >
                                            <Icon type="plus" />
                                            Add Review
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
                            {this.props.profileDetails.reviews.map(function (item, index) {
                                let review = 0;
                                rating.map(function (rate) {
                                    if (item.review == rate.type) {
                                        review = rate.id;
                                        return false;
                                    }
                                })
                                return (
                                    <Card type="inner"
                                        key={index}
                                        title={item.company}
                                        extra={<Rate disabled defaultValue={review} />}>
                                        {item.brand}   <br></br>
                                        {item.addedBy}
                                    </Card>
                                );
                            }.bind(this))}
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default ProfilePage;