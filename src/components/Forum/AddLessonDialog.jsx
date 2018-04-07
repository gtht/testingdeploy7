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

    this.state = {
      addLessonName: ''
    };
  }

  handleChange(e){
      this.setState({
        addLessonName: e.target.value
      });
  }

  handleSubmit(e){
    e.preventDefault();
    if (this.state.addLessonName.length > 1){
      let dbCon = this.props.db.database().ref('/lessons/lecture'+(this.props.nextLessonIndex+2));
      dbCon.set({
          lecture_name: trim(this.state.addLessonName)
      });

      this.setState({
        addLessonName: ''
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
              value= {this.state.addLessonName}
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
