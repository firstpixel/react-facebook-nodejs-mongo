import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import {Route,withRouter} from 'react-router-dom';

import Home from './components/Home';
import About from './components/About';
import MyPage from './components/MyPage'; //logged page
import CustomNavBar from './components/CustomNavBar';
import FacebookLogin from 'react-facebook-login';
import Config from './Config';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
      fbId: '',
      facebookData: {}
    }
    this.loginHandler = this.loginHandler.bind(this);
    this.logoutHandler = this.logoutHandler.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);
    this.logoutFacebookHandler = this.logoutFacebookHandler.bind(this);
  }

  checkLoginAfterRefresh = (response) => {
    if (response.status === 'connected') {
      this.loginHandler(response);
    } else {
      this.logoutHandler(response);
    }
  };

  logoutHandler = (response) => {
      console.log("Logout" + JSON.stringify(response));
      this.setState({
        isLogged: false,
        facebookData: {},
        fbId: ''
      })
      this.props.history.push('/', { isLogged: false })
  }
  loginHandler = (response) => {
      console.log("Login " + JSON.stringify(response));
      this.setState({
        isLogged: true,
        facebookData:response,
        fbId: response.fbid
      })
      this.props.history.push('/mypage', { isLogged: true })
  };
  responseFacebook = (response) => { 
    if(response.accessToken) {
      this.loginHandler(response);
    } else {
      this.logoutHandler(response);
    }
  }
  logoutFacebookHandler(e) {
    window.FB.logout(this.logoutHandler());
  }

  renderLoginButton () {
    if (!this.state.isLogged) {
      return (<FacebookLogin
      appId={Config.facebookAppId} 
      autoLoad={true} 
      fields={Config.facebookAppFields} 
      scope={Config.facebookAppPermissionFields} 
      callback={this.responseFacebook} 
      onFailure={this.responseFacebook} 
      />);
    }else{
      return (
        <span >
        <button type="button" onClick={this.logoutFacebookHandler}>Logout</button>
       </span> 
      );
    }
  }
  rederLoggedPages () {
    if(this.state.isLogged) {
      return (
        <div> 
      <Route path="/about" component={About} />
      <Route path="/mypage" render={()=><MyPage facebookData={this.state.facebookData} />} />
        </div>
      );
    } else {
      return ;
    }
  }

  renderCustomNavBar () {
    return (
      <CustomNavBar isLogged={this.state.isLogged}/>
    )
  }

  render() {
    return (
      <div className="App">
          <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Firstpixel.com</h1>
        </header>
        {this.renderCustomNavBar()}
        <div>
          {this.renderLoginButton()}
          <Route exact path="/" component={Home} />
          {this.rederLoggedPages()}
          </div>
      </div>
    );
  }
}

export default withRouter(App);