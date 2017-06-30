import React from 'react';
import {render} from 'react-dom';


import NewBookModalStep1     from "./Modals/NewBookModalStep1.jsx";
import NewBookModalStep2     from "./Modals/NewBookModalStep2.jsx";

class HomeContainer extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            newBookName: ""
        }

    };

    componentWillMount(){

   }

   componentDidMount(){   

   }

   componentWillUnmount(){
        //socket.removeListener('new state');
   }

   _setNewBookName(newBookName){
        this.setState({newBookName: newBookName});
   }


    render(){
        return(
            <div id="new-book-container" className="new-book-container">
                    <NewBookModalStep1 />
                    <NewBookModalStep2 newBookName={this.state.newBookName} />

            </div>
        )
    }
}


export default HomeContainer;