import React, {Component} from 'react';
import Message from './Message';

import { List, ListItemText } from 'material-ui';
import { Muted } from "components";

class MessageList extends Component {
  constructor(props){
    super(props);

    this.state  = {
      messagePage: this.props.selectedIndex,
      emptyMsg: true
    }
  }

  render(){
    const { classes, onClose, selectedLesson, selectedIndex, ...other } = this.props;
    // alert("from messagelist:"+this.props.listOfMessages);
    let messageNodes = this.props.listOfMessages.map((message) => {
      // alert(message.title);
      return (
        <div className="card">
          <div className="card-content"
            style= {{
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
              primary= {<p><b><Message message = {message.title} /></b></p>}
              secondary= {<Muted><Message message = {message.desc} /></Muted>}
            />
          </div>
        </div>
      )
    });

    // const emptt = this.state.emptyMsg;
    // const msg = emptt ? (
    //     <div>No posts yet</div>
    //   ) : (
    //     <div>{messageNodes}</div>
    //   );

    return (
      <div>
        <List>
          {messageNodes}
        </List>
      </div>
    );
  }
}

export default MessageList;
