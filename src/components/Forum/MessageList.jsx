import React, {Component} from 'react';
import Message from './Message';
import firebase from 'firebase';

import { List, ListItemText, FormControlLabel, Switch } from 'material-ui';
import { Muted } from "components";

class MessageList extends Component {
  constructor(props){
    super(props);
  }

  render(){
    const { classes, onClose, selectedLesson, selectedIndex, ...other } = this.props;
    let messageNodes = this.props.selected5.map((message) => {

    return (
      <div className="card" style={{flex: 1, flexDirectrion: 'row'}}>
        <div className="card-content"
          style= {{
            flex: 0.85, float: 'left', width:'95%',
            padding: '20px 15px',
            lineHeight: '20px',
            position: "relative",
            marginBottom: "10px",
            backgroundColor: "white",
            color: "#555555",
            borderRadius: "3px",
            boxShadow:
            "0 12px 20px -10px rgba(255, 255, 255, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(255, 255, 255, 0.2)"}}>
          <ListItemText
            primary= {<p><b><Message message = {message} /></b></p>}
          />
        </div>
      </div>
    ) 
  });

    return (
      <div>
        <List
          style={{maxHeight:'250px', overflow:'auto'}}>
          {messageNodes}
        </List>
      </div>
    );
  }
}

export default MessageList;
