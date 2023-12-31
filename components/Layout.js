import React from 'react';
import { Image, Container, Header, Icon, Segment } from 'semantic-ui-react';
import Head from 'next/head';
import MenuHamburguer from './MenuHamburguer'; // Importando o componente MenuHamburguer

export default props => {
    return (
        <>
            <Head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"></link>               
            </Head>

            <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 340}}
            >
            <MenuBar/>
                <div style={{marginLeft:'850px'}}><Image src="https://clipart-library.com/images_k/raining-money-gif-transparent/raining-money-gif-transparent-15.png"
               alt="Money" width="150px" aspect-ratio='auto'/></div>
                <Header as='h2' color='yellow' style={{ fontSize:'5em', fontWeight:'normal'}} content='LinkUp Chain'/>
                <Header as='h3' style={{ fontSize:'1.5em', fontWeight:'normal'}} content='Platform where you pay monthly fee and can be selected to receive the total amount anytime during the payments'/>

            </Segment>
            
            <Container>
                {props.children}
            </Container>
        </>
    );
};