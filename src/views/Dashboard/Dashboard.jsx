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
  ItemGrid,
  MessageContents
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
  Legend,
  Treemap,
  RadialBarChart,
  RadialBar
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

class Dashboard extends React.Component {

  constructor(props){
      super(props);
      this.state= {
       assignmentsSubmissionPie : {},
       assignmentTable :[],
       //youtubeTable : [],
       //youtubeChart : {},
       userActivity : {},
       assignmentTreemap : {},
       unsubmittable_rank: [],
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
  var path1= defaultPath.child('FFFFFFF_AssignmentPercentage_Pie/');
  var path2= defaultPath.child('FFFFFFF_AssignmentPercentage_table/');
  var path3= defaultPath.child('FFFFFFF_AssignmentUnsubmit_Treemap/');
  var path4= defaultPath.child('FFFFFFF_AssignmentUnsubmit_Table/');
  //var path5= defaultPath.child('ShudanWeaknessTeacherTable-head/');
  var path6= defaultPath.child('ShudanWeaknessTeacherTable-table/');
  var path7= defaultPath.child('FFFFFFF_UserActivity_Line/');

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
        assignmentsSubmissionPie: messages
      });
    }

       if (num==2){
      this.setState({
        assignmentTable: messages
      });
    }

        if (num==3){
      this.setState({
        assignmentTreemap: messages
      });
    }

    if (num==4){
      this.setState({
        unsubmittable_rank: messages
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
        userActivity: messages
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
          <ItemGrid xs={6} sm={6} md={6}>
            <RegularCard
              headerColor="orange"
              cardTitle="Percentage of Assignment Completion"
              cardSubtitle={
                <span>
                {" "}
                An overview of the <b>percentage of submissions</b> received for each assignment
                </span>}
              statIcon={AccessTime}
              statText="updated 4 minutes ago"
              content = {
                <div style={{maxHeight:'400px'}}>
                <RadialBarChart
                  width={1100}
                  height={400}
                  cx={190}
                  cy={190}
                  innerRadius={20}
                  outerRadius={200}
                  barSize={15}
                  data={this.state.assignmentsSubmissionPie}
                >
                  <RadialBar
                    minAngle={1}
                    label={{ position: 'insideStart', fill: '#fff' }}
                    background
                    clockWise={true}
                    dataKey='uv'/>
                  <Legend
                    iconSize={20}
                    width={300}
                    height={400}
                    layout='vertical'
                    verticalAlign='middle'
                  />
                  <Tooltip />
                </RadialBarChart>
                </div>
              }
            />
          </ItemGrid>
          <ItemGrid xs={6} sm={6} md={6}>
            <RegularCard
              headerColor="orange"
              cardTitle="List of Assignment Completion"
              cardSubtitle="Used in conjunction with the Percentage of Assignment Completion chart; An overview list of assignments & its no. of submissions received to-date"
              content={
                <div style={{maxHeight:'400px', overflow: 'auto'}}>
                <Table
                  tableHeaderColor="warning"
                  tableHead={['AssignmentID', "Assignment Name", "% of Completion"]}
                  tableData={this.state.assignmentTable}
                  />
                </div>
              }
            />
          </ItemGrid>
          <ItemGrid xs={100} sm={100} md={12}>
            <RegularCard
              headerColor="green"
              cardTitle="User Activity"
              cardSubtitle={"Tracks user activities & assignment submissions over a period of time"}
              statIcon={AccessTime}
              statText="updated 4 minutes ago"
              content = {
                <LineChart width={1300} height={400} data={this.state.userActivity}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="NumOfActiveUsers" stroke="#8884d8" />
                  <Line type="monotone" dataKey="NumOfAssignSub" stroke="#82ca9d" />
                  </LineChart>
              }
            />
          </ItemGrid>
          <ItemGrid xs={8} sm={8} md={8}>
            <RegularCard
              headerColor="red"
              cardTitle="Assignments Not Completed TreeMap"
              cardSubtitle="The more assignments unsubmitted, the bigger area of the student"
              content={
                <div>
                  <p>a</p>
                </div>
              }
            />
          </ItemGrid>

          <ItemGrid xs={4} sm={4} md={4}>

            <RegularCard
              headerColor="red"
              cardTitle="Assignments Not Completed Table"
              cardSubtitle="Use together with the treemap, rank all students with the number of unsubmitted assignments"
              content={
                <div
                  style = {{maxHeight:'400px', overflow:'auto'}}>
                <Table
                  tableHeaderColor="warning"
                  tableHead={["Student Name", "Assignments Not Completed"]}
                  tableData={this.state.unsubmittable_rank }
                />
                </div>
              }
            />
          </ItemGrid>
        </Grid>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={12}>
          <RegularCard
            plainCard={true}
            headerColor="purple"
            cardTitle="Text Analytics"
            cardSubtitle="An analysis of the open-ended/short-answer questions"
            content={
              <MessageContents />
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
