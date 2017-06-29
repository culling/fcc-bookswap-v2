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


    _objectifyForm(formArray) {//serialize data function
        var returnArray = {};
        for (var i = 0; i < formArray.length; i++){
            returnArray[formArray[i]['name']] = formArray[i]['value'];
        }
        return returnArray;
    };




    _updateProfileClick(){
        let _this = this;
        var formDataSerializedArray = jQuery("#profileForm").serializeArray();
        var formDataObject = this._objectifyForm(formDataSerializedArray);
        console.log(JSON.stringify( formDataObject ));
        jQuery.ajax({
            type: "PUT",
            url: "api/user",
            data: JSON.stringify(formDataObject ),
            success: function(){
                _this.props.getUser();
            },
            dataType: "text",
            contentType : "application/json"
        });        
    }



    render(){
        return(
            <div id="profile-container" className="div-hidden">
                
                <header>
                    <b>Profile</b>
                </header>
                {this.props.user &&
                <form id="profileForm">
                    <input id="username" name="username" 
                        type="text" disabled
                        value={this.props.user.username || ""} 
                    />

                    <input id="password" name="password" 
                        type="password" placeholder="Password"
                    />

                    <input id="firstName" name="firstName" 
                        type="text" placeholder="First Name" 
                        defaultValue={  this.props.user.firstName || "" } 
                    />
                    
                    <input id="lastName"  name="lastName"
                    type="text"  placeholder="Last Name"
                    defaultValue={this.props.user.lastName  || ""} 
                    />

                    <input id="city"  name="city"
                    type="text"  placeholder="City"
                    defaultValue={this.props.user.city  || ""} 
                    />

                    <input id="state"  name="state"
                    type="text"  placeholder="State"
                    defaultValue={this.props.user.state  || ""} 
                    />

                    <input id="country"  name="country"
                    type="text"  placeholder="Country"
                    defaultValue={this.props.user.country  || ""} 
                    />
                <button type="button" className="btn" onClick={ () => this._updateProfileClick() } >Submit</button>
                </form>
                }
            </div>
        )
    }
}


export default ProfileContainer;