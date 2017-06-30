// /login/twitter

import React from 'react';
import {render} from 'react-dom';

class NewBookModalStep1 extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentWillMount(){
        jQuery( document ).ready(function(){
            
            jQuery('#new-book-modal-step1').modal({});


        });
    }

    _objectifyForm(formArray) {//serialize data function
        var returnArray = {};
        for (var i = 0; i < formArray.length; i++){
            returnArray[formArray[i]['name']] = formArray[i]['value'];
        }
        return returnArray;
    };



    _sendUserMessage(newStateDiff) {
        //this.sendUserMessageToDB(newStateDiff);
        // 2. put diffs onto the websocket
        this.postToSocket(newStateDiff);
    }

    postToSocket(newStateDiff) {
        console.log("Post to Socket");
        socket.emit('new state', newStateDiff);
    }

    sendUserMessageToDB(newStateDiff) {
        jQuery.ajax({
            type: "POST",
            url: "/api/users/messages",
            data: JSON.stringify( newStateDiff ),
            success: function(){
                console.log("message sent to db");
            },
            dataType: "text",
            contentType : "application/json"
        });        

        console.log(newStateDiff);
        console.log("Save to DB called");
    }
    //End _sendUserMessage


    _submitClicked(){
        console.log("Submit Clicked");
        /*
        let _this = this;
        var userMessage = {user:  this.props.user,
            message: "New book created"
        };
        */
        var formDataSerializedArray = jQuery("#NewBookForm").serializeArray();
        var formDataObject = this._objectifyForm(formDataSerializedArray);
        //formDataObject.owner = this.props.user._id;
        jQuery("#title")
                .val("");
        
        this.props.setNewBookTitle(formDataObject);
    }

    render(){
        return(
            <div id="new-book-modal-step1" className="modal">
                <form id="NewBookForm">
                    <div className="modal-content">
                        <h4>New Book</h4>

                            <div className="input-field">
                                <i className="fa fa-book prefix"></i>
                                <input type="text" name="title" id="title" required />
                                <label htmlFor="title" >Book Title </label>
                            </div>


                    </div>
                    <div className="modal-footer">
                        <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat" onClick={this._submitClicked.bind(this)}>Submit</a>
                        <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Cancel</a>
                    </div>
                </form>
            </div>
        )
    }
}

export default NewBookModalStep1;

