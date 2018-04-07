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
      <div style={{flex:1, flexDirection: 'column'}}>
        <div>contentssssss</div>
        <IconButton style={{flex: 0.1, right: 0}}>
          <Delete />
        </IconButton>
      </div>
    )
  }
}
export default MessageContents;
