import React from 'react';
import Logo from '../../Logo/Logo';
import Items from '../Items/Items';
import Backdrop from '../../UI/Backdrop/Backdrop';
import classes from './Sidedrawer.css';

const sidedrawer = (props) => {
    
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.open)
        attachedClasses = [classes.SideDrawer, classes.Open];

    return (
        <React.Fragment>
            <Backdrop show={props.open} clicked={props.closed}></Backdrop>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}><Logo/></div>
                <nav>
                    <Items isAuthenticated={props.isAuth}/>
                </nav>
            </div>
        </React.Fragment>
    );
}
 
export default sidedrawer;