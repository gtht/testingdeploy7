import React from 'react';
import Message from './Message'
import _ from 'lodash';

import { Paper, MenuItem, ListSubheader, MenuList, Grid } from 'material-ui';
import { Feedback, Chat, ChatBubble, Comment, Class } from "material-ui-icons";

import { AddLessonDialog, QnA, StatsCard, ItemGrid } from "components";

class LessonList extends React.Component {
  constructor(props){
    super(props);

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
    this.myFunction = this.myFunction.bind(this);
    // this.myFunction4 = this.myFunction4.bind(this);
    //
    // this.myFunction5 = this.myFunction5.bind(this);

    this.state  = {
      openDialog: false,
      selectedLesson: this.props.listOfLessons[0],
      selectedIndex: 0,
      openQnA: true,
      msgCount: 0
    }

  }

  // for Dialog
  handleClickOpen = () => {
    this.setState({
      openDialog: true
    });
  };

  handleClose = value => {
    this.setState({ openDialog: false });
  };
  // end of Dialog methods

  // for Lessons sidebar
  handleMenuItemClick = (event, index, lesson) => {
    this.setState({ selectedIndex: index, openQnA: false, selectedLesson: lesson }, this.myFunction);
  };
  // end of sidebar method

  // refresh QnA component
  myFunction = () => {
    this.setState({ openQnA: true });
  }
  // end of QnA method

  //
  // myFunction4 = () => {
  //   alert("test2");
  //
  //   this.setState({msgCount: total}, this.myFunction5);
  // }
  //
  // myFunction5 = () => {
  //   alert(this.state.msgCount);
  // }

  render(){
    // if(this.props.listOfLessons.length >0 ){
    //   alert(this.props.listOfLessons[0].lecture_name);
    // }
    // alert("test1");
    let messageNodes = this.props.listOfLessons.map((lesson, index) => {

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
    let highestCount = 0;
    let mostPost = "";
    let total = 0;
    if (this.props.listOfLessons.length > 0){
      // const totalCounter = 0;
      for (var i=0; i<this.props.listOfLessons.length; i++){
        // alert("lessonlist"+ this.props.listOfLessons[i].lecture_name);
        var counter = 0; // length of messages for one lesson
        for (var key in this.props.listOfLessons[i].messages){
          // alert(key);
          counter++;
        }
        if (counter>highestCount){highestCount = counter; mostPost = this.props.listOfLessons[i].lecture_name;}
        // alert("counter="+counter);
        total = total + counter;
      }
      // alert("total="+total);
    }
    // const avg = total/this.props.listOfLessons
    // to show & hide MessageList & MessageBox
    // const isOpen = this.state.openQnA;
    //
    // const msg = isOpen ? (
    //     <div>
    //       <QnA
    //         db={this.props.db}
    //         selectedLesson={this.state.selectedLesson}
    //         selectedIndex={this.state.selectedIndex}
    //       />
    //     </div>
    //   ) : (
    //     <div>Pick a lesson to begin</div>
    //   );
    // end of show/hide Messages method

    return (
      <div>
        <div style= {{flex: 1, flexDirection: 'row'}}>
          <div style= {{flex: 0.2, float: 'left', left: 0, marginLeft: 15, width:'20%'}}>
          <Paper style={{padding: '5px'}}>
          <ListSubheader>Videos:</ListSubheader>
            <MenuList>
              {messageNodes}
            </MenuList>
          </Paper>
          <AddLessonDialog
            nextLessonIndex={this.props.nextLessonIndex}
            db={this.props.db}
            open={this.state.openDialog}
            onClose={this.handleClose}
          />
          </div>
          <div style= {{flex: 0.8, right: 0,
                        marginRight: 15,
                        marginTop: 10,
                        width: '75%',
                        float: 'right'}}
          >
            <QnA
              db={this.props.db}
              selectedLesson={this.state.selectedLesson}
              selectedIndex={this.state.selectedIndex}
              />
          </div>
        </div>

      </div>
    );
  }
}

export default LessonList;
