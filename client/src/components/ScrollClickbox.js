import React from  "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DateRange from 'material-ui/svg-icons/action/date-range';
import RaisedButton from 'material-ui/RaisedButton';
import {red500} from 'material-ui/styles/colors';

const styles = {
    icon:{
        marginRight: 24,
    },
    button: {
        margin: 12,
    }
  };



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
                <RaisedButton
                    label={this.state.text}
                    labelPosition="after"
                    primary={true}
                    icon={<DateRange style={styles.icon} color={red500}/>}
                    style={styles.button}
                    />
            </div>
        )
    }
}

export default ScrollClickbox