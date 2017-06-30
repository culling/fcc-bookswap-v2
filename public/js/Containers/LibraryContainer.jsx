//https://developers.google.com/books/docs/v1/using#PerformingSearch
//    https://www.googleapis.com/books/v1/volumes?q=search+terms
// example - https://www.googleapis.com/books/v1/volumes?q=intitle:people

import React from 'react';
import {render} from 'react-dom';



class LibraryContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            books: [],
            user: {},

        }
    };


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




    render(){
        return (
        <div>
            <b>Library</b>
            {this.props.filterUser.username &&
                <b> My Books</b>
            }
            {this.props.filterUser.type == "all" &&
                <b> Whole Library </b>
            }

        </div>
        )
    };


}


export default LibraryContainer;