import React, { Component } from 'react';
import { Tabs } from 'antd';
import ManageDetails from './ManageDetails';
import ManageUsers from './ManageUsers';
import ManageReviews from './ManageReviews';
import '../../styles/account.css';

const { TabPane } = Tabs;

class MyAccount extends Component {
    callback = (key) => {
        console.log(key);
    }
    render() {
        return (
            <Tabs defaultActiveKey="1" onChange={this.callback}>
                <TabPane tab="Your Details" key="1">
                    <ManageDetails />
                </TabPane>
                <TabPane tab="Manage Users" key="2">
                    <ManageUsers />
                </TabPane>
                <TabPane tab="Manage Reviews" key="3">
                    <ManageReviews />
                </TabPane>
            </Tabs>
        )
    }
}

export default MyAccount;