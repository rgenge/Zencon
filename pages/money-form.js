import React, { Component } from 'react';
import { Divider, Form, Input, Button, Segment, Message, Select } from 'semantic-ui-react';
import Layout from '../components/Layout';
import record from '../backend/record';
import web3 from '../backend/web3';

const planOptions = [
    { key: 'plan1', text: '24 x 0.1ETH', value: 'plan1' },
    { key: 'plan2', text: '24 x 0.2ETH', value: 'plan2' },
    { key: 'plan3', text: '24 x 0.4ETH', value: 'plan3' },
    { key: 'plan4', text: '100 ETH', value: 'plan4' },
]
const DueDayOptions = [
    { key: '5', text: '5', value: '5' },
    { key: '10', text: '10', value: '10' },
    { key: '15', text: '15', value: '15' },
]
const whyOptions = [
    { key: 'Save', text: 'Save Money', value: 'Save' },
    { key: 'Buy', text: 'Buy something', value: 'Buy' },
    { key: 'Invest', text: 'Invest in assets', value: 'Invest' },
]

class MoneyForm extends Component {
    state = {
        clientaddr: '',
        date: '',
        due: '',
        why: '',
        plan: '',
        description: '',
        errorMessage: ''
    };

    handleDue = (e, { value }) => this.setState({ due: value })
    handleWhy = (e, { value }) => this.setState({ why: value })
    handlePlan = (e, { value }) => this.setState({ plan: value })

    onSubmit = async event => {
        event.preventDefault();

        const { clientaddr, date, due, why, plan, description } = this.state;

        this.setState({loading: true, errorMessage: ''});

        try {
            const accounts = await web3.eth.getAccounts();

            await record.methods.setForm(
                clientaddr, date, due, why, plan, description
            ).send({ from: accounts[0] });

            alert("Money form filled successfully!");
        }
        catch (err) {
            this.setState({ errorMessage: err.message });
            alert("Error filling the form");
        }

        this.setState({ loading: false, clientaddr: '', date: '',due: '', why:'', plan:'', description: ''});
    }

    render() {
        return (
            <Layout>
                <Segment padded><h1>Financing Pool Form</h1></Segment>
                <Segment>
                <h2 style={{ marginTop: '20px', marginBottom: '30px'}}>Financing Request Information</h2>
                <Divider clearing />
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Group widths='equal'>
                        <Form.Field>
                            <label>Client Ethereum Address</label>
                            <Input
                                placeholder = 'Eg. 0xF6973b46412ff52c1BfDB783D29e5218620Be542'                
                                value= {this.state.clientddr}
                                onChange= {event => 
                                    this.setState({ clientaddr: event.target.value })}                           
                            />
                        </Form.Field>

                    </Form.Group>
                    <br/> 
                    <Form.Group widths='equal'>
                    <Form.Field>
                            <label>Init Contract Date</label>
                            <Input
                                placeholder = 'Eg. 10/10/2022'                        
                                value= {this.state.date}
                                onChange= {event => 
                                    this.setState({ date: event.target.value })}                           
                            />
                        </Form.Field>

                        <Form.Field
                                label='Payment Due Day' 
                                control={Select} 
                                options={DueDayOptions} 
                                onChange={this.handleDue}
                            />
                    </Form.Group> 
                    <Form.Group widths='equal'>
                    <Form.Field 
                            label='Why are you using this platform?' 
                            control={Select} 
                            options={whyOptions} 
                            onChange={this.handleWhy}
                        />             
                        <Form.Field 
                            label='Select your plan:' 
                            control={Select} 
                            options={planOptions} 
                            onChange={this.handlePlan}
                        />
                    </Form.Group> 
                    <Form.TextArea
                                label='Notes'
                                placeholder = 'Eg. Anything else you want to add to your contract'
                                value= {this.state.description}
                                onChange= {event => 
                                    this.setState({ description: event.target.value })}  
                    />      

                    <br/>
                    <Message error header="Oops!" content={this.state.errorMessage}/>
                    <Button primary loading={this.state.loading}>Create</Button>
                    
                </Form>
                </Segment>
            </Layout>
        );
    }
}
export default MoneyForm;