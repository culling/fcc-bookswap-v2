

import React from 'react';
import {render} from 'react-dom';

class TradeRequestPendingCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            books: [],
            user: this.props.user,
            tradeRequestBook: this.props.tradeRequestBook,
            userRequestingTrade: this.props.userRequestingTrade
        }

        //Binding to this for functions
        this._sendUserMessage   = this._sendUserMessage.bind(this);
    };


    
    componentWillReceiveProps(newProps){
        if (this.props.tradeRequestBook != newProps.tradeRequestBook){
            this.setState({tradeRequestBook: newProps.tradeRequestBook});
            jQuery("#tradeRequest-card")
                .attr("class", "div-visible");
        }
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


    _promptForTradeRequestYesClick(book){
        console.log("promptForTradeRequestYesClick");
        console.log(this.props.userRequestingTrade);

        //book.owner = this.props.user ;
        book.owner = this.props.userRequestingTrade;
        book.usersRequestingTrade = [];

        //Message stuff
        let _this = this;
        var successMessage = {
            user: this.props.userRequestingTrade,
            message: "Trade request accepted for - " + book.title
        }

        jQuery.ajax({
            method: 'POST',
            url:("/api/trade"),
            data: JSON.stringify(book),
            contentType: 'application/json', // for request
            dataType:"text", // for response
            success: function(){
                console.log("Trade request accepted");                
                jQuery("#tradeRequest-card")
                    .attr("class", "div-hidden");
                _this._sendUserMessage(successMessage);
            }
        });
    }


    _cancelTradeRequestFromUser(book, user){
        //book.owner = ( this.props.userRequestingTrade );
        book.usersRequestingTrade = book.usersRequestingTrade.filter(userRequestingTrade =>{
            return (userRequestingTrade.username !== user.username);
        });

        
        //Message stuff
        let _this = this;
        var cancelMessage = {
            user: this.props.userRequestingTrade,
            message: "Trade request cancelled for - " + book.title
        }


        jQuery.ajax({
            method: 'POST',
            url:("/api/trade"),
            data: JSON.stringify(book),
            contentType: 'application/json', // for request
            dataType: "text", 
            success: function(){
                console.log("Trade request cancelled");
                jQuery("#tradeRequest-card")
                    .attr("class", "div-hidden");
                _this._sendUserMessage( cancelMessage );
            }
        });
    }

    _promptForTradeRequestNoClick(book){
        console.log("promptForTradeRequestNoClick");
        this._cancelTradeRequestFromUser(book, this.props.userRequestingTrade);
        //jQuery("#tradeRequest-card")
        //    .attr("class", "div-hidden");
    }

    _promptForTradeRequestCancelClick(book){
        console.log("promptForTradeRequestCancelClick");
        this._cancelTradeRequestFromUser(book, this.props.user );
        //jQuery("#tradeRequest-card")
        //    .attr("class", "div-hidden");
    }


    render(){
        return (
            <div id="tradeRequest-card">
                <div className="card horizontal">
                    <div className="card-image">
                        <img src={this.state.tradeRequestBook.thumbnailUrl} 
                            alt={this.state.tradeRequestBook.title} 
                            className="book-smallThumbnail"
                        />
                    </div>
                    <div className="card-stacked" id="tradeRequest-card-text">
                        <div className="card-content" >
                            <div> </div>
                             {(this.props.userRequestingTrade  && this.props.userRequestingTrade.username ) &&
                                <div> <b>User Requesting Trade:</b> {this.props.userRequestingTrade.username }</div>
                            }
                            <div><b>{this.state.tradeRequestBook.title}</b></div>
                            <div>Authors</div>
                            {this.state.tradeRequestBook.authors.map((author, i) =>{return <li key={i} >{author}</li>} ) }
                        </div>
                        { (this.props.user && this.props.userRequestingTrade && (this.props.userRequestingTrade.username !== this.props.user.username)) &&
                        <div className="card-action">
                            <a href="#" onClick={() => this._promptForTradeRequestYesClick(this.state.tradeRequestBook)}> Yes </a>
                            <a href="#" onClick={() => this._promptForTradeRequestNoClick(this.state.tradeRequestBook)} > No  </a>
                        </div>
                        }
                        { (this.props.user && this.props.userRequestingTrade && (this.props.userRequestingTrade.username === this.props.user.username)) &&
                        <div className="card-action">
                            <a href="#" onClick={() => this._promptForTradeRequestCancelClick(this.state.tradeRequestBook)}> Cancel </a>
                        </div>
                        }

                    </div>
                </div>
            </div>
        )
    };
}


export default TradeRequestPendingCard;