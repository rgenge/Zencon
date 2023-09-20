import React, { useState, Component} from 'react';
import { Icon, Sidebar, Menu, Dropdown } from 'semantic-ui-react';
import {Link, Router} from '../routes';
import record from '../backend/record';
import web3 from '../backend/web3';
import { render } from 'react-dom';


const toggleSidebar = (sidebarVisible, setSidebarVisible) => {
  setSidebarVisible(!sidebarVisible);
};

export default class MenuHamburguer extends Component {

  onClickedClient = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    Router.pushRoute(`/record/${accounts[0]}`);
  }

  render() {
    const [sidebarVisible, setSidebarVisible] = useState(false);

    return (
      <>
        <Icon
          name="bars"
          size="big"
          style={{ cursor: 'pointer' }}
          onClick={() => toggleSidebar(sidebarVisible, setSidebarVisible)}
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
          {/* ... rest of your code ... */}
        </Sidebar>
      </>
    );
  }
}
