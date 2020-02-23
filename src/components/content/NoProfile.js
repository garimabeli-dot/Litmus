import React, { Component, Fragment } from 'react';
import { Empty, Button } from 'antd';
import CreateProfile from './CreateProfile';

class NoProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            createProfile: false
        }
    }
    createProfile = () => {
        this.setState({
            createProfile: true
        })
    }
    render() {
        return (
            <Fragment>
                {this.state.createProfile ? 
                <CreateProfile />
                : 
                <Empty
                    description={
                        <span>
                            <span className="search-span">Sorry!</span><br></br>
                            No profile found for the Adhaar Number entered!
                    </span>
                    }
                    >
                    <Button
                        onClick={this.createProfile}
                    >Create Profile</Button>
                </Empty>}
            </Fragment>
        )
    }
}

export default NoProfile;