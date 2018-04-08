import React from "react";
import firebase from "firebase";
import { RegularCard, MessageList, MessageBox, ChartCard, Muted } from "components";
import { AccessTime } from "material-ui-icons";
import _ from 'lodash';
import WordCloud from 'react-d3-cloud';

class QnAa extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      listOfMessages: [],
      worddata: []
    }
    this.myFunction2 = this.myFunction2.bind(this);
  }

  componentDidMount() {
      let msg = firebase.database().ref('lessons/lecture'+(this.props.selectedIndex+1)+'/messages');
      msg.on('value', snapshot => {
        this.getMessageData(snapshot.val());
      });
    }

    getMessageData(values){
      let messagesVal = values;   // this is an Object
      let messages = _(messagesVal)
                        .keys()
                        .map(messageKey => {
                            let cloned = _.clone(messagesVal[messageKey]);
                            cloned.key = messageKey;
                            return cloned;
                        })
                        .value();
        //stores array of Objects into lessons state
        this.setState({listOfMessages: messages}, this.myFunction2);
    }

    myFunction2 = () => {
      var titles = [];
      var dict = [];
      var array1 = [1, 4, 9, 16];
      this.state.listOfMessages.map((message) => {
        var title = message.title;
        var words = title.split(" ");
        for (var j=0; j<words.length; j++){
          var word = words[j].replace(/[^a-zA-Z 0-9]+/g,"");
          var index = titles.indexOf(word);
          // alert(index);
          if (index > -1){
            // alert("repetitive"+dict[index][1]);
            dict[index] = [word, (dict[index][1]+1)];
          } else {
            titles.push(word);
            dict.push([word, 1]);
          }
        }
      });
      var d = [];
      for (var i=0; i<dict.length; i++){
        d.push({ text: dict[i][0], value: dict[i][1] });
      }
      this.setState({ worddata: d }, this.myFunction3);
    }

    myFunction3 = () => {
      // alert(this.state.worddata);

    }

  render(){
    const { classes, onClose, selectedLesson, selectedIndex, ...other } = this.props;
    const data2 = this.state.worddata;
    // const data = [
    //   { text: 'Hey', value: 10 },
    //   { text: 'lol', value: 20 },
    //   { text: 'first impression', value: 2 },
    //   { text: 'very cool', value: 10 },
    //   { text: 'duck', value: 10 },
    // ];
    const fontSizeMapper = word => Math.log2(word.value*5) * 10;

    return (

      <div style= {{flex: 1, flexDirection: 'row'}}>
        <div style= {{flex: 0.7, float: 'left', left: 0, marginLeft: 15, width:'70%'}}>
        <RegularCard
          fullWidth= {true}
          cardTitle= {this.props.selectedLesson.lecture_name}
          content={
          <MessageList db={firebase} selectedIndex={this.props.selectedIndex} listOfMessages={this.state.listOfMessages} /> }
        />
      </div>
        <div style= {{flex: 0.3, right: 0, marginRight: 15, marginTop: 7, width: '25%', float: 'right'}}>
        <MessageBox db={firebase} selectedIndex={this.props.selectedIndex} />
        <div style= {{
          padding: '20px 15px',
          lineHeight: '20px',
          position: "relative",
          marginBottom: "10px",
          backgroundColor: "white",
          color: "#555555",
          borderRadius: "3px",
          boxShadow:
          "0 12px 20px -10px rgba(255, 255, 255, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(255, 255, 255, 0.2)"}}>

          <Muted style={{padding: '10px'}}>Total Posts:<b style={{ float:'right'}}>{this.state.listOfMessages.length}</b></Muted><hr/>
          <Muted style={{padding: '10px'}}>Common Words:</Muted>
            <WordCloud style={{border: '1px solid blue'}}
              width={200}
              height= {200}
              data={data2}
              fontSizeMapper={fontSizeMapper}
            />

        </div>
        </div>
      </div>
    );
  }
}

export default QnAa;
