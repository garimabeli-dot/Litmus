import React, { Component, Fragment } from 'react';
import { Icon, Button } from 'antd';
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
                <div className="search-adhaar-no">
                     <span>
                            <span className="search-span">Sorry!</span><br></br>
                            No profile found for the <br></br>Adhaar Number entered!
                    </span><br></br><br></br>
                    {/* <Button
                        onClick={this.createProfile}
                    >Create Profile</Button> */}
                    <Button
                            htmlType="button"
                            onClick={this.createProfile}
                        >
                        <Icon type="plus" />
                        ADD REVIEW
                    </Button>
                </div>}
            </Fragment>
        )
    }
}

export default NoProfile;