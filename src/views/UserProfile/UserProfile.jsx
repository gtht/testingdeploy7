import React from "react";
import { Grid, InputLabel } from "material-ui";
import _ from 'lodash';
import firebase from "firebase";
import {
  ProfileCard,
  RegularCard,
  Button,
  CustomInput,
  ItemGrid,
  Table
} from "components";

import avatar from "assets/img/faces/marc.jpg";

// for charting:
import {
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

import {
  StatsCard,
  ChartCard
} from "components";

// necessary items for chart cards:
import {
  ContentCopy,
  Store,
  InfoOutline,
  Warning,
  DateRange,
  LocalOffer,
  Update,
  ArrowUpward,
  AccessTime,
  Accessibility
} from "material-ui-icons";

const AxisLabel = ({
  axisType,
  x = 0,
  y = 0,
  width,
  height,
  stroke,
  children
}) => {
  const isVert = axisType === "yAxis";
  const cx = isVert ? x + 20 : x + width / 2;
  const cy = isVert ? height / 2 + y : y + height;
  const rot = isVert ? `270 ${cx} ${cy}` : 0;
  return (
    <text
      x={cx}
      y={cy}
      transform={`rotate(${rot})`}
      textAnchor="middle"
      stroke={stroke}
    >
      {children}
    </text>
  );
};
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var hh = today.getHours();
var min = today.getMinutes();

var yyyy = today.getFullYear();
if(dd<10){
    dd='0'+dd;
} 
if(mm<10){
    mm='0'+mm;
} 
var today = dd+'/'+mm+'/'+yyyy+ ' ' + hh + ':'+min;



class StudentDashboard extends React.Component {
  constructor(props){
      super(props);
      this.state= {
       assignmentsLineChart : {},
       assignmentTable :[],
       weaknesstable :[],
        xaxisLabel : " ",
        yaxisLabel : " "
       
      };
    } 

  // any methods eg handleChange
componentDidMount(){
  const defaultPath = firebase.database().ref();
  var path1= defaultPath.child('ShudanAssignmentChartList1/');
  var path2= defaultPath.child('ShudanStudentProgressTable/');
  var path3= defaultPath.child('ShudanWeaknessStudentTable-yanrongExample/');



  path1.on('value',snapshot =>{
      //console.log(snapshot.val());
      this.getData(snapshot.val(), 1);
      
    })
    path2.on('value',snapshot =>{
      //console.log(snapshot.val());
      this.getData(snapshot.val(), 2);
      
    })

    path2.on('value',snapshot =>{
      //console.log(snapshot.val());
      this.getData(snapshot.val(), 2);
      
    })
  }  

  getData(values, num){
    var messagesVal = values;   // this is an Object
    // iterates thru the 10 Objects
    //alert("messageVal="+messagesVal);
    var messages = _(messagesVal)
                      .keys()
                      .map(messageKey => {
                          var cloned = _.clone(messagesVal[messageKey]);
                          cloned.key = messageKey;
                          return cloned;
                          //alert("messageKey="+messageKey);
                      })
                      .value();

      //alert(typeof messages);
      //alert("messages="+messages    
      if (num==1){
      this.setState({
        assignmentsLineChart: messages
      });
    }
      if (num==2){
      this.setState({
        assignmentTable: messages
      });
    }
      if (num==3){
      this.setState({
        weaknesstable: messages
      });

    }
    

  }

  render() {
    return (
      <div>
        <Grid container>
          <ItemGrid xs={40} sm={20} md={10}>
            <RegularCard 
              content = {
                <LineChart width={800} height={400} data={this.state.assignmentsLineChart}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Real-time Charts Tutorial1" stroke="#8884d8" />
                  <Line type="monotone" dataKey="Real-time Charts Tutorial2" stroke="#82ca9d" />
                  </LineChart>
              }
              headerColor="blue"
              cardTitle="Assignment Submission Tracking"
              cardSubtitle={"Track student's submission"}
              statIcon={AccessTime}
              statText="updated 4 minutes ago"
            />
            <RegularCard
              headerColor="orange"
              cardTitle="Assignment Progress Chart"
              cardSubtitle=""
              content={
                <Table
                  tableHeaderColor="warning"
                  tableHead={["Assignment Name", "Status"]}
                  tableData={this.state.assignmentTable}
                />
              }
            />
            <RegularCard
              headerColor="orange"
              cardTitle="Suggested Assignments to Focus on"
              cardSubtitle=""
              content={
                <Table
                  tableHeaderColor="warning"
                  tableHead={["Assignment Name", "Time Taken to Complete", "Relevant Concepts"]}
                  tableData={this.state.weaknesstable}
                />
              }
            />
          </ItemGrid>
        </Grid>
      </div>
    )
  }
}

export default StudentDashboard;
