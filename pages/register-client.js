import React, {Component} from 'react';
import web3 from '../backend/web3';
import Layout from '../components/Layout'
import record from '../backend/record';
import {Form, Input, Button, Segment,Message} from 'semantic-ui-react';
class RegisterClient extends Component {

    state= {
        name: '',
        phone: '',
        gender: '',
        location: '',
        taxnumber: '',
    }
    
    handleGender = (e,{ value}) => this.setState({gender: value});
    
    onSubmit = async event => {
        event.preventDefault();
        const {name, phone, gender, location ,taxnumber} = this.state;
        this.setState({loading :true, errorMessage: ''});
        try {
            const accounts = await web3.eth.getAccounts();
            await record.methods.setClient(
            name,phone,gender, location , taxnumber).send({from:accounts[0]});
            alert("Client account created");
            }
        catch (err){
            this.setState({errorMessage:err.message});
            alert ("Client already exists or cannot be created");
            }    
        this.setState({loading: false, name: '' , phone: '', gender: '', location: '' , taxnumber: ''});
    }
    render(){
        return (
            <Layout>
                <Segment padded><h1> Register Client</h1></Segment>
                <Segment>
                    <h2 style={{marginTop:'10px', marginBottom: '40px'}}>Client Info</h2>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Group widths='equal'>
                        <Form.Field>
                            <label>Name</label>
                            <Input 
                             placeholder = 'eg. Atila'
                             value= {this.state.name}
                             onChange={event => 
                                this.setState({name: event.target.value})}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Phone</label>
                            <Input
                            placeholder='eg. 99992-2112'
                            value ={this.state.phone}
                            onChange={event=>
                                this.setState({phone: event.target.value})}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Gender</label>
                            <Input
                            placeholder='eg. Male'
                            value ={this.state.gender}
                            onChange={event=>
                                this.setState({gender: event.target.value})}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Location</label>
                            <Input
                            placeholder='eg. Brazil'
                            value ={this.state.location}
                            onChange={event=>
                                this.setState({location: event.target.value})}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Tax Number</label>
                            <Input
                            placeholder='eg. 999999999'
                            value ={this.state.taxnumber}
                            onChange={event=>
                                this.setState({taxnumber: event.target.value})}/>
                        </Form.Field>
                    </Form.Group>
                    <br/>
                    <Message error header="Oops!" content={this.state.errorMessage}/>
                    <Button primary loading={this.state.loading}>Create</Button>
                </Form>
                </Segment>
            </Layout>

        )
    }

}   
export default RegisterClient;
