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

    _submitTradeRequestClick(){
        console.log("Submit Trade Request Clicked");
        console.log("Book Details");
        console.log(this.props.book);

        jQuery.ajax({
            type: "POST",
            url: "/api/book",
            data: JSON.stringify(this.props.book),
            success: function(){
                console.log("Success");
                //_this._getUser();
                //_this._sendUserMessage(userMessage);
                //Materialize.toast('Book Added to Your Library', 4000);
                //jQuery("#new-book-modal-step2").modal("close");
            },
            dataType: "text",
            contentType : "application/json"
        });

    }


    render(){
        return (
            <div id="book-card">
                <div className="card horizontal">
                    <div className="card-image">
                        <img src={this.props.book.thumbnailUrl} 
                            alt={this.props.book.title } 
                            className="book-smallThumbnail"
                        />
                    </div>
                    <div className="card-stacked" id="book-card-text">
                        <div className="card-content" >

                            <div><b>{this.props.book.title}</b></div>
                            <div>Authors</div>{this.props.book.authors &&
                                <div>
                                    {this.props.book.authors.map((author, i) =>{return <li key={i} >{author}</li>} ) }
                                </div>
                            }
                        </div>
                        <div className="card-action">
                            <a href="#" onClick={() => this._submitTradeRequestClick() }> Submit Trade Request </a>

                        </div>
                    </div>
                </div>
            </div>
        )
    };
}


export default NewBookCard;