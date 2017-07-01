//https://developers.google.com/books/docs/v1/using#PerformingSearch
//    https://www.googleapis.com/books/v1/volumes?q=search+terms
// example - https://www.googleapis.com/books/v1/volumes?q=intitle:people

import React from 'react';
import {render} from 'react-dom';

//Cards
import BookCard from './../Cards/BookCard.jsx';

class LibraryContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            books: [],
            user: {},

        }
        //this._getLibraryContents = this._getLibraryContents.bind(this);
    };

    componentWillMount(){
        this._getLibraryContents(this.props.filterUser);
    }

    componentDidMount(){
        /*
        socket.on('new state', function(newState) {
            console.log("new state found");
            //this.setState(newState);

            this._getLibraryContents(this.props.filterUser);
        }.bind(this)); 
        */   
    }

    componentWillUnmount(){
        //socket.removeListener('new state');
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


    _getLibraryContents(user){        
        //console.log("Get Library Contents");
        var _this = this;
        this.setState({"books":[]});
        
        if(user.type != "user"){
            user.username = undefined;
        }

        jQuery.ajax({
            method: 'GET',
            url:("/api/library"),
            data: {"username": user.username},
            success: (rawResult)=>{
                console.log("got books from library");
                var booksArray = JSON.parse(rawResult);
                if (booksArray.length > 0 ){
                    console.log(booksArray );
                    _this.setState({"books": booksArray});
                }
            },
            dataType: "text",
            contentType : "application/json"
        });
    }



    render(){
        return (
        <div>
            <b>Library</b>
            {this.props.filterUser.username &&
                <div id="my-library">
                    <b> My Books</b>

                </div>
            }
            {this.props.filterUser.type == "all" &&
                <b> Whole Library </b>
            }



            {(this.state.books.length > 0) && 
                <div id="library-books" className="row library-books">
                    {this.state.books.map((book, i)=> {
                        return(
                        <BookCard key={i} user={this.props.user} book={book} />
                        )
                    })}
                </div>
            }


        </div>
        )
    };


}


export default LibraryContainer;