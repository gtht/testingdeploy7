import React, {Component} from 'react';
import Message from './Message'
import firebase from "firebase";
import _ from 'lodash';

import { Paper,
          MenuItem,
          ListSubheader,
          MenuList } from 'material-ui';

import { AddLessonDialog, QnA } from "components";

// If you want to program functionally and you need to deal with lots of arrays
// as well as objects then in javascript you should definitely use this library.
// It is quite a famous library inFunctional JavaScript Programming.

class LessonList extends Component {
  constructor(props){
    super(props);

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
    // In the constructor, I am using the database reference to call the Firebase
    // server reference to get the messages data. It will return a Promise, and when
    // It resolves, we get our data. Here the URL or Reference for the Firebase is
    // ‘/messages.’ Messages are one of the nodes of firebase, and we are getting
    // all of its children as data.
    this.state  = {
      listOfLessons: [],
      openDialog: false,
      selectedLesson: null,
      selectedIndex: null,
      openQnA: false,
      nextIndex: 0
    }

    let app = this.props.db.database().ref('lessons');
    app.on('value', snapshot => {
      this.getLessonData(snapshot.val());
    });
  }

  //for Dialog
  handleClickOpen = () => {
    this.setState({
      openDialog: true
    });
  };

  handleClose = value => {
    this.setState({ openDialog: false });
  };

  handleMenuItemClick = (event, index, lesson) => {
    this.setState({ selectedIndex: index, openQnA: true, selectedLesson: lesson });
    let msg = this.props.db.database().ref('lessons/lecture1/messages');
    msg.on('value', snapshot => {
      this.getMsgData(snapshot.val());
    });
  };

  //retrieve data from Firebase
  getLessonData(values){
    let messagesVal = values;   // this is an Object
    let lessons = _(messagesVal)
                      .keys()
                      .map(messageKey => {
                          let cloned = _.clone(messagesVal[messageKey]);
                          cloned.key = messageKey;
                          return cloned;
                      })
                      .value();
      //stores array of Objects into lessons state
      this.setState({
        listOfLessons: lessons
      });
      this.setState({
        nextIndex: this.state.listOfLessons.length
      });
  }

  getMsgData(values){
    let messagesVal = values;   // this is an Object
    let lessons = _(messagesVal)
                      .keys()
                      .map(messageKey => {
                          let cloned = _.clone(messagesVal[messageKey]);
                          cloned.key = messageKey;
                          return cloned;
                      })
                      .value();
    alert("MessageData="+lessons);
      //stores array of Objects into lessons state

  }
  // Finally, iterate an array and put the value in Message component as a
  // property and Message component displays the messages
  render(){
    let messageNodes = this.state.listOfLessons.map((lesson, index) => {
      return (
        <MenuItem
          key={lesson}
          selected={index === this.state.selectedIndex}
          onClick={event => this.handleMenuItemClick(event, index, lesson)}
        >
          <Message message = {lesson.lecture_name} />
        </MenuItem>
      )
    });

    const isLoggedIn = this.state.openQnA;

    const msg = isLoggedIn ? (
        <div><QnA db={firebase} selectedLesson={this.state.selectedLesson} selectedIndex={this.state.selectedIndex} /></div>
      ) : (
        <div>Pick a lesson to begin</div>
      );

    return (
      <div style= {{flex: 1, flexDirection: 'row'}}>
        <div style= {{flex: 0.2, float: 'left', left: 0, marginLeft: 15, width:'20%'}}>
        <Paper style={{padding: '5px'}}>
        <ListSubheader>Lessons:</ListSubheader>
          <MenuList>
            {messageNodes}
            <MenuItem onClick={this.handleClickOpen}>+Add New Lesson</MenuItem>
          </MenuList>
        </Paper>
        <AddLessonDialog
          nextIndex={this.state.nextIndex}
          db={firebase}
          open={this.state.openDialog}
          onClose={this.handleClose}
        />
        </div>
        <div
          style= {{flex: 0.8, right: 0,
                      marginRight: 15,
                      marginTop: 10,
                      width: '75%',
                      float: 'right'}}
        >
          {msg}
        </div>

      </div>
    );
  }
}

export default LessonList;
