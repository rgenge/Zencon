import React, { Component } from 'react';
import { Menu, Icon, Dropdown } from 'semantic-ui-react';
import record from '../backend/record';
import web3 from '../backend/web3';
import { Link } from '../routes';
import { Router } from '../routes';


export default class MenuBar extends Component {

  onClickedClient = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    Router.pushRoute(`/record/${accounts[0]}`);
  }

  render() {
    return (
      <Menu size='huge' color='grey' inverted>
          <Link route='/'>
              <a className='item'>Home</a>
          </Link>

          <Menu.Menu position='right'>
            <Link route='/dashboard'>
                <a className='item'>Dashboard</a>
            </Link>

            <Link route='/list'>
                <a className='item'>Records List</a>
            </Link>

            <Dropdown item text='Client Area'>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link route='/'>
                    <a style={{color:'black'}} onClick={this.onClickedClient}>View Profile</a>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link route='/money-form'>
                    <a style={{color:'black'}}>Money Form</a>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link route='/edit-money'>
                    <a style={{color:'black'}}>Pay Installment</a>
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown item text='Register'>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link route='/register-client'>
                    <a style={{color:'black'}}>Client</a>
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
      </Menu>  
    );
  }
}