import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Row, Col, Input, Button, Form, Icon } from 'antd';
import { postLoginDetails } from '../../api/Login';
import '../../styles/account.css';

// const data = [
//     {
//         key: '1',
//         name: 'Jim Joe',
//         email: "joe@gmail.com",
//         usertype: 'Admin',
//         date: '21/11/2001',
//     },
//     {
//         key: '2',
//         name: 'Jim Green',
//         email: "jim@gmail.com",
//         usertype: 'User',
//         date: '21/12/1992',
//     },
//     {
//         key: '3',
//         name: 'Jim Brown',
//         email: "brown@gmail.com",
//         usertype: 'User',
//         date: '21/12/2010',
//     },
// ];
class ManageUsers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userData: [],
            addUser: false,
            email: ''
        }
    }
    componentDidMount() {
        this.getUserDetails();
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }    
    getUserDetails() {
        var url = "https://zlitmus.herokuapp.com/invite/list";
        var method = 'GET';
        Promise.all([
            postLoginDetails(url, method)
        ]).then(responses => responses.forEach(
            response => {
                //alert(response.message);
                this.setState({
                    userData: response.invites
                })
            }
        ))
            .catch(err => alert(err));
    }
    deleteUser = (email) => {
        var url = "https://zlitmus.herokuapp.com/invite/delete?email=" + email;
        var method = 'POST';
        Promise.all([
            postLoginDetails(url, method)
        ]).then(responses => responses.forEach(
            response => {
                alert(response.message);
                this.getUserDetails();
            }
        ))
            .catch(err => alert(err));
    }
    addUser = () => {
        this.setState({
            addUser: true
        })
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.saveInvite();
            }
        });
    };
    saveInvite = () => {
        var url = "https://zlitmus.herokuapp.com/invite/create?email=" + this.state.email;
        var method = 'POST';
        Promise.all([
            postLoginDetails(url, method)
        ]).then(responses => responses.forEach(
            response => {
                alert(response.message);
                this.setState({
                    addUser: false
                },() => {
                    this.getUserDetails();
                })                
            }
        ))
            .catch(err => alert(err));
    }
    render() {
        const { getFieldDecorator } = this.props.form;

        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        return (
            <div>
                <Table striped className="manage-user-table">
                    <thead>
                        <tr>
                            <th>EMAIL</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.userData.map(function (item, index) {
                                return (
                                    <tr key={index}>
                                        <td key={index + "" + item.id}>{item.email}</td>
                                        <td key={item.id}>
                                            <Button
                                                type="link"
                                                onClick={() => this.deleteUser(item.email)}
                                                key={item.id}>
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            }.bind(this))
                        }
                    </tbody>
                </Table>
                <Row>
                    <Col span={8} offset={16}>
                        <Button
                            htmlType="button"
                            type="outline-primary"
                            onClick={this.addUser}
                        >
                            <Icon type="plus" />
                            Add User
                        </Button>
                    </Col>
                </Row>
                {this.state.addUser ?
                    <Form {...tailFormItemLayout} onSubmit={this.handleSubmit}>
                        <Form.Item label="">
                            {getFieldDecorator('email', {
                                rules: [
                                    {
                                        type: 'email',
                                        message: 'The input is not valid E-mail!',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your E-mail!',
                                    },
                                ],
                            })(<Input
                                onChange={this.handleChange}
                                name="email"
                                placeholder="Enter Email"
                            />)} &nbsp; &nbsp;
                        <Button
                                htmlType="submit">
                                Save
                        </Button>
                        </Form.Item>
                    </Form>
                    : ''}
            </div>
        )
    }
}

const ManageUsersDetails = Form.create({ name: 'invite' })(ManageUsers);
export default ManageUsersDetails;
