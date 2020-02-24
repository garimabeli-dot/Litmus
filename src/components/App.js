import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import SearchProfile from './content/SearchProfile';
import HomePage from './HomePage';
import AddReview from './content/AddReview';
import MyAccount from './content/MyAccount';
import '../styles/index.css';
import 'antd/dist/antd.css';
import { Layout, Menu, Icon, Button } from 'antd';
import Login from './login';

const { Header, Sider, Content } = Layout;

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userValid: false,
            collapsed: false,
            showAddReview: false
        }
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    signIn = (e) => {
        this.setState({
            userValid: true
        })
    }
    render() {
        return (
            <Router>
                <div className="App">
                    <Layout>
                        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                            <div className="litmus">
                                LITMUS
                            </div>
                            <div className="logo" >
                                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                                    {/* <Menu.Item key="1">

                                </Menu.Item> */}
                                    <Menu.Item key="1">
                                        <Icon type="search" />
                                        <span>
                                            <Nav.Link eventKey="1" href="/searchprofile" className="list-items">
                                                Search Profile
                                    </Nav.Link>
                                        </span>
                                    </Menu.Item>
                                    <Menu.Item key="2">
                                        <Icon type="plus-circle" />
                                        <span>
                                            <Nav.Link eventKey="2" href="/addreview" className="list-items">
                                                Add Review
                                    </Nav.Link>
                                        </span>
                                    </Menu.Item>
                                    <Menu.Item key="3">
                                        <Icon type="profile" />
                                        <span>
                                            <Nav.Link eventKey="3" href="/myaccount" className="list-items">
                                                My Account
                                            </Nav.Link>
                                        </span>
                                    </Menu.Item>
                                </Menu>
                            </div>
                        </Sider>
                        <Layout>
                            <Header style={{ background: '#fff', padding: 0 }}>
                                <Icon
                                    className="trigger"
                                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                    onClick={this.toggle}
                                />
                                <div className="side-icon">
                                    <Icon type="home" />
                                    <Icon 
                                        type="login"
                                        onClick={this.signIn}
                                    />
                                    <Icon type="logout" />
                                </div>
                            </Header>
                            <Content className="content">
                                <Switch>
                                <Route exact path="/">
                                        <SearchProfile/>
                                    </Route>
                                    <Route path="/searchprofile">
                                        <SearchProfile/>
                                    </Route>
                                    <Route path="/addreview">
                                        <AddReview />
                                    </Route>
                                    <Route path="/myaccount">
                                        <MyAccount />
                                    </Route>
                                </Switch>
                            </Content>
                        </Layout>
                    </Layout>
                    {this.state.userValid ?
                        <Login
                            showSignIn={this.state.userValid}
                            showSignUp={false}
                        />
                        : ''}
                </div>
            </Router>
        )
    }
}

export default App;
