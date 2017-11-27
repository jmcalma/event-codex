import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {blue500} from 'material-ui/styles/colors';
import Clickbox from './Clickbox'
import Selector from './Selector'


class Home extends React.Component{
    render(){
        return(
            <section className="home--banner">
                <MuiThemeProvider>
                    <Selector/>
                    <div className= "row">
                        <Clickbox eventName="tech"/>
                        <Clickbox eventName="box2"/>
                        <Clickbox eventName="box3"/>
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