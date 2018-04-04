import React, {Component} from 'react';
import Message from './Message';

// First, I would like to download a new package from NPM called ‘lodash.’
import _ from 'lodash';

import { List, ListItemText } from 'material-ui';

import { Muted } from "components";

// If you want to program functionally and you need to deal with lots of arrays
// as well as objects then in javascript you should definitely use this library.
// It is quite a famous library inFunctional JavaScript Programming.

class MessageList extends Component {
  constructor(props){
    super(props);

    // In the constructor, I am using the database reference to call the Firebase
    // server reference to get the messages data. It will return a Promise, and when
    // It resolves, we get our data. Here the URL or Reference for the Firebase is
    // ‘/messages.’ Messages are one of the nodes of firebase, and we are getting
    // all of its children as data.
    this.state  = {
      messages: []
    }

    let app = this.props.db.database().ref('messages');
    app.on('value', snapshot => {
      this.getData(snapshot.val());
    });
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

  getData(values){
    let messagesVal = values;   // this is an Object
    // iterates thru the 10 Objects
    let messages = _(messagesVal)
                      .keys()
                      .map(messageKey => {
                          let cloned = _.clone(messagesVal[messageKey]);
                          cloned.key = messageKey;
                          return cloned;
                      })
                      .value();
      this.setState({
        messages: messages
      });
  }
  // Finally, iterate an array and put the value in Message component as a
  // property and Message component displays the messages
  render(){
    let messageNodes = this.state.messages.map((message) => {
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
