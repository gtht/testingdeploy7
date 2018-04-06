import React, {Component} from 'react';
import {IconButton, List, ListItemText } from 'material-ui';
import {Muted} from 'components';
import { Delete } from 'material-ui-icons';
import Message from './Message';

// <ListItemText
//   primary= {<p><b><Message message = {message.title} /></b></p>}
//   secondary= {<Muted><Message message = {message.desc} /></Muted>}
// />
class MessageContents extends Component {
  render(){
    return (
      <div>
      
        <IconButton>
          <Delete />
        </IconButton>
      </div>
    )
  }
}
export default MessageContents;
