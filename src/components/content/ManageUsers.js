import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';
import { postLoginDetails } from '../../api/Login';
const data = [
    {
        key: '1',
        name: 'Jim Joe',
        email: "joe@gmail.com",
        usertype: 'Admin',
        date: '21/11/2001',
    },
    {
        key: '2',
        name: 'Jim Green',
        email: "jim@gmail.com",
        usertype: 'User',
        date: '21/12/1992',
    },
    {
        key: '3',
        name: 'Jim Brown',
        email: "brown@gmail.com",
        usertype: 'User',
        date: '21/12/2010',
    },
];
class ManageUsers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userData : []
        }
    }
    componentDidMount(){
        //this.getUserDetails();
    }
    getUserDetails(){
            var url = "";
            var method='GET';
            Promise.all([
                postLoginDetails(url,method)
            ]).then(responses => responses.forEach(
                    response => alert(response.message)
                ))
                .catch(err => alert(err));
    }
    editUser = () => {

    }
    render() {
        return (
            <div>
                <Table striped className="manage-user-table">
                    <thead>
                        <tr>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>USER TYPE</th>
                            <th>DATE ADDED</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map(function (item, index) {
                                return (
                                    <tr>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.usertype}</td>
                                        <td>{item.date}</td>
                                        <td>
                                            <Button 
                                                variant="link" 
                                                onClick={this.editUser}
                                                id={item.key}>
                                                    Edit
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            }.bind(this))
                        }
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default ManageUsers;