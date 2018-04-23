import React, { Component } from 'react';
import './Style.css';

class Header extends Component {
    render() {
        return (
            <div className="header">
                <img className="brand" alt="logo" src="./logo.png" />
                <h4 className="user">@Hizendev</h4>
            </div>
        );
    }
}

class Footer extends Component {
    render() {
        return (
            <div className="footer">
            </div>
        );
    }
}

export { Header, Footer };