import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
import _ from 'lodash';
import firebase from "firebase";
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
import { withStyles, Grid } from "material-ui";

import {
  StatsCard,
  ChartCard,
  TasksCard,
  RegularCard,
  Table,
  ItemGrid
} from "components";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts";

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

import dashboardStyle from "variables/styles/dashboardStyle";

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


/*<ChartCard 
              chart = {
                <LineChart width={350} height={300} data={this.props.youtubeChart}
                    margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="AWS Lambda Lab - Part 1 (5:55)" stroke="#8884d8" />
                  <Line type="monotone" dataKey="AWS Lambda Lab - Part 2 (7:13)" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="AWS Lambda Lab - Part 3 (7:13)" stroke="#8884d8" />
                  <Line type="monotone" dataKey="AWS Lambda Lab - Part 4 (7:28)" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="AWS Lambda Lab - Part 5 (4:26)" stroke="#8884d8" />
                  <Line type="monotone" dataKey="Introduction to AWS Lambda:" stroke="#8884d8" />
                  <Line type="monotone" dataKey="Introduction to AWS Lambda (video 3:01)" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="Introduction to AWS Lambda (video)" stroke="#8884d8" />
                  <Line type="monotone" dataKey="AWS Lambda Lab - Part 4 (7:28)" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="Real-time Charts Tutorial (video 12:05):" stroke="#8884d8" />
                
                  </LineChart>
              }
              chartColor="green"
              title="Suggested Assignments to Focus on"
              text={"Some text here"}
              statIcon={AccessTime}
              statText="updated 4 minutes ago"
            />*/
            

class Dashboard extends React.Component {
  
  constructor(props){
      super(props);
      this.state= {
       assignmentsLineChart : {},
       assignmentTable :[],
       youtubeTable : [],
       youtubeChart : {},
       activeUsersLineChart : {},
       finalTableheader : [],
       finalTable : [],
        xaxisLabel : " ",
        yaxisLabel : " ",
        finalTable : []
       
      };
    } 
   
   componentWillMount(){
        let yourUrl= "https://nrjbyc2z57.execute-api.ap-southeast-1.amazonaws.com/prod/ccDataUpdate";
        fetch(yourUrl, { mode: "no-cors" }).then(function(response) {
      console.log("Fetched ", yourUrl);
    });
  };

  componentDidMount(){
  const defaultPath = firebase.database().ref();
  var path1= defaultPath.child('ShudanAssignmentChartList1/');
  var path2= defaultPath.child('ShudanYoutubeViewtable/');
  var path3= defaultPath.child('ShudanAssignmentTable/');
  var path4= defaultPath.child('ShudanYoutubeViewChartlist/');
  //var path5= defaultPath.child('ShudanWeaknessTeacherTable-head/');
  var path6= defaultPath.child('ShudanWeaknessTeacherTable-table/');
  var path7= defaultPath.child('ShudanActiveUsers/');

    console.log('from dashboard.jsx');

  path1.on('value',snapshot =>{
      //console.log(snapshot.val());
      this.getData(snapshot.val(), 1);
      
    })
  
  path2.on('value',snapshot =>{
      //console.log(snapshot.val());
      this.getData(snapshot.val(),2);
    
    })
  
  path3.on('value',snapshot =>{
      //console.log(snapshot.val());
      this.getData(snapshot.val(),3);
      
    })
  
  path4.on('value',snapshot =>{
      //console.log(snapshot.val());
      this.getData(snapshot.val(),4);
      
    })
  /*
  path5.on('value',snapshot =>{
      //console.log(snapshot.val());
      this.getData(snapshot.val(),5);
      
    })
    */
  path6.on('value',snapshot =>{
      //console.log(snapshot.val());
      this.getData(snapshot.val(),6);
      
    })
    
   path7.on('value',snapshot =>{
    //console.log(snapshot.val());
    this.getData(snapshot.val(),7);
    
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
        youtubeTable: messages
      });
    }
    
        if (num==3){
      this.setState({
        assignmentTable: messages
      });
    }
    
    if (num==4){
      this.setState({
        youtubeChart: messages
      });
    }
    /*
     if (num==5){
      this.setState({
        finalTableheader: messages
      });
    }
    */
     if (num==6){
      this.setState({
        finalTable: messages
      });
    }
    
     if (num==7){
      this.setState({
        activeUsersLineChart: messages
      });
    }
    

  }


  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  render() {
    return (
      <div>
        <Grid container>
          <ItemGrid xs={100} sm={100} md={10}>
            <RegularCard 
              headerColor="blue"
              cardTitle="Assignment Submission Tracking"
              cardSubtitle={"Track student's submission"}
              statIcon={AccessTime}
              statText="updated 4 minutes ago"
              content = {
                <LineChart width={780} height={400} data={this.state.assignmentsLineChart}
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
            />
          </ItemGrid>


          <ItemGrid xs={8} sm={8} md={5}>
            <RegularCard
              headerColor="orange"
              cardTitle="Youtube Video total Views"
              cardSubtitle="Total views for each youtube video assignment"
              content={
                <Table
                  tableHeaderColor="warning"
                  tableHead={["Assignment Name", "Views"]}
                  tableData={this.state.youtubeTable}
                />
              }
            />

          </ItemGrid>


          <ItemGrid xs={8} sm={8} md={5}>

            <RegularCard
              headerColor="red"
              cardTitle="Overview of Assignments Submitted "
              cardSubtitle="Assignment that took longest to complete at the top"
              content={
                <Table
                  tableHeaderColor="warning"
                  tableHead={["Assignment Name", "No. Students Completed", "Assignment Status"]}
                  tableData={this.state.assignmentTable }
                />
              }
            />
          </ItemGrid>
        </Grid>
        <Grid container>

          <ItemGrid xs={100} sm={100} md={10}>

            <RegularCard 
              content = {
                <LineChart width={780} height={300} data={this.state.activeUsersLineChart}
                    margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                  
                  </LineChart>
              }
              headerColor="green"
              cardTitle="Track the Number of Active users on Achievements App"
              cardSubtitle=""
              statIcon={AccessTime}
              statText="updated 4 minutes ago"
            />
          
            <RegularCard
              headerColor="orange"
              cardTitle="Suggested Assignments to Focus on"
              cardSubtitle="Assignment that took longest to complete at the top"
              content={
                <Table
                  tableHeaderColor="warning"
                  tableHead={["Student's Name", "Assignment 1", "Assignment 2"
                  , "Assignment 3"
                  , "Assignment 4"
                  , "Assignment 5"
                  , "Assignment 6"
                  , "Assignment 7"
                  , "Assignment 8"
                  , "Assignment 9"]}
                  tableData={this.state.finalTable}
                />
              }
            />
          </ItemGrid>
        </Grid>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
