import React, { Component } from 'react';
import './Style.css';
import Modal from 'react-modal';
import MaterialIcon from 'material-icons-react';
import * as favorites from '../Favorites'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        maxWidth: '25em',
        border: 'none',
        transform: 'translate(-50%, -50%)',
        boxShadow: '0px 0px 29px 4px rgba(0,0,0,0.16)'
    }
};

Modal.setAppElement('#root')

class Card extends Component {
    constructor() {
        super();

        this.state = {
            modalIsOpen: false,
            favColor: '#af3128',
            originalColor: '#777'
        };
        this.setFav = this.setFav.bind(this)
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        // this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    handleClick(event) {
        alert(event.target.parentElement.id)
    }

    setFav(event) {
        let that = this
        const uid = this.props.caseOfFav
        var charId = event.target.parentElement.id
        favorites.databaseRequest(charId, that, uid)
    }

    comicsControl() {
        if (this.props.comicsCount < 1 || !this.props.comicsCount) {
            return (
                <div className='inline'><span>It would seem this character never appeared in a comic strip</span></div>
            )
        } else {
            return (
                <div>
                    <div className='inline' >
                        <h4 className='subtitle'>Number of comics:</h4><span>{this.props.comicsCount}</span>
                    </div>
                    <h4 className='subtitle'>3 first comics:</h4>
                    <ul className='comicsList'>
                        <li className='comics'>{this.props.firstComics ? this.props.firstComics.name : null}</li>
                        <li className='comics'>{this.props.secondComics ? this.props.secondComics.name : null}</li>
                        <li className='comics'>{this.props.thirdComics ? this.props.thirdComics.name : null}</li>
                    </ul>
                </div>     
            )
        }
    }

    render() {

        return (
            <div className="card">
                <div className="card-content">
                    <div className="front">
                        <div className="content">
                            <img className="pictureProfile" src={this.props.picUrl} alt='logo' />
                            <h3 className="characterName">{this.props.name}</h3>
                        </div>
                    </div>
                    <div className="back">
                        <div className="center"> <button onClick={this.openModal} className="button">More Information</button> </div>
                    </div>
                </div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <div className='inline'>
                        <img className="pictureProfile" src={this.props.picUrl} alt='logo' />
                        <h3 className="characterName">{this.props.name}</h3>
                        <div id={this.props.id} onClick={this.setFav} >
                            <MaterialIcon className="cursorClicker" icon="favorite" color={this.state.favColor} />
                        </div>
                    </div>
                    <div className='divider'>
                        <h4 className='subtitle'>Description:</h4>
                        <div>{ this.props.bio ? this.props.bio : 'This character has no description'}</div>
                    </div>
                    {this.comicsControl()}
                </Modal>
            </div>
        );
    }
}

export default Card;