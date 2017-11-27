import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {blue500} from 'material-ui/styles/colors';
import Clickbox from './Clickbox'

const clickable={
    textAlign: 'center',
    display : 'inline-block',
    width: '25%',
    position: 'relative',
    border: '1px solid black',
    margin: '4% 4% 4% 4%',

};


class Home extends React.Component{
    render(){
        return(
            <section className="home--banner">
                <MuiThemeProvider>
                {/* search bar */}
                    <Clickbox text="Search"/>
                    <div className= "row">
                        <Clickbox text="tech"/>
                        <Clickbox text="box2"/>
                        <Clickbox text="box3"/>
                    </div>
                </MuiThemeProvider>
            </section> //banner section
        )
    }
}

function exportCalendar(props){
    //code linking to get request specifying export
}

export default Home;