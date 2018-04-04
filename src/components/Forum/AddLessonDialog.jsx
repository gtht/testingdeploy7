import trim from 'trim';
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import {Paper, TextField} from "material-ui";

class AddLessonDialog extends React.Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);

    this.state = {
      name: ''
    };
  }

  handleRemove() {
    return this.props.db.database().ref('items').child('ITEM_KEY').remove();
  }

  handleUpdate() {
    var updates = {};
    updates['/id'] = 1;
    updates['/title'] = 'Apple';

    return this.props.db.database().ref('items').child('ITEM_KEY').update(updates);
  }

  handleChange(e){
      this.setState({
        name: e.target.value
      });
  }

  handleSubmit(e){
    e.preventDefault();
    if (this.state.name.length > 1){
      let dbCon = this.props.db.database().ref('/lessons');
      dbCon.push({
          lecture_name: trim(this.state.name)
      });

      this.setState({
        name: ''
      });

      this.handleClose();
    }
  }

  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  render() {
    const { classes, onClose, selectedValue, test, ...other } = this.props;
    return (
      <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
        <DialogTitle>Add New Lesson</DialogTitle>
        <div>
          <Paper>
            <TextField
              style={{width: '95%', margin: '5px'}}
              label="Insert new lesson name"
              value= {this.state.name}
              onChange= {this.handleChange}
            />
            <Button color="primary" onClick={this.handleSubmit} fullWidth={true}>Submit</Button>
          </Paper>
        </div>
      </Dialog>
    );
  }
}

AddLessonDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
};

export default AddLessonDialog;
