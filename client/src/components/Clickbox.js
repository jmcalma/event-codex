import React from  "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FileSaver from 'file-saver';

//styling in styles.css

class Clickbox extends React.Component{
    constructor(props) {
        super(props);
  
        this.state = {
            eventName: " ",
            bgImage: "",
            buttonState: "false",
            eventDefault: "true",
            eventId: "0",
        };

        this.handleClick = this.handleClick.bind(this);

    }

    componentDidMount(){
        // console.log("hi");
        this.setState({ eventName: this.props.eventName })
        this.setState({ eventId: this.props.eventId })
    }

    handleClick=()=>{
        this.setState({eventName: "changed"})
    }

    downloadEvent =() => {
        if(this.state.eventDefault === true){
            var newState = false;
            this.setState({ eventDefault: newState})
            fetch("/api/meetupEvents/downloadics/"+this.state.eventId)
            .then((res)=> {
              return res.blob()})
            .then((blob => {
              FileSaver.saveAs(blob, this.state.eventName + ".ics") 
            }))
        }else {
            fetch("/api/event/downloadics/"+this.state.eventId)
            .then((res)=> {
              return res.blob()
          }).then((blob => {
              FileSaver.saveAs(blob, this.state.eventName + ".ics");
          }))
        }
      }

    render(){
        return(
        <div className="home--clickable" onClick={this.handleClick}>
            <h3>{this.state.eventName}</h3>
        </div>
        )  
    }
}

export default Clickbox