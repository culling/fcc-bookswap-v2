// References and useful pages
//https://stackoverflow.com/questions/41216948/this-setstate-is-not-a-function-when-trying-to-save-response-on-state

import React from 'react';
import {render} from 'react-dom';

//Navbars
import PrimaryNavbar    from './Navbars/PrimaryNavbar.jsx';

//Containers
import HomeContainer    from "./Containers/HomeContainer.jsx";
import ProfileContainer from "./Containers/ProfileContainer.jsx";
import LibraryContainer from "./Containers/LibraryContainer.jsx";
import NewBookContainer from "./Containers/NewBookContainer.jsx";
import TradesContainer  from "./Containers/TradesContainer.jsx";

//Modals
import NewUserModal     from "./Modals/NewUserModal.jsx";
import LoginUserModal   from "./Modals/LoginUserModal.jsx";


class ReactContainer extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            activeContainer: "#home-container",
            containerIds:[
                "#home-container",
                "#profile-container",
                "#myLibrary-container",
                "#allLibrary-container",
                "#trades-container"
            ]

        }
        //Binding to this for functions
        this._setActiveContainer = this._setActiveContainer.bind(this);
        this._getUser            = this._getUser.bind(this);

    };

    componentWillMount(){
        this._getUser.bind(this);
        this._getUser();
    }

    componentDidMount(){
        socket.on('new state', function(newState) {
            console.log("new state found");
            this._getUser();
            //this._displayToasts(newState);
        }.bind(this));
        //this._displayToasts();
    };

    componentWillUnmount(){
        socket.removeListener('new state');
    }


    _getUser(){
        //User
        jQuery.ajax({
            method: 'GET',
            url:"/api/user",
            success: (user)=>{
                this.setState({ user: user });
                console.log(user);
                this._displayToasts();                
            },
            contentType : "application/json",
            dataType: "JSON"
        });
    };


    _displayToasts(){
        console.log("display toasts called");
        var _this = this;
            if(
                _this.state.user && _this.state.user.username 
            ){

                if (_this.state.user.messages.length > 0){
                    console.log(_this.state.user);
                    _this.state.user.messages.map( (message) => {
                        
                        Materialize.toast(message, 4000,'' , function(){
                            _this._dismissMessage(message);
                        });
                        
                    });
                };

        };
    };


    _dismissMessage(message){
        console.log("Dismiss Message Clicked");
        var _this = this;
        var newStateDiff = {
            user: this.state.user,
            message: message
        }

        jQuery.ajax({
            type: "DELETE",
            url: "/api/users/messages",
            data: JSON.stringify( newStateDiff ),
            success: function(){
                console.log("Delete message sent to db");
                //_this._displayToasts();
                _this._getUser();
                //socket.emit('new state', {message: "deleted message"});
            },
            dataType: "text",
            contentType : "application/json"
        });

    }



    _setActiveContainer(newActiveContainerId){
        console.log("Active Container ID changed");
        //Show active container
        jQuery(newActiveContainerId)
            .attr("class", "div-visible");
        
        this.setState({activeContainer: newActiveContainerId});
        //console.log(this.state.activeContainer);
    }


    render(){
        return(
            <div>
                <header>
                <PrimaryNavbar user={this.state.user} setActiveContainer={  this._setActiveContainer.bind(this) } />
                    {this.state.user &&
                        <div>
                            <p className="subtle-debug">Current User {this.state.user.username}</p>
                        </div>
                    }
                </header>
                    <NewUserModal />
                    <NewBookContainer user={this.state.user}  />
                    <LoginUserModal getUser={ this._getUser.bind(this) } />
                    

                    {(this.state.activeContainer === "#home-container")&&
                    <HomeContainer          user={this.state.user} twitterUser={this.state.twitterUser} />
                    }
                    {(this.state.activeContainer === "#profile-container")&&
                    <ProfileContainer       user={this.state.user} getUser={ this._getUser.bind(this) } />
                    }
                    {(this.state.activeContainer === "#myLibrary-container")&&
                    <div id="myLibrary-container" >
                        <LibraryContainer     user={this.state.user} filterUser={this.state.user} />
                    </div>
                    }
                    {(this.state.activeContainer === "#allLibrary-container")&&
                    <div id="allLibrary-container" >
                        <LibraryContainer     user={this.state.user}  filterUser={{username:null, type:"all"}}/>
                    </div>
                    }
                    {(this.state.activeContainer === "#trades-container")&&
                    <div id="trades-container" >
                        <TradesContainer     user={this.state.user}  filterUser={{username:null, type:"all"}}/>
                    </div>
                    }


            </div>
        )
    }

}


render(<ReactContainer />, document.getElementById('react-container'));