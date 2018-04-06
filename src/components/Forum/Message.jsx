import React, {Component} from 'react';
import {IconButton } from 'material-ui';
import { Delete } from 'material-ui-icons';

class Message extends Component {
  render(){
    return (
      <div>
        {this.props.message}
      </div>
    )
  }
}
export default Message;
