import React from 'react';
import {render} from 'react-dom';


//Trade request Pending Card
import TradeRequestPendingCard      from './../Cards/TradeRequestPendingCard.jsx';


class TradesContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: this.props.user,
            books: [],
            myTradeRequests:[],
            otherTradeRequests:[]
        }
    }

    componentWillMount(){
        this._getLibraryContentsAllUsers();
    }

    componentWillReceiveProps(newProps){
        if (this.props.user != newProps.user){
            this.setState({user: newProps.user});
            this._getLibraryContentsAllUsers();
        }
    }

    _getLibraryContentsAllUsers(){
        var allUsers= {type:"all"};
        this._getLibraryContents(allUsers);
    }
    
    _getLibraryContents(user){        

        console.log("Get Library Contents");
        this.setState({"books":[]});
        
        if(user.type != "user"){
            user.username = undefined;
        }

        jQuery.ajax({
            method: 'GET',
            url:("/api/library"),
            data: {"username": user.username},
            success: (rawResult)=>{
                //console.log(rawResult);
                var booksArray = JSON.parse(rawResult);
                if (booksArray.length > 0 ){
                    console.log(booksArray );
                    this.setState({"books": booksArray});


                    var myTradeRequests = booksArray.filter(book=>{
                        return (this.props.user && (book.owner.username == this.props.user.username) && ( book.usersRequestingTrade.length > 0 ) );
                    });
                    this.setState({myTradeRequests: myTradeRequests});

                    var otherTradeRequests = booksArray.filter(book=>{
                        var usersRequestingTrade = (book.usersRequestingTrade.length > 0 );
                        var userLoggedIn = (typeof this.props.user.username !== "undefined");
                        var thisUserRequestingTrade = book.usersRequestingTrade.filter(user =>{
                            return (this.props.user && user &&
                             this.props.user.username && (user.username == this.props.user.username));
                        });

                        return (usersRequestingTrade && userLoggedIn && (thisUserRequestingTrade.length > 0) )
                    });
                    this.setState({otherTradeRequests: otherTradeRequests});


                }
            },
            dataType: "text",
            contentType : "application/json"

        });

    }


    render(){
        return(
            <div>
                <div>
                    <b>Approve Trade Requests</b>
                    {this.state.myTradeRequests.map((book, i )=>{
                        return(
                            <div key={i}>
                                {book.usersRequestingTrade.map((userRequestingTrade, j ) =>{
                                    return (<div key={j}>
                                    <TradeRequestPendingCard tradeRequestBook={book} userRequestingTrade={userRequestingTrade} user={this.props.user} />
                                    </div>)
                                } ) }
                            </div>
                        )
                    } )}
                </div>

                <div>
                    <b>Waiting for Approval</b>
                    {this.state.otherTradeRequests.map((book, i )=>{
                        return(
                            <div key={i}>
                                <TradeRequestPendingCard tradeRequestBook={book} userRequestingTrade={this.props.user} user={this.props.user} />
                            </div>
                        )
                    } )}

                </div>
                
            </div>
        )
    }
}

export default TradesContainer;