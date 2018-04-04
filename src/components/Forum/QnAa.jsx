import React from "react";
import firebase from "firebase";
import { RegularCard, MessageList, MessageBox } from "components";

class QnAa extends React.Component {
  
  render(){
    const { classes, onClose, selectedValue, test, ...other } = this.props;
    return (
      <div style= {{flex: 1, flexDirection: 'row'}}>
        <div style= {{flex: 0.7, float: 'left', left: 0, marginLeft: 15, width:'70%'}}>
        <RegularCard
          fullWidth= {true}
          cardTitle="Lecture 1: Introduction"
          content={
          <MessageList db={firebase} /> }
        />
        </div>
        <div style= {{flex: 0.3, right: 0, marginRight: 15, marginTop: 10, width: '25%', float: 'right'}}>
          <MessageBox db={firebase} />
        </div>
      </div>
    );
  }
}

export default QnAa;
