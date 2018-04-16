import React from "react";
import firebase from "firebase";
import { RegularCard, MessageList, MessageBox, ChartCard, Muted, ItemGrid } from "components";
import { AccessTime } from "material-ui-icons";
import _ from 'lodash';
import WordCloud from 'react-d3-cloud';
import { Grid } from "material-ui";

class QnAa extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      listOfMessages: [],
      worddata: [],
    }
    this.myFunction2 = this.myFunction2.bind(this);
  }

  componentDidMount() {
    alert("videoKey:"+this.props.videoKeys);
    alert("selectedIndex:"+this.props.selectedIndex);
    // Final_YouTubeUI_DataRetrieving/-L7gqLshklhgvaUoSqIl/responses
      let msg = firebase.database().ref('lessons/lecture'+(this.selectedIndex+1)+'/messages');
      msg.on('value', snapshot => {
        this.getMessageData(snapshot.val());
      });
  }

    // componentShouldUpdate(){
    //
    //     alert("videoKey:"+this.props.videoKeys);
    //     alert("selectedIndex:"+this.props.selectedIndex);
    //     let msg = firebase.database().ref('Final_YouTubeUI_DataRetrieving/'+(this.props.videoKeys[0])+'/responses');
    //     msg.on('value', snapshot => {
    //       this.getMessageData(snapshot.val());
    //     });
    // }

    getMessageData(values){
      let messagesVal = values;   // this is an Object
      alert("msgVal="+messagesVal);
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
      this.state.listOfMessages.map((message) => {
        var title = message.title;
        var words = title.split(" ");
        for (var j=0; j<words.length; j++){
          var word = words[j].replace(/[^a-zA-Z 0-9]+/g,"").toUpperCase();
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

    const { selectedLesson, selectedIndex, videoKeys, listOfLessons, ...other } = this.props;
    alert("from QnA:"+this.props.videoKeys);

    const data2 = this.state.worddata;
    // const excludeWord = ["i", "you", "it", "he", "she"];
    const fontSizeMapper = word => Math.log2(word.value*2) * 10;
    // let resolved = 0;
    // if (this.state.listOfMessages.length > 0){
    //   for (var i=0; i<this.state.listOfMessages.length; i++){
    //     // alert(this.state.listOfMessages[i]);
    //     if (this.state.listOfMessages[i].solved == true){
    //       // alert("true");
    //       resolved++;
    //     }
    //   }
    // }
    return (

      <div style= {{flex: 1, flexDirection: 'row'}}>
        <RegularCard
          fullWidth= {true}
          cardTitle= "Frequent Words Submitted"
          headerColor="green"
          content={
            <div>
              <WordCloud
                width={1000}
                height={200}
                data={data2}
                fontSizeMapper={fontSizeMapper}
              />
            </div>
          }
        />
        <RegularCard
          fullWidth= {true}
          cardTitle= "Top 5 Answers"
          content={
          <MessageList db={firebase} selectedIndex={this.props.selectedIndex} listOfMessages={this.state.listOfMessages} />
          }
        />
      </div>
    );
  }
}

export default QnAa;
