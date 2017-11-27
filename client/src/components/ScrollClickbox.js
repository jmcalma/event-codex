import React from  "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class ScrollClickbox extends React.Component{
    constructor(props){
        super(props);

        this.state={
            text = "",
            scrollToId="",
        }
    }

    componentDidMount(){
        this.setState({ text: this.props.text });
        this.setState({ scrollToId: this.props.scrollToId })
    }

    render(){
        return(
            <div className="home--clickable">
            </div>
        )
    }
}