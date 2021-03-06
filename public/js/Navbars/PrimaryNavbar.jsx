// /login/twitter

import React from 'react';
import {render} from 'react-dom';

class PrimaryNavbar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            activeContainerId: "initial"
        }
    }

    componentWillMount(){
        jQuery( document ).ready(function(){
            jQuery(".button-collapse").sideNav();
        });
        //this._showContainer("#home-container");
    }

    _showContainer(newActiveContainerId){
            this.props.setActiveContainer(newActiveContainerId);
    }

    _homeClicked(){
        console.log("Home Clicked");
        this._showContainer("#home-container");
        //this._showContainer("#allBoard-container");
    }


    _profileClicked(){
        console.log("profile Clicked");
        this._showContainer("#profile-container");
    }

    _loginClicked(){
        console.log("login Clicked");
        jQuery('#login-user-modal').modal('open');
        //this._hideAllContainers();
    };


    _newBookClicked(){
        console.log("new book clicked");
        jQuery("#new-book-modal-step1").modal("open");
    }

    _signupClicked(){
        console.log("login Clicked");
        jQuery('#new-user-modal').modal('open');
        //this._hideAllContainers();
    };


    _logoutClicked(){
        console.log("logout Clicked");
    };

    _myLibraryClicked(){
        console.log("My Library Clicked");
        this._showContainer("#myLibrary-container");
    };

    _allLibraryClicked(){
        console.log("Whole Library Clicked");
        this._showContainer("#allLibrary-container");
    };

    _tradesClicked(){
        console.log("Trades Clicked");
        this._showContainer("#trades-container");
    }

    render(){
        return(
            <div>
                <nav>
                    <div className="nav-wrapper" >
                        <a href="#" data-activates="mobile-menu" className="button-collapse"><i className="material-icons">menu</i></a>
                        <ul className="right hide-on-med-and-down">
                            <li  onClick={ this._homeClicked.bind(this)}><a >Home</a></li>
                            {(this.props.user && this.props.user.username) && <li  onClick={ this._profileClicked.bind(this)}><a >Profile </a></li>}
                            {(this.props.user && this.props.user.username) && <li  onClick={ this._newBookClicked.bind(this)}><a >New Book</a></li> }
                            
                            {(this.props.user && this.props.user.username) && <li  onClick={ this._myLibraryClicked.bind(this)}><a >My Library</a></li> }

                            <li  onClick={ this._allLibraryClicked.bind(this)}><a >Library</a></li>
                            {(this.props.user && this.props.user.username) && <li  onClick={ this._tradesClicked.bind(this)}><a >Trades</a></li> }

                            {( (this.props.user)&& (this.props.user.type) && (this.props.user.type!= "user" ) ) && <li  onClick={ this._loginClicked.bind(this)}><a href="#" >Log In</a></li>}
                            {( (this.props.user)&& (this.props.user.type) && (this.props.user.type!= "user" ) ) && <li  onClick={ this._signupClicked.bind(this)}><a href="#">Sign Up</a></li>}

                            {(this.props.user && this.props.user.username) && <li  onClick={ this._logoutClicked.bind(this)}><a href="/logout">Log Out</a></li>}

                        </ul>
                        <ul className="side-nav" id="mobile-menu">
                            <li  onClick={ this._homeClicked.bind(this)}><a >HOME</a></li>
                            {(this.props.user && this.props.user.username) && <li  onClick={ this._profileClicked.bind(this)}><a >PROFILE</a></li>}
                            {(this.props.user && this.props.user.username) && <li  onClick={ this._newBookClicked.bind(this)}><a >NEW BOOK</a></li> }
                            
                            {(this.props.user && this.props.user.username) && <li  onClick={ this._myLibraryClicked.bind(this)}><a >MY LIBRARY</a></li> }
                            <li  onClick={ this._allLibraryClicked.bind(this)}><a >LIBRARY</a></li>
                            {(this.props.user && this.props.user.username) && <li  onClick={ this._tradesClicked.bind(this)}><a >TRADES</a></li> }

                            {( (this.props.user)&& (this.props.user.type) && (this.props.user.type!= "user" ) ) && <li  onClick={ this._loginClicked.bind(this)}><a href="#" >LOG IN</a></li>}
                            {( (this.props.user)&& (this.props.user.type) && (this.props.user.type!= "user" ) ) && <li  onClick={ this._signupClicked.bind(this)}><a href="#">SIGN UP</a></li>}

                            {(this.props.user && this.props.user.username) && <li  onClick={ this._logoutClicked.bind(this)}><a href="/logout">LOG OUT</a></li>}


                        </ul>
                    </div>
                </nav>

            </div>
        )
    }
}

export default PrimaryNavbar;

