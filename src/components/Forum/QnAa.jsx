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
      arrListOfMsgs: [],
      top5: [],
      selected5: []
    }
    this.wordCloudCalculate = this.wordCloudCalculate.bind(this);
    this.topfiveCalculate = this.topfiveCalculate.bind(this);
  }

  componentDidMount() {
    // lessons/lecture'+(this.props.selectedIndex+1)+'/messages
    // alert(this.props.selectedLesson);
      let msg = firebase.database().ref('Final_YouTubeUI_DataRetrieving/'+this.props.selectedLesson+'/responses');
      msg.on('value', snapshot => {
        this.getMessageData(snapshot.val());
      });
    }

    getMessageData(values){
      let messagesVal = values;   // this is an Object
      // alert(messagesVal);
      let messages = _(messagesVal)
                        .keys()
                        .map(messageKey => {
                            let cloned = _.clone(messagesVal[messageKey]);
                            cloned.key = messageKey;
                            return cloned;
                        })
                        .value();
        //stores array of Objects into lessons state
        this.setState({listOfMessages: messages}, this.wordCloudCalculate);
    }

  wordCloudCalculate = () => {
      var titles = [];
      var dict = [];
      const excludeWord = ["I","YOU","IT","HE","SHE","Q","A","DO","NOT","IS","IN","WE","HOW","INTO",
                            "AND","OR","BY","TO","YOUR","ARE","WHO","WHAT","WHEN","WHERE","WHY","BE",
                            "THEN","SO","AN","THAT","THE","DOES","HAS","HAVE","SHOULD","WOULD","COULD",
                            "ON","US","FOR","THEY","AM", "ITS", "FROM", "BUT", "OF", "WITH", "AS", "OUR",
                            "THERE","CAN","DONT","THIS","THAT","THOSE"];
      var arrListOfMsgs = [];
      this.state.listOfMessages.map((message) => {
        // alert(message.text);
        arrListOfMsgs.push(message.text);
        var title = message.text;
        var words = title.split(" ");
        for (var j=0; j<words.length; j++){
          var word = words[j].replace(/[^a-zA-Z]+/g,"").toUpperCase();
          var index = titles.indexOf(word);
          // alert(index);
          if (index > -1){
            // alert("repetitive"+dict[index][1]);
            dict[index] = [word, (dict[index][1]+1)];
          } else if (excludeWord.indexOf(word) < 0){
            titles.push(word);
            dict.push([word, 1]);
          }
        }
      });
      var d = [];
      var c = [];
      for (var i=0; i<dict.length; i++){
        d.push({ text: dict[i][0], value: dict[i][1] });
      }
      var selected5 = this.topfiveCalculate(d, arrListOfMsgs);
      // alert("inside wordcalculate: "+selected5 );
      this.setState({ worddata: d, arrListOfMsgs: arrListOfMsgs, selected5: selected5}, this.myFunction3);
    }

    myFunction3 = () => {
      // alert(this.state.worddata);

    }

    topfiveCalculate(wordlist, msglist) {
      // sort list of word frequencies in descending order
      wordlist.sort(function(obj1, obj2) {
      	// Descending
      	return obj2.value - obj1.value;
      });
      var selected5 = [];
      var counter = 5;
      var index = 0;
      // alert(msglist.length);
      while (counter > 0 && index < msglist.length){
        // zero = false, all other values = true, for Boolean value
        // alert(msglist[index]);
        // reset score for every new reponse
        var max5score = [];
        var score = 0;
        // find the top 20 words inside of each response
        for (var j=0; j<25; j++){
          // reset tf for each word search
          var tf;
          if (msglist[index].toUpperCase().indexOf(wordlist[j].text) > -1) {
            tf = true;
          } else {
            tf = false;
          }
          // alert(wordlist[j].text+" "+tf);
          score = score + Number(tf);
        }
        if (max5score.length != 5){
          max5score.push();
        } else {

        }
        // alert(score);
        if (score > 8){
          selected5.push(msglist[index]);
          counter--;
        }
        index++;
      }
      // alert(selected5);
      return selected5;
      // alert(list[0].text+" "+list[0].value);
      // alert(list[1].text+" "+list[1].value);
      // alert(list[3].text+" "+list[3].value);
      // alert("list: "+ list);

    }

  render(){
    const { classes, onClose, selectedLesson, selectedIndex, ...other } = this.props;
    const data2 = this.state.worddata;
    // alert(this.state.selected5);
    // // alert("test");
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
      <ItemGrid xs={12} sm={12} md={12}>
        <RegularCard
          fullWidth={true}
          cardTitle= "Most Common Keywords"
          cardSubtitle={"An overview of the most common keywords submitted to this assignment"}
          headerColor="orange"
          content={
              <WordCloud
                width={900}
                height={200}
                data={data2}
                fontSizeMapper={fontSizeMapper}
              />
          }
        />
        <RegularCard
          fullWidth= {true}
          cardTitle= "Top Answers"
          cardSubtitle={"A list of responses that contains the most frequent keywords"}
          headerColor="green"
          content={
          <MessageList db={firebase} selectedIndex={this.props.selectedIndex} selected5={this.state.selected5} />
          }
        />
      </ItemGrid>
    );
  }
}

export default QnAa;
