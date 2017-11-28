import React from  "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'; 

class ScrollClickbox extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            text:"",
            scrollToId:"",
            scrollToPos: 0,
        };

        this.handleReposition = this.handleReposition.bind(this);
    }

    componentDidMount(){
        this.setState({ text: this.props.text });
        this.setState({ scrollToPos: this.props.scrollToPos });
        this.setState({ scrollToId: this.props.scrollToId });
    }

    componentDidUpdate(){
    }

    handleReposition = () => {
        var itemId = document.getElementById(this.state.scrollToId).offsetTop;
        this.setState({scrollToPos: itemId}); 
        window.scrollTo(0,this.state.scrollToPos);
    }


    render(){
        return(
            <div className="home--clickable" onClick={this.handleReposition}>
                <h3>{this.state.text}</h3>
            </div>
        )
    }
}

export default ScrollClickbox