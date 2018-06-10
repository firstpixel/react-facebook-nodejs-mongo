import React, { Component } from 'react'
import { Grid, Col, Row } from 'react-bootstrap'
import Config from '../Config';
import './MyPage.css'

const InitialState = {
    error: null,
    isLoaded: false,
    response: null,

  };
export default class MyPage extends Component {
    constructor(props) {
        super(props);
        if (props.facebookData) {
            this.username = props.facebookData.name;
            this.fbid = props.facebookData.id;
            this.access_token = props.facebookData.accessToken;
        } else {
            this.username = 'Ops, something went wrong!';
        }
        this.state = sessionStorage.getItem("appState") ? JSON.parse(sessionStorage.getItem("appState")) : InitialState;
    }

    
    componentDidMount() {
        
        if(!this.state.isLoaded) {
        fetch( Config.nodeJSServer + "/api/users/facebook?access_token=" + this.access_token, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
          
            //make sure to serialize your JSON body
            body: JSON.stringify({
                user: { "fbid": this.fbid }
            })
          })
          .then( (response) => { 
            sessionStorage.setItem('x-access-token', response.headers.get('x-access-token'));       
            return response.json();
          })
          .then( (response) => { 
            console.log("Response : " + JSON.stringify(response));
              if (!response.picture.data.url) {
                response.picture.data.url = 'https://commons.wikimedia.org/wiki/File:Default_profile_picture_(male)_on_Facebook.jpg';
              }
              this.setState({
                isLoaded        : true,
                response        : response             
              });
              sessionStorage.setItem('appState', JSON.stringify(this.state));
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
        }
    }
    
    onClickUser(){

    }

    render() {
        const { error, isLoaded, response  } = this.state;
        const { onClickUser  } = this;
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
          return (
            <Grid>
            <Row className="show-grid">
              <Col xs={12} md={8}>
                <div className="flex-container" onClick={onClickUser}>
                    <h1>Welcome</h1>
                    <img className="flex-column-auto" src={response.picture.data.url} alt='Profile'/>
                    <div className="flex-column-grow">
                      <h3>{this.username}</h3>
                      <div>{response.name}</div> 
                    </div>
                  </div> 
            </Col>
            </Row>
            </Grid>
          );
        }
    }


    
}