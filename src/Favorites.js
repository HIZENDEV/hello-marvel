import React from 'react'
import Loader from './components/loader/Index'
import * as favorites from './components/Favorites'
import './App.css';

export default class Favorites extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        };
    }

    componentDidUpdate() {
        // Loading while waiting for API Response
        let that = this
        if (!this.state.loaded) {   
            this.setState({ loaded: true, uid: this.props.uid })
            favorites.objectTest(this, function() {
                favorites.favApiRequest(that)
            })
        }
    }

    render() {
        // Conditional Render: Check if app contain favorite chars.
        if (this.props.dbRes) {
            return (
                <div>
                    {this.state.loaded ? (<div className="align"><h1>Favorite's ones</h1><button className="btn" onClick={() => favorites.delAll(this.state.uid)} >Remove my favorites</button></div>) : <Loader />}
                    {this.state.loaded ? (
                        favorites.favoritesList(this)
                    ) : (
                        <Loader />
                    )}
                </div>
            );
        } else {
            return (null)
        }
    }

    _onLoad() {
        this.setState({ loaded: true })
    }
}