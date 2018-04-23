import React from 'react'
import marvelApi from 'marvel-api'
import api from './components/Api'
import _ from 'lodash'
import Card from './components/card/Index'
import Loader from './components/loader/Index'

// Get key from api.js
const marvel = marvelApi.createClient({
    publicKey: api.publicKey,
    privateKey: api.privateKey
});

export default class Characters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            characters: null,
            loaded: false
        };
    }

    componentWillMount() {
        // Get data befor component did mount
        marvel.characters.findAll(20, 100)
            .then((response) => {
                this.setState({
                    characters: response.data,
                    meta: response.meta.count
                })
            })
            .fail(console.error)
            .done();
    }

    componentDidUpdate() {
        // If component fully loaded
        if (!this.state.loaded) {
            this.setState({ loaded: true, uid: this.props.uid })
        }
    }

    charactersList() {  
        // Retrieve all characters data
        var characters = _.map(this.state.characters, (character) => {
            return (<Card
                key={character.id}
                id={character.id}
                picUrl={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                name={character.name}
                bio={character.description}
                comicsCount={character.comics.returned}
                firstComics={character.comics.items[0]}
                secondComics={character.comics.items[1]}
                thirdComics={character.comics.items[2]}
                caseOfFav={this.state.uid}
                />)
        })
        return characters;
    }

    render() {
        return (
            <div>
                {this.state.loaded ? (<h1>Marvel's heroes</h1>) : (null)}
                {this.state.loaded ? (
                    this.charactersList()
                ) : (
                    <Loader/>
                )}
            </div>
        );
    }

    _onLoad() {
        this.setState({ loaded: true })
    }
}