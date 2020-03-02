import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import AddReviews from './AddReviewModal';

class Header extends Component {
    constructor(props){
        super(props);

        this.state = {
            showAddReview : false
        }
    }
    addReviews = (e) => {
        this.setState({
            showAddReview : true
        })
    }
    render() {
        return (
            <div>
                <Button
                    htmlType="button"
                    onClick={this.addReviews}
                >
                    <Icon type="plus" />
                    ADD REVIEW
                </Button>
                {this.state.showAddReview ? <AddReviews showAddReview={this.state.showAddReview} /> : ''}                
            </div>
        )
    }
}

export default Header;
