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
        var book = Object.assign(this.props.book);
        console.log("Book Details");
        console.log(book);
        book.usersRequestingTrade.push( this.props.user );
        //Message stuff
        let _this = this;
        var userMessageToBookOwner = { 
            user: book.owner,
            message: "New Trade Request for - "+ book.title
        };

        jQuery.ajax({
            method: 'POST',
            url:("/api/trade"),
            data: JSON.stringify(book),
            contentType: 'application/json', // for request
            dataType: "text",
            success: function(){
                _this._sendUserMessage( userMessageToBookOwner );
                Materialize.toast(`Trade Request Submitted`, 4000);
            }
        });

    }


    render(){
        return (
            <div id="book-card" className="col s12 m12 l6 xl6">
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
                            {(this.props.user && this.props.user.username && 
                                this.props.book.owner && this.props.book.owner.username && 
                                (this.props.user.username !== this.props.book.owner.username)) &&
                                <a href="#" onClick={() => this._submitTradeRequestClick() }> Submit Trade Request </a>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    };
}


export default NewBookCard;