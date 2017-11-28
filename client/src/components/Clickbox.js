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
            meetup: "false"
        };

        this.downloadEvent = this.downloadEvent.bind(this);
    }

    componentDidMount(){
        this.setState({ eventName: this.props.eventName });
        this.setState({ eventId: this.props.eventId });
        var imageLink = "url(".concat(this.props.bgImage).concat(")");
        this.setState({ bgImage: imageLink });
    }

    handleClick=()=>{
        this.setState({eventName: "changed"})
    }

    //possible fatal bug if invalid eventId is passed in props
    downloadEvent =() => {
        if(this.state.meetup === true){
            var newState = false;
            this.setState({ eventDefault: newState})
            fetch("/api/meetupEvents/downloadics/"+this.state.eventId)
            .then((res)=> {
              return res.blob()})
            .then((blob => {
              FileSaver.saveAs(blob, this.state.eventName + ".ics");
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
        <div style={{backgroundImage: this.state.bgImage}} className="home--clickable" onClick={this.downloadEvent}>
            <h3>{this.state.eventName}</h3>
        </div>
        )  
    }
}

export default Clickbox