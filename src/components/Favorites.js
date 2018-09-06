import React from 'react'
import marvelApi from 'marvel-api'
import api from './Api'
import * as firebase from 'firebase'
import Card from './card/Index'
import _ from 'lodash'

//Function file: refered to '../Favorites.js'

var favList = [];
// var response = [];
var req = []

const marvel = marvelApi.createClient({
    publicKey: api.publicKey,
    privateKey: api.privateKey
});

export async function databaseResponse(current, uid, callback) {
    var response = await resolveQueryData(current, uid)
}

function resolveQueryData(current, uid) {
    firebase.database().ref(`/users/${uid}/favorites`).once('value').then(function (snapshot) {
        var response = snapshot.val();
        !response ? current.setState({ snapshot: false }) : current.setState({ snapshot: response })
    });
}

export function databaseRequest(event, current, uid) {
    return firebase.database().ref(`users/${uid}/favorites`).once('value').then(function (snapshot) {
      console.log(event, current)
      event
        if (snapshot.numChildren() < 5) {
            firebase.database().ref(`users/${uid}/favorites`).push(event)
            return firebase.database().ref(`users/${uid}/favorites`).once('value').then(function (snapshot) {
                window.location.reload()
            })
        } else {
            alert('Nombre maximum de favoris ajouté')
        }
    })
}

export function objectTest(that, callback) {
    favList = (Object.values(that.props.dbRes))
    callback()
}

export function favApiRequest(that) {
    for (let index = 0; index < favList.length; index++) {
        marvel.characters.find(favList[index]).then((response) => {
            req.push(response.data[0])
            that.setState({
                favorites: req,
            })
        }).fail(console.error).done();
    }
}

export function favoritesList(that) {
    var favorites = _.map(that.state.favorites, (favorite) => {
        return (<Card
            key={`f${favorite.id}`}
            id={favorite.id}
            picUrl={`${favorite.thumbnail.path}.${favorite.thumbnail.extension}`}
            name={favorite.name}
            bio={favorite.description}
            comicsCount={favorite.comics.returned}
            firstComics={favorite.comics.items[0]}
            secondComics={favorite.comics.items[1]}
            thirdComics={favorite.comics.items[2]}
            caseOfFav={that.state.uid}
        />)
    })
    return favorites;
}

export function delAll(uid) {
    firebase.database().ref(`users/${uid}`).remove()
    window.location.reload()
}
