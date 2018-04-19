import React from 'react';
import Message from './Message'

import { Paper, MenuItem, ListSubheader, MenuList, Grid } from 'material-ui';

import { Displays, ItemGrid } from "components";

class LessonList extends React.Component {
  constructor(props){
    super(props);

    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
    this.myFunction = this.myFunction.bind(this);

    this.state  = {
      new: true,
      selectedLesson: this.props.first,
      selectedIndex: null,
      openDisplays: false,
      msgCount: 0
    }

  }

  handleMenuItemClick = (event, index, lesson) => {
    this.setState({ new: false, selectedIndex: index, openDisplays: false, selectedLesson: lesson.key }, this.myFunction);
  };

  myFunction = () => {
    this.setState({ openDisplays: true });
  }

  render(){
    let messageNodes = this.props.listOfLessons.map((lesson, index) => {

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

    const isOpen = this.state.openDisplays;

    const msg = isOpen ? (
          <Displays
            db={this.props.db}
            selectedLesson={this.state.new ? (this.props.first) : (this.state.selectedLesson)}
            selectedIndex={this.state.selectedIndex}
          />
      ) : (
        <p>Pick an assignment to view</p>
      );

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
