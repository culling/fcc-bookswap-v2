//https://developers.google.com/books/docs/v1/using#PerformingSearch
//    https://www.googleapis.com/books/v1/volumes?q=search+terms
// example - https://www.googleapis.com/books/v1/volumes?q=intitle:people

import React from 'react';
import {render} from 'react-dom';

class NewBookCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }

        //Binding to this for functions
        this._sendUserMessage   = this._sendUserMessage.bind(this);
    };


    
    componentWillReceiveProps(newProps){

    }


    _sendUserMessage(newStateDiff) {
        this.sendUserMessageToDB(newStateDiff);
        // 2. put diffs onto the websocket
        this.postToSocket(newStateDiff);

    }

    postToSocket(newStateDiff) {
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

    _addToLibraryClick(){
        console.log("Add to Library Clicked");
        console.log("Google book Details");
        console.log(this.props.googleBook);
        console.log(this.props.user);
        
        var _this = this;
        var userMessage = {user:  this.props.user,
            message: "New Book added"
        };

        
        jQuery.ajax({
            type: "POST",
            url: "/api/book",
            data: JSON.stringify(this.props.googleBook),
            success: function(){
                console.log("Success");
                //_this._getUser();
                //_this._sendUserMessage(userMessage);
                Materialize.toast('Book Added to Your Library', 4000);
                jQuery("#new-book-modal-step2").modal("close");
                _this._sendUserMessage(userMessage);

            },
            dataType: "text",
            contentType : "application/json"
        });

    }


    render(){
        return (
            <div id="new-book-card">
                <div className="card horizontal">
                    <div className="card-image">
                        <img src={this.props.googleBook.volumeInfo.imageLinks.thumbnail} 
                            alt={this.props.googleBook.volumeInfo.title } 
                            className="book-smallThumbnail"
                        />
                    </div>
                    <div className="card-stacked" id="new-book-card-text">
                        <div className="card-content" >

                            <div><b>{this.props.googleBook.volumeInfo.title}</b></div>
                            <div>Authors</div>{this.props.googleBook.volumeInfo.authors &&
                                <div>
                                    {this.props.googleBook.volumeInfo.authors.map((author, i) =>{return <li key={i} >{author}</li>} ) }
                                </div>
                            }
                        </div>
                        <div className="card-action">
                            <a href="#" onClick={() => this._addToLibraryClick() }> Add To Library </a>

                        </div>                        
                    </div>
                </div>
            </div>
        )
    };
}


export default NewBookCard;