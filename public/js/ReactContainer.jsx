// References and useful pages
//https://stackoverflow.com/questions/41216948/this-setstate-is-not-a-function-when-trying-to-save-response-on-state

import React from 'react';
import {render} from 'react-dom';

//Navbars
import PrimaryNavbar    from './Navbars/PrimaryNavbar.jsx';

//Containers
import HomeContainer    from "./Containers/HomeContainer.jsx";
//import ProfileContainer from "./Containers/ProfileContainer.jsx";
//import BoardContainer   from "./Containers/BoardContainer.jsx";

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
                "#myBoard-container",
                "#allBoard-container"
            ]

        }
        //Binding to this for functions
        this._setActiveContainer = this._setActiveContainer.bind(this);
    };

    componentWillMount(){
        this._getUser.bind(this);
        this._getUser();
        //this._getTwitterUser.bind(this);
        //this._getTwitterUser();
    }

    componentDidMount(){
        socket.on('new state', function(newState) {
            console.log("new state found");
            //this.setState(newState);
        }.bind(this));
    }

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
            },
            contentType : "application/json",
            dataType: "JSON"
        });
    };
    /*
    _getTwitterUser(){
        //Twitter User
        jQuery.ajax({
            method: 'GET',
            url:"/api/twitter/user",
            success: (twitterUser)=>{
                this.setState({ twitterUser: twitterUser._json });
            },
            contentType : "application/json",
            dataType: "JSON"
        });
    };
    */
    _setActiveContainer(newActiveContainerId){
        console.log("Active Container ID changed");
        //console.log(newActiveContainerId);

        /*
        this.state.containerIds.filter(containerId =>{
                return containerId !== newActiveContainerId
            }).map(containerId =>{
                jQuery(containerId)
                    .attr("class", "div-hidden");
            });
        */
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
                <b>My Bookswap</b>
                <PrimaryNavbar user={this.state.user} setActiveContainer={  this._setActiveContainer.bind(this) } />
                    {this.state.user &&
                        <div>
                            <b>Current User {this.state.user.displayName}</b>
                        </div>
                    }
                </header>
                    <NewUserModal />
                    <LoginUserModal />

                    {(this.state.activeContainer === "#home-container")&&
                    <HomeContainer          user={this.state.user} twitterUser={this.state.twitterUser} />
                    }
                    {(this.state.activeContainer === "#profile-container")&&
                    <ProfileContainer       user={this.state.user} twitterUser={this.state.twitterUser} />
                    }
                    {/*(this.state.activeContainer === "#myBoard-container")&&
                    <div id="myBoard-container" >
                        <BoardContainer     user={this.state.user} filterUser={this.state.user} />
                    </div>
                    */}
                    {/*(this.state.activeContainer === "#allBoard-container")&&
                    <div id="allBoard-container" >
                        <BoardContainer     user={this.state.user}  filterUser={{username:null, type:"all"}}/>
                    </div>
                    */}


            </div>
        )
    }

}


render(<ReactContainer />, document.getElementById('react-container'));