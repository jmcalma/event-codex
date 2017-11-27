import React from  "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const clickable={
    textAlign: 'center',
    display : 'inline-block',
    width: '25%',
    position: 'relative',
    border: '1px solid black',
    margin: '4% 4% 4% 4%',
};


class Clickbox extends React.Component{
    constructor(props) {
        super(props);
  
        this.state = {
            text: " ",
            bgColor: "",
            searchOpen: "false"
        };

        this.handleClick = this.handleClick.bind(this);

    }

    componentDidMount(){
        // console.log("hi");
        this.setState({ text: this.props.text })
    }

    render(){
        return(
        <div className="home--clickable" onClick={this.handleClick}>
            <h3>{this.state.text}</h3>
        </div>
        )  
    }

    handleClick=()=>{
        this.setState({text: "changed"})
    }
}

export default Clickbox