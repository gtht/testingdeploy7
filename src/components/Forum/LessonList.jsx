import React from 'react';
import Message from './Message'

import { Paper, MenuItem, ListSubheader, MenuList, Grid } from 'material-ui';
import { ContentCopy, Warning, Chat, ChatBubble, Comment } from "material-ui-icons";

import { AddLessonDialog, QnA, StatsCard, ItemGrid } from "components";

class LessonList extends React.Component {
  constructor(props){
    super(props);

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
    this.myFunction = this.myFunction.bind(this);

    this.state  = {
      openDialog: false,
      selectedLesson: null,
      selectedIndex: null,
      openQnA: false,
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

  render(){
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

    // to show & hide MessageList & MessageBox
    const isOpen = this.state.openQnA;

    const msg = isOpen ? (
        <div>
          <QnA
            db={this.props.db}
            selectedLesson={this.state.selectedLesson}
            selectedIndex={this.state.selectedIndex}
          />
        </div>
      ) : (
        <div>Pick a lesson to begin</div>
      );
    // end of show/hide Messages method

    return (
      <div>
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
            nextLessonIndex={this.props.nextLessonIndex}
            db={this.props.db}
            open={this.state.openDialog}
            onClose={this.handleClose}
          />
          <div>
              <StatsCard
                icon={ChatBubble}
                iconColor="blue"
                title={"Total"+" posts"}
                description= {this.props.listOfLessons.length}
                small="Lessons"
                statIcon={Comment}
                statIconColor="info"
                statText="average posts per lesson:"
              />
          </div>
          </div>
          <div style= {{flex: 0.8, right: 0,
                        marginRight: 15,
                        marginTop: 10,
                        width: '75%',
                        float: 'right'}}
          >
            {msg}
          </div>
        </div>

      </div>
    );
  }
}

export default LessonList;
