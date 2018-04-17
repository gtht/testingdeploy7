import React, {Component} from 'react';
import {IconButton, List, ListItemText, Switch, FormControlLabel } from 'material-ui';
import {Muted} from 'components';
import { Delete } from 'material-ui-icons';
import Message from './Message';

// <ListItemText
//   primary= {<p><b><Message message = {message.title} /></b></p>}
//   secondary= {<Muted><Message message = {message.desc} /></Muted>}
// />

class MessageContents extends Component {
  constructor(props){
    super(props);
    this.state = {
      checkedA: true
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render(){
    alert("messgaeContent:"+this.state.checkedA);
    return (
      <div style={{flex:1, flexDirection: 'row'}}>
        <div style={{border: '1px soli d red', flex:0.8, float: 'left', width: '80%'}}>contentssssss</div>
        <FormControlLabel
        style={{border: '1px solid red', flex: 0.1, float: 'right', width:'15%'}}
        control={
          <Switch
            checked={this.state.checkedA}
            onChange={this.handleChange('checkedA')}
            value="checkedA"
            color="primary"
          />
        }
        label="Primary"
      />
      </div>
    )
  }
}
export default MessageContents;
