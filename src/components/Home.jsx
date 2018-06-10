import React, { Component } from 'react'
import {Grid} from 'react-bootstrap'
import './Home.css'


export default class Home extends Component {
    

    render () {
       

        return (
            <Grid>
                <h1>This is the Home page.</h1>
                <h4>This is a starting project for facebook login with Reactjs, Bootstrap, mongodb and express, just a project I did to learn reactjs.</h4>
                <p>Images from https://www.freeimages.com/</p>
            </Grid>
        )
    }
}