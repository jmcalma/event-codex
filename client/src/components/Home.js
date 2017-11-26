import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {blue500} from 'material-ui/styles/colors';


class Home extends React.Component{
    render(){
        const clickables={
            textAlign: 'center',
            display : 'inline-block',
            width: '25%',
            position: 'relative',
            border: '1px solid black',
            // padding: '3% 3% 3% 3%',
            margin: '4% 4% 4% 4%',

        };

        // quick export button styling - TODO: move to seperate styling file, use flowbox
        const qExport = {
            flex: '0 5 auto',
            border: '1px solid black',
            width: '25%',
            height: '30%',
            alignItems: 'center',
            display: 'inline-block',
            padding: '1% 1% 1% 1%',
        };


        return(
            <div>
                <MuiThemeProvider>
                <h2> Most Popular: </h2>
                    <div style={clickables} className = "quick-export" onClick={this.exportCalendar}>
                        <h3> box1 </h3>
                    </div>
                    <div style={clickables} className = "quick-export">
                        <h3>box2</h3>
                    </div>
                    <div style={clickables} className = "quick-export">
                        <h3>box3</h3>
                    </div>

                </MuiThemeProvider>
            </div> // ./quick-export
        )
    }
}

function exportCalendar(props){
    //code linking to get request specifying export
}

export default Home;