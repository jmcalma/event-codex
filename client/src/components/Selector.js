import React from "react";
import ReactDOM from 'react-dom';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import SearchResultsList from './SearchResultsList';
import 'whatwg-fetch';

const styles = {
  customWidth: {
    width: 300,
    height: 60,
  },
  underline: {
    color: "black",
    textDecorationColor: "black"
  }
};


const dialogFixStyles = {
  dialogRoot: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 0,
    paddingBottom: 100
  },
  dialogContent: {
    position: "relative",
    width: "80vw",
  },
  dialogBody: {
    paddingBottom: 0
  }
};

const style = {
  margin: 12,
};

class Selector extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        value: 1,
        meetupEventsSearch: [],
        searchOpen: false,
      };
  }

  handleChange = (event, index, value) => this.setState({value});

  handleSearch = () => {
    var searchFilter = ["title", "category", "tag"];
    var chosenFilter = searchFilter[this.state.value - 1];
    var query = document.getElementById('input_search_field').value;

    if(query === "") {
      return;
    }

    this.setState({ searchOpen: true });
    fetch("/api/meetupEvents/" + chosenFilter + "/" + query)
      .then((response) => {
         return response.json() })
      .then((json) => {
        this.setState({ meetupEventsSearch: json });
    });

    fetch("/api/event/" + chosenFilter + "/" + query)
      .then((response) => {
         return response.json() })
      .then((json) => {
        this.setState({ eventsSearch: json });
            ReactDOM.render(
              <SearchResultsList events={ json.concat(this.state.meetupEventsSearch) } />,
               document.getElementById('searchResults')
          );
    });
  }

  closeSearch = () => {
    this.setState({ searchOpen: false })
  }

  render() {
    const actionsSearch = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={this.closeSearch}
      />,
    ];

    return(
      <div>
      <br/>
      <div className="row">
        <div className="input-field col s1">
        </div>

        <div className="col s4">
        <MuiThemeProvider>
          <DropDownMenu style={styles.customWidth} underlineStyle={styles.underline} value={this.state.value} onChange={this.handleChange}>
            <MenuItem value={1} primaryText="Title" />
            <MenuItem value={2} primaryText="Category" />
            <MenuItem value={3} primaryText="Tag" />
          </DropDownMenu>
        </MuiThemeProvider>
        </div>

        <div className="input-field col s4">
          <input placeholder="Search" id="input_search_field" type="text" className="validate"/>
        </div>

        <div className="col s2">
        <MuiThemeProvider>
          <RaisedButton label="Search" primary={true} style={style} onClick={this.handleSearch}/>
        </MuiThemeProvider>
        </div>
          <MuiThemeProvider>
           <div>
            <Dialog
              title={"Search Results"}
              actions={actionsSearch}
              modal={false}
              open={this.state.searchOpen}
              onRequestClose={this.closeSearch}
              autoScrollBodyContent={true}
              repositionOnUpdate={false}
              contentStyle={ dialogFixStyles.dialogContent }
              bodyStyle={ dialogFixStyles.dialogBody }
              style={ dialogFixStyles.dialogRoot }
            >        
              <div id="searchResults"> </div>
            </Dialog>
            </div>
        </MuiThemeProvider>
      </div>
      </div>
    );
  }
}

export default Selector;
