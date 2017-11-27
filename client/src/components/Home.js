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
                    <Clickbox/>

                    <div className= "row" text="changed">
                        <Clickbox>
                            
                        </Clickbox>
                        <div style={clickable} className = "clickable">
                            <h3>box2</h3>
                        </div>
                        <div style={clickable} className = "clickable">
                            <h3>box3</h3>
                        </div>
                    </div>
                </MuiThemeProvider>
            </section> // ./quick-export

        )
    }
}

function exportCalendar(props){
    //code linking to get request specifying export
}

export default Home;