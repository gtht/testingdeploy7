import React, {Component} from 'react';
import Message from './Message';

import _ from 'lodash';

import { List, ListItemText } from 'material-ui';
import { Muted } from "components";

class MessageList extends Component {
  constructor(props){
    super(props);
    // In the constructor, I am using the database reference to call the Firebase
    // server reference to get the messages data. It will return a Promise, and when
    // It resolves, we get our data. Here the URL or Reference for the Firebase is
    // ‘/messages.’ Messages are one of the nodes of firebase, and we are getting
    // all of its children as data.
    this.state  = {
      messagePage: this.props.selectedIndex,
      listOfMessages: [],
      emptyMsg: true
    }
    //'/lessons/lecture'+(this.props.selectedIndex+1)+'/messages'
    let app = this.props.db.database().ref('lessons/lecture'+(this.props.selectedIndex+1)+'/messages');
    app.on('value', snapshot => {
      this.getData(snapshot.val());
    });

    this.updateListOfMessages = this.updateListOfMessages.bind(this);
  }

  // The data is returned as an Object, and we are storing this values in an
  // array that is why we are using the lodash module to convert an Object into
  // an Array.
  // getData(values){
  //   let messagesVal = values;
  //   let messages = _(messagesVal)
  //                     .keys()
  //                     .map(messageKey => {
  //                         let cloned = _.clone(messagesVal[messageKey]);
  //                         cloned.key = messageKey;
  //                         return cloned;
  //                     })
  //                     .value();
  //     this.setState({
  //       messages: messages
  //     });
  // }

  updateListOfMessages(messages){
    this.setState({ listOfMessages: messages });
    if (this.state.listOfMessages.length > 0){
      this.setState({ emptyMsg : false });
    }
  }

  getData(values){
    let messagesVal = values;   // this is an Object
    // iterates thru the 10 Objects
    alert("messageVal="+messagesVal);
    let messages = _(messagesVal)
                      .keys()
                      .map(messageKey => {
                          let cloned = _.clone(messagesVal[messageKey]);
                          cloned.key = messageKey;
                          return cloned;
                      })
                      .value();
      alert("messages="+messages)
      this.setState({
        listOfMessages: messages
      });

      alert(this.state.listOfMessages);
      this.updateListOfMessages(messages);

  }

  // Finally, iterate an array and put the value in Message component as a
  // property and Message component displays the messages
  render(){
    const { classes, onClose, selectedLesson, selectedIndex, ...other } = this.props;

    let messageNodes = this.state.listOfMessages.map((message) => {
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

    const emptt = this.state.emptyMsg;
    const msg = emptt ? (
        <div>No posts yet</div>
      ) : (
        <div>{messageNodes}</div>
      );

    return (
      <div>
        <List>
          {messageNodes}
          <ListItemText
            primary= {<p><b>test title</b></p>}
            secondary= {<Muted>test desc</Muted>}
          />
        </List>
      </div>
    );
  }
}

export default MessageList;
