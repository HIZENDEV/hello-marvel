import React, { Component } from 'react';
import { Header, Footer } from './components/statics/Index'
import Characters from './Characters';
import Favorites from './Favorites';
import * as auth from './components/Auth'
import * as favorites from './components/Favorites'
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }

  componentWillMount() {
    // Authentificate the user and retrive his own data from firebase
    let currentComponent = this
    auth.anonymously()
    auth.authState(this, function(){
      favorites.databaseResponse(currentComponent, currentComponent.state.uid)
    })
  }

  componentDidUpdate() {
    // When loaded
    if (!this.state.loaded && this.state.uid) {
      this.setState({ loaded: true })
    }
  }

  render() {
    return (
      <div className="App">
      {/* Statics Header */}
        <Header />
        <div className="container">
          {this.state.loaded ? (
            <div className="wrapper">
              <Favorites uid={this.state.uid} dbRes={this.state.snapshot} />
              <Characters uid={this.state.uid} dbRes={this.state.snapshot} />
            </div>
          ) : (
            null
          )}
        </div>
        <Footer />
      </div>
    );
  }

  // FIX:
  _onLoad() {
    this.setState({ loaded: true })
  }

}
