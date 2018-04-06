import React from "react";
import firebase from "firebase";
import { RegularCard, MessageList, MessageBox } from "components";
import _ from 'lodash';

class QnAa extends React.Component {
  constructor(props){
    super(props);

    let app = this.props.db.database().ref('lessons/lecture'+(this.props.selectedIndex+1)+'/messages');
    app.on('value', snapshot => {
      this.getData(snapshot.val());
    });
  }

  getData(values){
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
        lessons: lessons
      });

  }

  render(){
    const { classes, onClose, selectedLesson, selectedIndex, ...other } = this.props;
    return (
      <div style= {{flex: 1, flexDirection: 'row'}}>
        <div style= {{flex: 0.7, float: 'left', left: 0, marginLeft: 15, width:'70%'}}>
        <RegularCard
          fullWidth= {true}
          cardTitle= {this.props.selectedLesson.lecture_name}
          content={
          <MessageList db={firebase} selectedIndex={this.props.selectedIndex} /> }
        />
        </div>
        <div style= {{flex: 0.3, right: 0, marginRight: 15, marginTop: 7, width: '25%', float: 'right'}}>
          <MessageBox db={firebase} selectedIndex={this.props.selectedIndex} />
        </div>
      </div>
    );
  }
}

export default QnAa;
