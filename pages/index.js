import { createMedia } from '@artsy/fresnel'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from '../routes';
import { Router } from '../routes';
import web3 from '../backend/web3';
import Layout from '../components/Layout'
import { useRouter } from "next/router";
import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Segment,
  Sidebar
} from 'semantic-ui-react'

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
})

const HomepageHeading = ({ mobile }) => (
  <Container text>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"></link>
    <Header
      as='h1'
      content='Is it hard for you to save money? Invest monthly with us and get save money with us and you may even get your money back
      before paying all your installments!'
      inverted
      style={{
        fontSize: mobile ? '1em' : '2em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '3em',
        fontFamily:'Georgia',
      }}
    />

    <Button primary size='huge' inverted>
      <Link route='register-client'>
        <a className='item'>Get Started</a>
      </Link>
      <Icon name='right arrow' />
    </Button>
  </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  onClickedClient = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    Router.pushRoute(`/record/${accounts[0]}`);
  }

  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
      <Layout>
       <Media greaterThan='mobile'>
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 700, padding: '1em 0em' }}
            vertical
          >   
            <HomepageHeading />
          </Segment>
        {children}
       </Media>
      </Layout>
    )
  }
}
const CheckUsOutButton = () => {
  const router = useRouter();

  return (
    <Button onClick={() => router.push("/about-us")}>
      Check us out!
    </Button>
  );
};
DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
  state = {}

  handleSidebarHide = () => this.setState({ sidebarOpened: false })
  handleToggle = () => this.setState({ sidebarOpened: true })
  onClickedClient = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    Router.pushRoute(`/record/${accounts[0]}`);
  }
  
  onClickedClient = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    Router.pushRoute(`/client/${accounts[0]}`);
  }
  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state
    return (
      <Media as={Sidebar.Pushable} at='mobile'>
            <Segment
              inverted
              textAlign='center'
              style={{ minHeight: 350, padding: '1em 0em' }}
              vertical
            >
              <HomepageHeading mobile />
            </Segment>
            {children}
      </Media>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  <MediaContextProvider>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </MediaContextProvider>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const HomepageLayout = () => (
  <ResponsiveContainer>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              We Help people that have trouble saving money to save money! But how ? 
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              You will select between our plans , where you will pay a fee monthly between 24 and 48 months, and after that time ends you 
              will get your money back, but the best part is that you may be able to draw your money before the 48 months, every month a number 
              of users will be selected using an AI system and get your money. 
            </p>
          </Grid.Column>
          <Grid.Column floated='right' width={6}>
            <Image bordered rounded size='large' src='https://thumbs.dreamstime.com/b/cheerful-big-smile-happy-executive-office-workplace-isolate-over-white-background-129817224.jpg' />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column route='register-client' textAlign='center'>
            <CheckUsOutButton/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>


    <Segment inverted vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='About' />
              <List link inverted>
                <List.Item as='a'>Sitemap</List.Item>
                <List.Item as='a'>Contact Us</List.Item>
                <List.Item as='a'>Creator Info</List.Item>
                <List.Item as='a'>Site Details</List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>
)

export default HomepageLayout