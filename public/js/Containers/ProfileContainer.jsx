// References and useful pages
//https://stackoverflow.com/questions/41216948/this-setstate-is-not-a-function-when-trying-to-save-response-on-state

import React from 'react';
import {render} from 'react-dom';



class ProfileContainer extends React.Component{

    constructor(props){
        super(props);

    };

    componentWillMount(){

        socket.on('new state', function(newState) {
            console.log("new state found");
            //this.setState(newState);

        }.bind(this));
   }

    render(){
        return(
            <div id="profile-container" className="div-hidden">
                <b>Profile</b>
                {(this.props.user) &&
                <div id="profile-header">
                    {this.props.user.displayName} 
                    <img className="circle" src={this.props.twitterUser.profile_image_url_https} />
                </div>
                }
            </div>
        )
    }
}


export default ProfileContainer;