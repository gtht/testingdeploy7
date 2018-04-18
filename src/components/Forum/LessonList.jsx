import React from 'react';
import Message from './Message'
import _ from 'lodash';

import { Paper, MenuItem, ListSubheader, MenuList, Grid } from 'material-ui';
import { Feedback, Chat, ChatBubble, Comment, Class } from "material-ui-icons";

import { AddLessonDialog, QnA, StatsCard, ItemGrid } from "components";

class LessonList extends React.Component {
  constructor(props){
    super(props);

    // this.handleClickOpen = this.handleClickOpen.bind(this);
    // this.handleClose = this.handleClose.bind(this);
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
    this.myFunction = this.myFunction.bind(this);

    this.state  = {
      new: true,
      selectedLesson: this.props.first,
      selectedIndex: null,
      openQnA: false,
      msgCount: 0
    }

    // this.setState({openQnA: true});

  }

  // for Dialog
  // handleClickOpen = () => {
  //   this.setState({
  //     openDialog: true
  //   });
  // };
  //
  // handleClose = value => {
  //   this.setState({ openDialog: false });
  // };
  // end of Dialog methods

  // for Lessons sidebar
  handleMenuItemClick = (event, index, lesson) => {
    // alert(lesson.key);
    this.setState({ new: false, selectedIndex: index, openQnA: false, selectedLesson: lesson.key }, this.myFunction);
  };
  // end of sidebar method

  // refresh QnA component
  myFunction = () => {
    this.setState({ openQnA: true });
  }

  // end of QnA method

  render(){
  //   if(this.props.listOfLessons.length > 0){
  //   alert(this.props.listOfLessons[0].key);
  // }
    let messageNodes = this.props.listOfLessons.map((lesson, index) => {
      // alert("testrun");
      return (
        <MenuItem
          key={lesson}
          selected={index === this.state.selectedIndex}
          onClick={event => this.handleMenuItemClick(event, index, lesson)}
        >
          <Message message = {lesson.VideoTitle} />
        </MenuItem>
      )
    });
    // let highestCount = 0;
    // let mostPost = "";
    // let total = 0;
    // if (this.props.listOfLessons.length > 0){
    //   // const totalCounter = 0;
    //   for (var i=0; i<this.props.listOfLessons.length; i++){
    //     // alert("lessonlist"+ this.props.listOfLessons[i].lecture_name);
    //     var counter = 0; // length of messages for one lesson
    //     for (var key in this.props.listOfLessons[i].messages){
    //       // alert(key);
    //       counter++;
    //     }
    //     if (counter>highestCount){highestCount = counter; mostPost = this.props.listOfLessons[i].lecture_name;}
    //     // alert("counter="+counter);
    //     total = total + counter;
    //   }
    //   // alert("total="+total);
    // }
    // const avg = total/this.props.listOfLessons
    // to show & hide MessageList & MessageBox
    const isOpen = this.state.openQnA;

    const msg = isOpen ? (
          <QnA
            db={this.props.db}
            selectedLesson={this.state.new ? (this.props.first) : (this.state.selectedLesson)}
            selectedIndex={this.state.selectedIndex}
          />
      ) : (
        <p>Pick an assignment to begin</p>
      );
    // end of show/hide Messages method

    return (
      <Grid container>
        <ItemGrid xs={12} sm={12} md={3}>
            <Paper style={{maxHeight: '600px'}}>
            <ListSubheader>Assignments:</ListSubheader>
              <MenuList>
                {messageNodes}
              </MenuList>
            </Paper>
        </ItemGrid>
        <ItemGrid xs={12} sm={12} md={9}>
            {msg}
        </ItemGrid>
      </Grid>
    );
  }
}

export default LessonList;
