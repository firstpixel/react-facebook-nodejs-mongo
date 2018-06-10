import React, { Component } from 'react';
import './CustomNavBar.css';
import {Link} from 'react-router-dom';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

export default class CustomNavBar extends Component {

    renderLoggedMenu () {
        if(this.props.isLogged) {
            return (<NavItem eventKey={1} componentClass={Link} href="/mypage" to="/mypage">My Page</NavItem>
        )
        }
        return;
    }

    render() {
        return (
        <Navbar default collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                    <Link to="/">Firstpixel</Link>
                </Navbar.Brand>
                <Navbar.Toggle/>
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav pullRight>
                    <NavItem eventKey={2} componentClass={Link} href="/about" to="/about">About</NavItem>
                    {this.renderLoggedMenu()}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        )
    }
}