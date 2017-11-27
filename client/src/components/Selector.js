import React from "react";
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  customWidth: {
    width: 300,
    height: 60
  },
};

const style = {
  margin: 12,
};

class Selector extends React.Component{
  constructor(props) {
    super(props);
    this.state = {value: 1};
  }

  handleChange = (event, index, value) => this.setState({value});

  render() {
    return(
      <div>
      <br/>
      <div className="row">
        <div className="input-field col s1">
        </div>

        <div className="col s4">
        <MuiThemeProvider>
          <DropDownMenu style={styles.customWidth} value={this.state.value} onChange={this.handleChange}>
            <MenuItem value={1} primaryText="Title" />
            <MenuItem value={2} primaryText="Category" />
            <MenuItem value={3} primaryText="Tag" />
          </DropDownMenu>
        </MuiThemeProvider>
        </div>

        <div className="input-field col s4">
          <input placeholder="Search" id="search" type="text" className="validate"/>
        </div>

        <div className="col s2">
        <MuiThemeProvider>
          <RaisedButton label="Search" primary={true} style={style}/>
        </MuiThemeProvider>
        </div>
      </div>
      </div>
    );
  }
}

export default Selector;
