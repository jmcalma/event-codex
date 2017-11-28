import React from "react";
import ReactDOM from 'react-dom';   
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {blue500} from 'material-ui/styles/colors';
import Clickbox from './Clickbox';
import Selector from './Selector';
import Calendar from './Calendar';
import ScrollClickbox from './ScrollClickbox'


class Home extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            idOffset: 0,
        }

        // this.scrollToId = this.scrollToId.bind(this);
    }

    componentDidMount(){
        var itemId = document.getElementById("calendar").offsetTop;
        this.setState({ idOffset: itemId });
    }

    render(){
        return(
            <section>
            <MuiThemeProvider>
                <div className="home--banner">
                        <Selector/>
                        {/* <div className= "row">
                            <h3> Most Popular Events: </h3>
                            <Clickbox eventName="tech" eventId="1847371" meetup="true"/>
                            <Clickbox eventName="Disney Fan Club Meetup" eventId="1847371" meetup="true" bgImage="./Shwz-Disney-Mickey-mouse.icon"/>
                            <Clickbox eventName="event3" eventId="1847371" meetup="true"/>
                        </div> */}
                        <ScrollClickbox text="Calendar" scrollToId="space"/>
                </div>
                <div id="space"/>
                <Calendar />
            </MuiThemeProvider>
            </section>
        );
    }
}


export default Home;