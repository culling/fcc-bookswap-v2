// /login/twitter

import React from 'react';
import {render} from 'react-dom';

class NewBookModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentWillMount(){
        jQuery( document ).ready(function(){
            
            jQuery('#new-book-modal-step1').modal({
                dismissible: false,
                ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
                    alert("Ready");
                    console.log(modal, trigger);
                },
                complete:{
                    function(){
                        jQuery("#new-book-modal-step2").modal("open");
                    }
                }
            });


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


    _submitClicked(event){
        event.preventDefault();
        console.log("Submit Clicked");

        let _this = this;
        var userMessage = {user:  this.props.user,
            message: "New book created"
        };
        
        var formDataSerializedArray = jQuery("#NewBookForm").serializeArray();
        var formDataObject = this._objectifyForm(formDataSerializedArray);
        //formDataObject.owner = this.props.user._id;
        jQuery("#bookName")
                .val("");

        console.log(JSON.stringify( formDataObject ));
        jQuery.ajax({
            type: "POST",
            url: "/api/book",
            data: JSON.stringify(formDataObject ),
            success: function(){
                console.log("Success");
                //_this._getUser();
                //_this._sendUserMessage(userMessage);
            },
            dataType: "text",
            contentType : "application/json"
        });
    }

    render(){
        return(
            <div id="new-book-modal-step1" className="modal">
                <form id="NewBookForm">
                    <div className="modal-content">
                        <h4>New Book</h4>

                            <div className="input-field">
                                <i className="material-icons prefix">assignment_ind</i>
                                <input type="text" name="bookName" id="bookName" required />
                                <label htmlFor="bookName" >Book Name </label>
                            </div>
                        <button  className="modal-action modal-close waves-effect waves-green btn-flat" onClick={this._submitClicked.bind(this)}>Submit</button>
                        <a  className="modal-action modal-close waves-effect waves-green btn-flat">Cancel</a>


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

export default NewBookModal;

