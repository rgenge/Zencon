import React, { useState } from 'react';
import { Icon, Sidebar, Menu, Dropdown } from 'semantic-ui-react';
import { Link, Router } from '../routes';
import record from '../backend/record';
import web3 from '../backend/web3';

const MenuHamburguer = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const onClickedClient = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    Router.pushRoute(`/record/${accounts[0]}`);
  };

  return (
    <>
      <Icon
        name="bars"
        size="big"
        style={{ cursor: 'pointer' }}
        onClick={toggleSidebar}
      />
      <Sidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
        inverted
        vertical
        visible={sidebarVisible}
        width="thin"
      >
        <Menu.Item as='a' href="/">Home</Menu.Item>
        <Menu.Item as='a' href="/list">Records List</Menu.Item>
        <Dropdown item text='Client Area'>
          <Dropdown.Menu>
            <Dropdown.Item>
              <a style={{color:'black'}} onClick={onClickedClient}>View Profile</a>
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
      </Sidebar>
    </>
  );
};

export default MenuHamburguer;
