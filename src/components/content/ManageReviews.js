import React, { Component } from 'react';
import { Card, Row, Col, Icon, Rate } from 'antd';
import { Button } from 'react-bootstrap';

class ManageReviews extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                {/* {this.props.profileDetails.reviews.map(function (item, index) {
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
                            extra={<Rate disabled defaultValue={2} />}>
                            {item.brand}   <br></br>
                            {item.addedBy}
                        </Card>
                    );
                }.bind(this))} */}
                <Card type="inner"
                    key={1}
                >
                    <Col span={14}>CAPTAIN<br></br>Calcutta West Bengal, India</Col>
                    <Col span={10}>
                        <Col span={16}><Rate disabled defaultValue={2} /></Col>
                        <Col span={8}>
                            <Button variant="link">
                                Edit
                            </Button>
                            <br></br>
                            <Button variant="link">
                                Delete
                            </Button>
                        </Col>
                    </Col>

                </Card>
                <Card type="inner"
                    key={1}>
                    <Col span={14}>CAPTAIN<br></br>Calcutta West Bengal, India</Col>
                    <Col span={10}>
                        <Col span={16}><Rate disabled defaultValue={2} /></Col>
                        <Col span={8}>
                            <Button variant="link">
                                Edit
                            </Button>
                            <br></br>
                            <Button variant="link">
                                Delete
                            </Button>
                        </Col>
                    </Col>
                </Card>
                <Card type="inner"
                    key={1}>
                    <Col span={14}>CAPTAIN<br></br>Calcutta West Bengal, India</Col>
                    <Col span={10}>
                        <Col span={16}><Rate disabled defaultValue={2} /></Col>
                        <Col span={8}>
                            <Button variant="link">
                                Edit
                            </Button>
                            <br></br>
                            <Button variant="link">
                                Delete
                            </Button>
                        </Col>
                    </Col>
                </Card>
                <Card type="inner"
                    key={1}>
                    <Col span={14}>CAPTAIN<br></br>Calcutta West Bengal, India</Col>
                    <Col span={10}>
                        <Col span={16}><Rate disabled defaultValue={2} /></Col>
                        <Col span={8}>
                            <Button variant="link" >
                                Edit
                            </Button>
                            <br></br>
                            <Button variant="link">
                                Delete
                            </Button>
                        </Col>
                    </Col>
                </Card>
            </div>
        )
    }
}

export default ManageReviews;