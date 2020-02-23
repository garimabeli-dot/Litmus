import React, { Component } from 'react'; //Create,Delete,show invites
import { Button, Table } from 'react-bootstrap';

class Invite extends Component {
    constructor(props){
        super(props);

        this.state = {
            email : 'garimabeli92@gmail.com',
            inviteListDetails : []
        }
    }
    createInvite = () => {
        var url = "https://zlitmus.herokuapp.com/invite/create?email="+this.state.email;
        this.fetchInviteApis(url,'POST');
    }
    deleteInvite = () => {
        var url = "https://zlitmus.herokuapp.com/invite/delete?email="+this.state.email;
        this.fetchInviteApis(url,'POST');
        
    }
    listInvite = () => {
        var url = "https://zlitmus.herokuapp.com/invite/list";
        var inviteListDetails = this.fetchInviteApis(url,'GET'); 
        this.setState({
            inviteListDetails : inviteListDetails
        })
    }
    fetchInviteApis = (url, method, header='') => { //POST
        fetch(url, {
            method: method,
            headers: header
        })
            .then(response => response.json())
            .then((responseData) => {
                return responseData;
            })
            .catch(error => this.setState({ error }));
    }
    render() {
        return (
            <div>
                <Button onClick={this.createInvite}>Create Invite</Button>
                <Button onClick={this.deleteInvite}>Delete Invite</Button>
                <Button onClick={this.listInvite}>List Invite</Button>
                 {/* { this.state.inviteListDetails.length > 0 ?  */}
                <div>
                <Table>               
                   { this.state.inviteListDetails.map(function(invites,index){
                       return (<tr>
                           <td>{invites.name}</td>
                       </tr>)
                    }.bind(this))}
                    </Table>
            </div>
               // : "No Invites Found"}                
            </div>
        )
    }
}

export default Invite;
