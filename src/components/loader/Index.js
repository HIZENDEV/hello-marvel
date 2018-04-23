import React, { Component } from 'react';
import './Style.css';

// Very simple circular loader component
class Loader extends Component {
    render() {
        return (
            <div className="loaderContainer">
                <div className="loader"></div>
            </div>
        );
    }
}

export default Loader;