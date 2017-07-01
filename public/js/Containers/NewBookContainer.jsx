import React from 'react';
import {render} from 'react-dom';


import NewBookModalStep1     from "./NewBookContainer/Modals/NewBookModalStep1.jsx";
import NewBookModalStep2     from "./NewBookContainer/Modals/NewBookModalStep2.jsx";

class NewBookContainer extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            newBookTitle: "",
            foundBooks: []
        }

        //Binding to this for functions
        this._setNewBookTitle = this._setNewBookTitle.bind(this);
    };

    componentWillMount(){

   }

   componentDidMount(){   

   }

   componentWillUnmount(){
        //socket.removeListener('new state');
   }

    _setNewBookTitle(bookSearch){
        var _this = this;
        console.log("Set New Book Name called");
        var newBookTitle = bookSearch.title;
        this.setState({newBookTitle: newBookTitle});
        console.log(newBookTitle);
        
        jQuery.ajax({
            method: 'GET',
            url:("/api/book"),
            data: {"title": newBookTitle},
            success: (rawResult)=>{
                //console.log(rawResult)

                var resultObject = JSON.parse(rawResult);
                var booksArray = resultObject.items
                if (booksArray.length > 0 ){
                    //console.log(booksArray );
                    var filteredBooksArray = booksArray.filter((foundBook) => {
                        //console.log(foundBook.volumeInfo.imageLinks)
                        return (foundBook.volumeInfo.imageLinks !== undefined)
                    });
                    console.log(filteredBooksArray);
                    _this.setState({"foundBooks": filteredBooksArray});
                    jQuery("#new-book-modal-step2").modal("open");
                    
                }
                
           }
        });
        

        


        
    }


    render(){
        return(
            <div id="new-book-container" className="new-book-container">
                    <NewBookModalStep1 setNewBookTitle={ this._setNewBookTitle.bind(this) } user={this.props.user} />
                    <NewBookModalStep2 foundBooks={this.state.foundBooks} user={this.props.user} />

            </div>
        )
    }
}


export default NewBookContainer;