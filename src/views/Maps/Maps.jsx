import React from "react";
import firebase from "firebase";
import { LessonList, RegularCard } from "components";

import _ from 'lodash';

class Maps extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      listOfLessons: [],
      nextLessonIndex: 0
    }
  }

  componentDidMount() {
        let app = firebase.database().ref('lessons');
        app.on('value', snapshot => {
          this.getLessonData(snapshot.val());
        });
    }

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
        listOfLessons: lessons,
        nextLessonIndex: lessons.length
      });
  }

  render(){
    // alert("from maps:"+this.state.listOfLessons);
    return (
      <div style= {{flex: 1, flexDirection: 'row'}}>
      <RegularCard
        plainCard={true}
        fullWidth= {true}
        cardTitle= "Video Analytics"
        headerColor="red"
        content={
        <div><LessonList db={firebase} listOfLessons={this.state.listOfLessons} nextLessonIndex={this.state.nextLessonIndex} /></div>
        }
        />
      </div>
    );
  }
}

export default Maps;
