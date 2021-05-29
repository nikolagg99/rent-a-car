import React, {Component} from 'react';
import {UserCard} from '../components/UserCard';
import {RentalCard} from '../components/RentalCard';

class RentPage extends Component{
    constructor(props){
        super();
    }

    render(){
        return(
            <div>
                <UserCard/>
                <RentalCard/> 
            </div>
        );
    }

}

export default RentPage;