import React from 'react';
import {render} from 'react-dom';


import NewBookModalStep1     from "./../Modals/NewBookModalStep1.jsx";
import NewBookModalStep2     from "./../Modals/NewBookModalStep2.jsx";

class NewBookContainer extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            newBookName: ""
        }

        //Binding to this for functions
        this._setNewBookName = this._setNewBookName.bind(this);
    };

    componentWillMount(){

   }

   componentDidMount(){   

   }

   componentWillUnmount(){
        //socket.removeListener('new state');
   }

    _setNewBookName(bookSearch){
        console.log("Set New Book Name called");
        var newBookName = bookSearch.newBookName;
        this.setState({newBookName: newBookName});

        


        jQuery("#new-book-modal-step2").modal("open");        
    }


    render(){
        return(
            <div id="new-book-container" className="new-book-container">
                    <NewBookModalStep1 setNewBookName={ this._setNewBookName.bind(this) } />
                    <NewBookModalStep2 newBookName={this.state.newBookName} />

            </div>
        )
    }
}


export default NewBookContainer;