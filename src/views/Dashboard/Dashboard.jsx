import React from "react";
import PropTypes from "prop-types";
import _ from 'lodash';
import firebase from "firebase";

import { VictoryChart,
  VictoryBoxPlot,
  VictoryAxis,
  VictoryVoronoiContainer } from "victory";

import {  AccessTime } from "material-ui-icons";

import { withStyles, Grid } from "material-ui";

import {
  RegularCard,
  Table,
  ItemGrid,
  TextA
} from "components";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  RadialBarChart,
  RadialBar
} from "recharts";

import dashboardStyle from "variables/styles/dashboardStyle";

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
today = dd+'/'+mm+'/'+yyyy+ ' ' + hh + ':'+min;

class Dashboard extends React.Component {

  constructor(props){
      super(props);
      this.state= {
       assignmentsSubmissionPie : {},
       assignmentTable :[],
       time_chart : [],
       userActivity : {},
       assignmentTreemap : {},
       unsubmittable_rank: [],
       finalTable : [],
       xaxisLabel : " ",
       yaxisLabel : " "
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
  var path6= defaultPath.child('FFFFFFF_AssignmentTakingTime_Chart_data1ist/');
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
    var messages = _(messagesVal)
                      .keys()
                      .map(messageKey => {
                          var cloned = _.clone(messagesVal[messageKey]);
                          cloned.key = messageKey;
                          return cloned;
                      })
                      .value();

      if (num===1){
      this.setState({
        assignmentsSubmissionPie: messages
      });
    }

       if (num===2){
      this.setState({
        assignmentTable: messages
      });
    }

        if (num===3){
      this.setState({
        assignmentTreemap: messages
      });
    }

    if (num===4){
      this.setState({
        unsubmittable_rank: messages
      });
    }

    if (num===6){
      this.setState({
        time_chart: messages
      });
    }

     if (num===7){
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
          <ItemGrid xs={7} sm={7} md={7}>
            <RegularCard
              headerColor="orange"
              cardTitle="Percentage of Assignment Completion"
              cardSubtitle="An overview of the amount of submissions received for each assignment, reviewing the progress of the class."
              statIcon={AccessTime}
              statText="updated 4 minutes ago"
              content = {
                <div style={{maxHeight:'400px'}}>
                <RadialBarChart
                  width={1100}
                  height={400}
                  cx={200}
                  cy={200}
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
          <ItemGrid xs={5} sm={5} md={5}>
            <RegularCard
              headerColor="orange"
              cardTitle="List of Assignment Completion"
              cardSubtitle="Complements the Percentage of Assignment Completion chart; An overview list of assignments & its no. of submissions received to-date."
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
          <ItemGrid xs={8} sm={8} md={8}>
            <RegularCard
              headerColor="blue"
              cardTitle="Time Taken To Complete Assignments"
              cardSubtitle="An summary of the Minimum, Maximum, and the Quartiles 1 & 3 of the amount of time taken for all students to complete each assignment, showing the doability of each assignment. "
              statIcon={AccessTime}
              statText="updated 4 minutes ago"
              content = {
                <div style={{height:'400px', margin: '-40px'}}>
                  <VictoryChart domainPadding={{x:10, y:10}}
                  containerComponent={<VictoryVoronoiContainer/>}>
                    <VictoryBoxPlot
                      medianLabels
                      q3Labels
                      boxWidth={10}
                      whiskerWidth={5}
                      data={this.state.time_chart}
                      style={{
                        min: { stroke: "#32CD32", strokeWidth: 3 },
                        max: { stroke: "red", strokeWidth: 3 },
                        q1: { fill: "#3CB371" },
                        q3: { fill: "orange" },
                        median: { stroke: "white", strokeWidth: 2 }
                      }}
                    />
                    <VictoryAxis
                      style={{
                        ticks: { stroke: "grey", size: 5},
                        tickLabels: {fontSize: 10, padding: 10, angle: -40 }
                      }}/>
                    <VictoryAxis dependentAxis
                      label="Time taken (days)"
                      style={{
                        axis: {stroke: "#000000"},
                        axisLabel: {fontSize: 10, padding: 25},
                        ticks: { stroke: "grey", size: 5},
                        tickLabels: {fontSize: 10, padding: 5}
                      }}/>
                  </VictoryChart>
                  </div>
              }
            />
            <RegularCard
              headerColor="green"
              cardTitle="User Activity"
              cardSubtitle={"Tracks user activeness in the Achievement App as well as assignment submissions over a week"}
              content={
                <LineChart width={600} height={480} data={this.state.userActivity}
                    margin={{ top: 5, right: 40, left: 0, bottom: 5 }}>
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
          <ItemGrid xs={4} sm={4} md={4}>

            <RegularCard
              headerColor="red"
              cardTitle="Student Ranking in terms of Incomplete Assignments"
              cardSubtitle="A list of students & their amount of incomplete assignments, ranked in descending order; Top ranked are likely to be struggling to complete their assingments."
              content={
                <div
                  style = {{maxHeight:'863px', overflow:'auto'}}>
                <Table
                  tableHeaderColor="warning"
                  tableHead={["Student Name", "No. of Assignments Not Completed"]}
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
            cardSubtitle="The analysis of the open-ended/short-answer reponses"
            content={
              <TextA />
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
