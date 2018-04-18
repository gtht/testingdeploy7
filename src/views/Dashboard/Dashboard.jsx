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
    // SAMPLE DATA FROM RECHART SAMPLE CHARTS
    const { root, depth, x, y, width, height, index, payload, colors, rank, name } = this.props;
    const data = [
          {
            name: 'axis',
            children: [
              { name: 'Axes', size: 1302 },
              { name: 'Axis', size: 24593 },
              { name: 'AxisGridLine', size: 652 },
              { name: 'AxisLabel', size: 636 },
              { name: 'CartesianAxes', size: 6703 },
            ],
          },
          {
            name: 'controls',
            children: [
              { name: 'AnchorControl', size: 2138 },
              { name: 'ClickControl', size: 3824 },
              { name: 'Control', size: 1353 },
              { name: 'ControlList', size: 4665 },
              { name: 'DragControl', size: 2649 },
              { name: 'ExpandControl', size: 2832 },
              { name: 'HoverControl', size: 4896 },
              { name: 'IControl', size: 763 },
              { name: 'PanZoomControl', size: 5222 },
              { name: 'SelectionControl', size: 7862 },
              { name: 'TooltipControl', size: 8435 },
            ],
          },
          {
            name: 'data',
            children: [
              { name: 'Data', size: 20544 },
              { name: 'DataList', size: 19788 },
              { name: 'DataSprite', size: 10349 },
              { name: 'EdgeSprite', size: 3301 },
              { name: 'NodeSprite', size: 19382 },
              {
                name: 'render',
                children: [
                  { name: 'ArrowType', size: 698 },
                  { name: 'EdgeRenderer', size: 5569 },
                  { name: 'IRenderer', size: 353 },
                  { name: 'ShapeRenderer', size: 2247 },
                ],
              },
              { name: 'ScaleBinding', size: 11275 },
              { name: 'Tree', size: 7147 },
              { name: 'TreeBuilder', size: 9930 },
            ],
          },
          {
            name: 'events',
            children: [
              { name: 'DataEvent', size: 7313 },
              { name: 'SelectionEvent', size: 6880 },
              { name: 'TooltipEvent', size: 3701 },
              { name: 'VisualizationEvent', size: 2117 },
            ],
          },
          {
            name: 'legend',
            children: [
              { name: 'Legend', size: 20859 },
              { name: 'LegendItem', size: 4614 },
              { name: 'LegendRange', size: 10530 },
            ],
          },
          {
            name: 'operator',
            children: [
              {
                name: 'distortion',
                children: [
                  { name: 'BifocalDistortion', size: 4461 },
                  { name: 'Distortion', size: 6314 },
                  { name: 'FisheyeDistortion', size: 3444 },
                ],
              },
              {
                name: 'encoder',
                children: [
                  { name: 'ColorEncoder', size: 3179 },
                  { name: 'Encoder', size: 4060 },
                  { name: 'PropertyEncoder', size: 4138 },
                  { name: 'ShapeEncoder', size: 1690 },
                  { name: 'SizeEncoder', size: 1830 },
                ],
              },
              {
                name: 'filter',
                children: [
                  { name: 'FisheyeTreeFilter', size: 5219 },
                  { name: 'GraphDistanceFilter', size: 3165 },
                  { name: 'VisibilityFilter', size: 3509 },
                ],
              },
              { name: 'IOperator', size: 1286 },
              {
                name: 'label',
                children: [
                  { name: 'Labeler', size: 9956 },
                  { name: 'RadialLabeler', size: 3899 },
                  { name: 'StackedAreaLabeler', size: 3202 },
                ],
              },
              {
                name: 'layout',
                children: [
                  { name: 'AxisLayout', size: 6725 },
                  { name: 'BundledEdgeRouter', size: 3727 },
                  { name: 'CircleLayout', size: 9317 },
                  { name: 'CirclePackingLayout', size: 12003 },
                  { name: 'DendrogramLayout', size: 4853 },
                  { name: 'ForceDirectedLayout', size: 8411 },
                  { name: 'IcicleTreeLayout', size: 4864 },
                  { name: 'IndentedTreeLayout', size: 3174 },
                  { name: 'Layout', size: 7881 },
                  { name: 'NodeLinkTreeLayout', size: 12870 },
                  { name: 'PieLayout', size: 2728 },
                  { name: 'RadialTreeLayout', size: 12348 },
                  { name: 'RandomLayout', size: 870 },
                  { name: 'StackedAreaLayout', size: 9121 },
                  { name: 'TreeMapLayout', size: 9191 },
                ],
              },
              { name: 'Operator', size: 2490 },
              { name: 'OperatorList', size: 5248 },
              { name: 'OperatorSequence', size: 4190 },
              { name: 'OperatorSwitch', size: 2581 },
              { name: 'SortOperator', size: 2023 },
            ],
          }
        ];

const COLORS = ['#8889DD', '#9597E4', '#8DC77B', '#A5D297', '#E2CF45', '#F8C12D'];
            // END OF SAMPLE DATA
    return (
      <div>
        <Grid container>
          <ItemGrid xs={100} sm={100} md={6}>
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
              }
            />
          </ItemGrid>
          <ItemGrid xs={100} sm={100} md={6}>
            <RegularCard
              headerColor="orange"
              cardTitle="List of Assignment Completion"
              cardSubtitle="An overview of a list of assignments & the no. of submissions"
              content={
                <div style={{maxHeight:'400px', overflow: 'auto'}}>
                <Table
                  tableHeaderColor="warning"
                  tableHead={['AssignmentID', "Assignment", "Completeness"]}
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
                  <Treemap
                    width={800}
                    height={400}
                    data={data}
                    dataKey="size"
                    ratio={4/3}
                    stroke="#fff"
                    fill="#8884d8"
                    // content={
                      // <g>
                      //   <rect
                      //     x={x}
                      //     y={y}
                      //     width={width}
                      //     height={height}
                      //     style={{
                      //       fill: depth < 2 ? colors[Math.floor(index / root.children.length * 6)] : 'none',
                      //       stroke: '#fff',
                      //       strokeWidth: 2 / (depth + 1e-10),
                      //       strokeOpacity: 1 / (depth + 1e-10),
                      //     }}
                      //   />
                      //   {
                      //     depth === 1 ?
                      //     <text
                      //       x={x + width / 2}
                      //       y={y + height / 2 + 7}
                      //       textAnchor="middle"
                      //       fill="#fff"
                      //       fontSize={14}
                      //     >
                      //       {name}
                      //     </text>
                      //     : null
                      //   }
                      //   {
                      //     depth === 1 ?
                      //     <text
                      //       x={x + 4}
                      //       y={y + 18}
                      //       fill="#fff"
                      //       fontSize={16}
                      //       fillOpacity={0.9}
                      //     >
                      //       {index + 1}
                      //     </text>
                      //     : null
                      //   }
                      // </g>
                  // }
                />
                </div>
              }
            />
          </ItemGrid>

          <ItemGrid xs={4} sm={4} md={4}>

            <RegularCard
              headerColor="red"
              cardTitle="Assignments Not Completed Table"
              cardSubtitle="Use together with the treemap, rank all students with the number of unsubmitted assignments currently."
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
            cardSubtitle="An analysis of short-answer questions"
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
