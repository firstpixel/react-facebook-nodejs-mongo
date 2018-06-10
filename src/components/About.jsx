import React, { Component } from 'react'
import {Grid} from 'react-bootstrap'
import './About.css'

export default class About extends Component {
    render () {
        return (
            <Grid>
                <h1>About</h1>

                <p>This is a starting project for facebook login with Reactjs, just a project I did to learn reactjs.</p>
                <p>It uses reactjs, react-bootstrap, react-facebook-login, history, react-router-dom</p>
                <p>To run just clone this repo. Create a facebook app on <a href='https://developers.facebook.com/apps/'>https://developers.facebook.com/apps/</a>, add the facebook appId to the App.jsx run "yarn install && yarn start" on the main folder, and same on the server folder, and make</p>
            </Grid>
        )
    }
}