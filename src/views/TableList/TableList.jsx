import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
import firebase from "firebase";
import _ from 'lodash';
import {
  ContentCopy,Store,InfoOutline,Warning,
  DateRange,LocalOffer,Update,
  ArrowUpward,AccessTime,Accessibility
} from "material-ui-icons";
import { withStyles, Grid } from "material-ui";
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
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  Sector,
  ReferenceLine,
  ReferenceArea,
  ResponsiveContainer
} from "recharts";

import {
  StatsCard,ChartCard,TasksCard,
  RegularCard,Table,ItemGrid

} from "components";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts";

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

//const {PieChart, Pie, Sector} = Recharts;


const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
      <text x={ex + (cos >= 0 ? 1 : -1) * 5} y={ey} textAnchor={textAnchor} fill="#FFFFFF">{`${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 5} y={ey} dy={18} textAnchor={textAnchor} fill="#FFFFFF">
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
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

const avgDailyTimeSpent2 =[ {x : "Friday", y: 110},{x : "thur", y: 100},{x : "wed", y: 90},{x : "tue", y: 80},{x : "mon", y: 70} ];
const avgDailyTimeSpent3 =[ {x : "Friday", y: 110},{x : "thursday", y: 100},{x : "wednesday", y: 90},{x : "tuesday", y: 80},{x : "monday", y: 70},
{x : "Fri", y: 110},{x : "thur", y: 100},{x : "wed", y: 90},{x : "tue", y: 80},{x : "mon", y: 70} ];
var db= firebase;
  //var xaxisLabel = "my x axis";
  //var yaxisLabel = "my y axis";


class Dashboard extends React.Component {

    constructor(props){
      super(props);
      this.state= {
        chartTooLong:{},
        chartTooShort: {},
        pieChartData: {},
        pieActiveIndex : 0,
        listavgDailyTimeSpent : {},
        listdailyNumberOfLevelCompleted :{},
        listMaxDict : {},
        xaxisLabel : " ",
        yaxisLabel : " ",
        tablelist : [],
        scatterAvgX : {},
        scatterAvgY : {},
        scatterData : {},
        topFivePlaytime : [],
        topPerformer : [],
        topTenTime :[],
        fbTimelineData :{},
        scatter2 :{},
        loginTableFinal : [],
        piechartfinal: {},
        value : 0
      };
    }

  //chartData =  [{ name: 'a', value: 5, 12 }];
  //console.log('chartData');
  //componentWillMount

  componentWillMount(){
        let yourUrl= "https://nrjbyc2z57.execute-api.ap-southeast-1.amazonaws.com/prod/ccDataUpdate";
        fetch(yourUrl, { mode: "no-cors" }).then(function(response) {
      console.log("Fetched ", yourUrl);
    });
  };

  componentDidMount(){
  const defaultPath = firebase.database().ref();
  var path1= defaultPath.child('chartTooLong/');
  var path2= defaultPath.child('chartTooShort/');
  var path3= defaultPath.child('pieChartData/');
  var path4= defaultPath.child('listavgDailyTimeSpent/');
  var path5= defaultPath.child('listdailyNumberOfLevelCompleted/');
  var path6= defaultPath.child('tablelist/');
  var path7= defaultPath.child('listMaxDict/');

  var path8= defaultPath.child('scatterAvgX/');
  var path9= defaultPath.child('scatterAvgY/');
  var path10= defaultPath.child('scatterData/');

  var path11= defaultPath.child('topFivePlaytime/');
  var path12= defaultPath.child('topPerformer/');
  var path13= defaultPath.child('topTenTime/');
  var path14= defaultPath.child('topFivePerformer/');
  var path15= defaultPath.child('fbTimelineData/');

  var path16= defaultPath.child('scatter2/');
  var path17= defaultPath.child('loginTableFinal/');
  var path18= defaultPath.child('piechartfinal/');

    console.log('from dashboard.jsx');

  path1.on('value',snapshot =>{
      //console.log(snapshot.val());
      this.getData(snapshot.val(), 1);
      console.log(this.state.chartTooLong);
    })
  path2.on('value',snapshot =>{
      //console.log(snapshot.val());
      this.getData(snapshot.val(),2);
      console.log(this.state.chartTooShort);
    })
  path3.on('value',snapshot =>{
      //console.log(snapshot.val());
      this.getData(snapshot.val(),3);
      console.log(this.state.chartTooShort);
    })

  path4.on('value',snapshot =>{
      //console.log(snapshot.val());
      this.getData(snapshot.val(),4);
      console.log(this.state.avgDailyTimeSpent);
    })

  path5.on('value',snapshot =>{
      //console.log(snapshot.val());
      this.getData(snapshot.val(),5);
      console.log(this.state.chartTooShort);
    })

  path6.on('value',snapshot =>{
      //console.log(snapshot.val());
      this.getData(snapshot.val(),6);
      console.log(this.state.tablelist);
    })
   path7.on('value',snapshot =>{
    //console.log(snapshot.val());
    this.getData(snapshot.val(),7);
    console.log(this.state.listMaxDict);
  })

  path7.on('value',snapshot =>{
    //console.log(snapshot.val());
    this.getData(snapshot.val(),7);
    console.log(this.state.listMaxDict);
  })


  path8.on('value',snapshot =>{
    //console.log(snapshot.val());
    this.getData(snapshot.val(),8);
    console.log(this.state.scatterAvgX);
  })

  path9.on('value',snapshot =>{
    //console.log(snapshot.val());
    this.getData(snapshot.val(),9);
    console.log(this.state.scatterAvgY);
  })

  path10.on('value',snapshot =>{
    //console.log(snapshot.val());
    this.getData(snapshot.val(),10);
    console.log(this.state.scatterData);
  })

   path11.on('value',snapshot =>{
    //console.log(snapshot.val());
    this.getData(snapshot.val(),11);
    console.log(this.state.topFivePlaytime);
  })

   path12.on('value',snapshot =>{
    //console.log(snapshot.val());
    this.getData(snapshot.val(),12);
    console.log(this.state.topPerformer);
  })

  path13.on('value',snapshot =>{
    //console.log(snapshot.val());
    this.getData(snapshot.val(),13);
    console.log(this.state.topTenTime);
  })

   path14.on('value',snapshot =>{
    //console.log(snapshot.val());
    this.getData(snapshot.val(),14);
    console.log(this.state.topFivePerformer);
  })


  path15.on('value',snapshot =>{
    //console.log(snapshot.val());
    this.getData(snapshot.val(),15);
    console.log(this.state.fbTimelineData);
  })

  path16.on('value',snapshot =>{
    //console.log(snapshot.val());
    this.getData(snapshot.val(),16);
    console.log(this.state.scatter2);
  })

  path17.on('value',snapshot =>{
    //console.log(snapshot.val());
    this.getData(snapshot.val(),17);
    console.log(this.state.loginTableFinal);
  })

    path18.on('value',snapshot =>{
    //console.log(snapshot.val());
    this.getData(snapshot.val(),18);
    console.log(this.state.piechartfinal);
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
        chartTooLong: messages
      });
    }
       if (num==2){
      this.setState({
        chartTooShort: messages
      });
    }
        if (num==3){
      this.setState({
        pieChartData: messages
      });
    }
    if (num==4){
      this.setState({
        listavgDailyTimeSpent: messages
      });
    }
     if (num==5){
      this.setState({
        listdailyNumberOfLevelCompleted: messages
      });
    }
     if (num==6){
      this.setState({
        tablelist: messages
      });
    }

     if (num==7){
      this.setState({
        listMaxDict: messages
      });
    }

     if (num==8){
      this.setState({
        scatterAvgX: messages
      });
    }

     if (num==9){
      this.setState({
        scatterAvgY: messages
      });
    }

     if (num==10){
      this.setState({
        scatterData: messages
      });
    }


    if (num==11){
      this.setState({
        topFivePlaytime: messages
      });
    }

     if (num==12){
      this.setState({
        topPerformer: messages
      });
    }

     if (num==13){
      this.setState({
        topTenTime: messages
      });
    }

     if (num==14){
      this.setState({
        topFivePerformer: messages
      });
    }

    if (num==15){
      this.setState({
        fbTimelineData: messages
      });
    }

    if (num==16){
      this.setState({
        scatter2: messages
      });
    }

    if (num==17){
      this.setState({
        loginTableFinal: messages
      });
    }
     if (num==18){
      this.setState({
        piechartfinal: messages
      });
    }
  }


  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  onPieEnter = (data, index)=> {
    this.setState({
      activeIndex: index });
    };

  /*
  let get_chart_data = function(firebaseRef) {
    // this.props
    let ref = firebaseRef.database.ref("")
    ref.once().then(
        chartData = snap.val()
        console.log("updated chartData",chartData)
        // force refresh of this component.
      )

      this.props.db.database().ref("newCharts/bar/data")
  }
  */

  /*

                 */

  render() {
    return (

      <div>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={12}>

           <RegularCard
              content={
                 <ResponsiveContainer width="100%" height={400}>
                <LineChart  data={this.state.fbTimelineData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend hide={true}/>
                  <Line type="linear" dataKey="activeUsers" stroke="#CC0000" />
                  <Line type="linear" dataKey="totalAvgLevelsCompleted" stroke="#0000CC" />
                  </LineChart>
                </ResponsiveContainer>
              }
              headerColor="green"
              cardTitle="Overview of Student Activity in Cohort"
              cardSubtitle={
                <span>
                {" "}
                Measures the <b>number of students on Code Combat</b> and the <b>average number of levels completed per student</b>
                </span>

              }
              statIcon={AccessTime}
              statText= {'Last updated '+today}
            />
          </ItemGrid>

        </Grid>

         <Grid container>

          <ItemGrid xs={8} sm={8} md={6}>
            <RegularCard
              headerColor="green"
              cardTitle="Top 20 Students with Highest Activity"
              cardSubtitle="Highest number of Code Combat level update count to Acheivement App"
              content={
                  <div
                    style = {{maxHeight:'750px', overflow:'auto'}}>
                <Table
                  tableHeaderColor="warning"
                  tableHead={[ "Name", "NumLoginDays", "LastActive"]}
                  tableData={this.state.loginTableFinal}
                />
                </div>
              }
            />

          </ItemGrid>

          <ItemGrid xs={12} sm={12} md={6}>

             <StatsCard
                  icon={Accessibility}
                  iconColor="green"
                  title="Current Week's Total User logins"
                  description="104"
                  small="logins"
                  statIcon={DateRange}
                  statIconColor="primary"
                  statLink={{ text: "Last 24 hours" }}
                />

            <StatsCard
                  icon={ContentCopy}
                  iconColor="green"
                  title="Current Week's Total Levels Completed"
                  description="1728"
                  small="levels"
                  statIcon={DateRange}
                  statIconColor="primary"
                  statLink={{ text: "Last 24 hours" }}
                />

                 <ChartCard
              chart={
                <ResponsiveContainer width="90%" height={400}>
                <BarChart data={this.state.listdailyNumberOfLevelCompleted}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Weekday" />
                    <YAxis
                       label={
                            <AxisLabel axisType="yAxis" width={340} height={350}>
                              {"Number of Levels Completed"}
                            </AxisLabel>
                              }
                    />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="levelsCompleted" fill="#787878" opacity= {0.9}/>

                  </BarChart>
                </ResponsiveContainer>
              }
              chartColor="green"
              title="Daily Total Levels Completed"
              text={
                <span>
                  <span className={this.props.classes.successText}>
                    <ArrowUpward
                      className={this.props.classes.upArrowCardCategory}
                    />{" "}

                  </span>{" "}
                  Daily summation of all the levels completed by the cohort
                </span>
              }
              statIcon={AccessTime}
              statText= {'Last updated '+today}
            />
               </ItemGrid>

            </Grid>

      <Grid container>

         <ItemGrid xs={12} sm={12} md={8}>

            <RegularCard
              content={

                <ResponsiveContainer width="95%" height={700}>
                <ScatterChart r = {5} margin={{top: 20, right: 20, bottom: 20, left: 30}}>

            <CartesianGrid />
            <XAxis  dataKey={'TotalLevelsCompleted'} type="number" name='totalTimeSpent'
                label={
                <AxisLabel axisType="xAxis" width={800} height={300}>

                </AxisLabel>
                  }
              />
            <YAxis dataKey={'totalTimeSpent'} type="number" name='TotalLevelsCompleted' unit='mins'
              label={
                <AxisLabel axisType="yAxis" width={0} height={700}>
                  {"Play Time (mins)"}
                </AxisLabel>
                  }
            />
            <Scatter name='Student' data={this.state.scatterData} fill='#000000 '/>

            <Legend verticalAlign="top" height={36}/>
            <Tooltip cursor={{strokeDasharray: '3 3'}}/>
            <ReferenceLine x={27} stroke="red" strokeDasharray="5 5"/>
            <ReferenceLine y={153} stroke="red" strokeDasharray="5 5"/>

          </ScatterChart>
              </ResponsiveContainer>
              }

               headerColor="purple"
              cardTitle="Student Classification in Code Combat"
              cardSubtitle={
                <span>
                {" "}
              Classifies the Students according to their individual's Levels Completed and Time Spent
                </span>

              }
              statIcon={AccessTime}
              statText= {'Last updated '+today}

            />
          </ItemGrid>

           <ItemGrid xs={12} sm={12} md={4}>
            <ChartCard
              chart={
                <PieChart width={250} height={300}>
                  <Pie
                    activeIndex={this.state.activeIndex}
                    activeShape={renderActiveShape}
                    data={this.state.piechartfinal}
                    cx={300/2}
                    cy={300/2}
                    innerRadius={30}
                    outerRadius={55}
                    fill="#fbf6f6"
                    opacity= {0.3}
                    onMouseEnter={this.onPieEnter}
                  />
                 </PieChart>

              }
              chartColor="purple"
              title="Percentage of the different Classification"
              text={
                <span>
                  <span className={this.props.classes.successText}>
                    <ArrowUpward
                      className={this.props.classes.upArrowCardCategory}
                    />{" "}
                     The scatter plot is divided into 4 quadrants, Q1, Q2, Q3, Q4 in a clockwise fashion
                  </span>{" "}
                  <div
                    style = {{maxHeight:'400px', overflow:'auto'}}>

              <h4>How to use the Scatter Plot?</h4>

              <ResponsiveContainer width="95%" height={200}>
                <ScatterChart r = {0.1} margin={{top: 20, right: 20, bottom: 20, left: 20}}>

            <CartesianGrid />
            <XAxis  dataKey={'TotalLevelsCompleted'} type="number"  hide={true} />
            <YAxis dataKey={'totalTimeSpent'} type="number"  hide={true}/>
            <Scatter  data={this.state.scatterData} fill='#000000 '/>

            <Legend verticalAlign="bottom" height={36} hide={true}/>
            <Tooltip cursor={{strokeDasharray: '3 3'}}/>
            <ReferenceLine x={27} stroke="red" strokeDasharray="5 5"/>
            <ReferenceLine y={153}  stroke="red" strokeDasharray="5 5"/>

            <ReferenceArea x1={0} x2={27} y1={0} y2={153} stroke="red" strokeOpacity={0.3} label= "Q4" isfront={true}/>
             <ReferenceArea x1={0} x2={27} y1={153} y2={800} stroke="red" strokeOpacity={0.8} label= "Q1" isfront={true}/>
             <ReferenceArea x1={27} x2={60} y1={0} y2={153} stroke="red" strokeOpacity={0.8} label= "Q3" isfront={true}/>
             <ReferenceArea x1={27} x2={60} y1={153} y2={800} stroke="red" strokeOpacity={0.3} label= "Q2" isfront={true}/>

          </ScatterChart>
              </ResponsiveContainer>

              A healthy sign of the cohort would be to see the students dots clustering in the middle of the scatter plot <p></p>

              <h5>Generic Analysis :</h5> <p></p>

              Quadrant 1: Students in Q1 require the most attention. These group of students are spending much more time than the
              average student on solving code combat levels, but not being able to complete as much Code Combat levels<p></p>

              Quadrant 2: Students in Q2 generally belong to the better performing group. However, they are spending a lot of time and
              hardwork to complete the Code Combat levels. Although it is commendable for their efforts, teachers should place
              attention on the students who are closer to the north west of this quadrant<p></p>

              Quadrant 3: Students in Q3 generally belong to the best performing group. Students in this category are completing the
              Code Combat levels with lesser time compared to an average student. This may imply that the students in this quadrant
              are good at programming <p></p>

              Quadrant 4: Students in Q4 belong to the average group. The category of student in this quadrant is diverse. The student
              nearer to the south-west of the quadrant may be starting out or are slightly unmotivated to attempt the code combat levels<p></p>


                  </div>

            </span>
              }
              statIcon={AccessTime}
             statText= {'Last updated '+today}
            />

                </ItemGrid>

      </Grid>

     <Grid container>

     <ItemGrid xs={12} sm={12} md={6}>

           <StatsCard
                  icon={ContentCopy}
                  iconColor="blue"
                  title="Average Daily Time Spent per Student"
                  description="153"
                  small=" mins"
                  statIcon={DateRange}
                  statIconColor="primary"
                  statLink={{ text: "Last 24 hours" }}
                />

                 <ChartCard
              chart={
                <ResponsiveContainer width="90%" height={400}>
                <BarChart data={this.state.listavgDailyTimeSpent}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Weekday" />
                    <YAxis
                       label={
                            <AxisLabel axisType="yAxis" width={340} height={400}>
                              {"PlayTime (mins)"}
                            </AxisLabel>
                              }
                    />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="playtime" fill="#787878" opacity= {0.9}/>

                  </BarChart>
                </ResponsiveContainer>
              }
              chartColor="blue"
              title="Average Time Spent by Students Daily"
              text={
                <span>
                  <span className={this.props.classes.successText}>
                    <ArrowUpward
                      className={this.props.classes.upArrowCardCategory}
                    />{" "}

                  </span>{" "}
                 This chart reflects the daily average time spent by each Student <p></p>

                </span>
              }
              statIcon={AccessTime}
              statText= {'Last updated '+today}
            />
               </ItemGrid>

        <ItemGrid xs={8} sm={8} md={6}>
            <RegularCard
              headerColor="blue"
              cardTitle="Top Mentions"
              cardSubtitle="Student in the this Category refers to those who are performing better than an average student.
                 The students who spend lesser time to complete code combat levels than the cohort average in the chart on the left
                 shows their ability to code well"
              content={
                <Table
                  tableHeaderColor="warning"
                  tableHead={["No.", "Name", "LvlCompleted", "TimeSpent", "AvgTimePerDay"]}
                  tableData={this.state.topPerformer}
                />
              }
            />

          </ItemGrid>

        </Grid>
        <Grid container>
       <ItemGrid xs={8} sm={8} md={6}>
                  <RegularCard
                    headerColor="orange"
                    cardTitle="Students Requiring Actions"
                    cardSubtitle="Students in this category may require attention by the teacher. They are spending relatively more time than average, but only able to complete lesser levels"
                    content={
                      <Table
                        tableHeaderColor="warning"
                        tableHead={["No.", "Name", "LvlCompleted", "TimeSpent", "AvgTimePerDay"]}
                        tableData={this.state.topTenTime}
                      />
                    }
                  />

                </ItemGrid>

                <ItemGrid xs={12} sm={12} md={6}>
                 <ChartCard
              chart={
                <ResponsiveContainer width="95%" height={350}>
                <ScatterChart r = {5} margin={{top: 20, right: 20, bottom: 20, left: 20}}>

            <CartesianGrid />
            <XAxis  dataKey={'TotalLevelsCompleted'} type="number" name='totalTimeSpent'
                label={
                <AxisLabel axisType="xAxis" width={800} height={400}>

                </AxisLabel>
                  }
              />
            <YAxis dataKey={'totalTimeSpent'} type="number" name='TotalLevelsCompleted' unit='mins'
              label={
                <AxisLabel axisType="yAxis" width={5} height={350}>
                  {"Play Time (mins)"}
                </AxisLabel>
                  }
            />
            <Scatter name='Student' data={this.state.scatter2} fill='#000000 '/>

            <Legend verticalAlign="top" height={36}/>
            <Tooltip cursor={{strokeDasharray: '3 3'}}/>
            <ReferenceLine x={27} stroke="red" strokeDasharray="5 5"/>
            <ReferenceLine y={153} stroke="red" strokeDasharray="5 5"/>

          </ScatterChart>
              </ResponsiveContainer>

              }
              chartColor="orange"
              title="Focused Scatter plot of Students Requiring Actions"
              text={
                <span>
                  <span className={this.props.classes.successText}>
                    <ArrowUpward
                      className={this.props.classes.upArrowCardCategory}
                    />{" "}

                  </span>{" "}
                  Enlarged scatter plot of Q1 and Q2 above<p></p>
                <h5>How to interpet this section?</h5> <p></p>
                Focus should be placed on the students who edge towards the north-west of Q1 and Q2.
                The north-western part of Q1 and Q2 represents students who are spending excessive time on
                code combat, but not completing any level. This may suggest that they are struggling to keep up
                with the code combat levels.
                <h5>But first:</h5><p></p>
                (1) Find out from the identified student if they are actually struggling or due to playtime logging errors<p></p>
                (2) Check the chart below "Top Five levels Requiring the Most Effort" to find out if they had spent too much time
                solving the difficult levels.

                </span>

              }
              statIcon={AccessTime}
              statText= {'Last updated '+today}
            />
               </ItemGrid>
            </Grid>
        <Grid container>

           <ItemGrid xs={12} sm={12} md={12}>
                 <RegularCard
              content={
                  <BarChart width={1000} height={300} data={this.state.topFivePlaytime}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" hide= {true} />
                    <YAxis
                      label={
                            <AxisLabel axisType="yAxis" width={340} height={250}>
                              {"Play Time (mins)"}
                            </AxisLabel>
                              }
                    />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="playTime" fill="#787878" opacity= {0.9} unit=' mins'/>

                  </BarChart>
                }
              headerColor="red"
              cardTitle="Top 10 Levels Requiring the Most Time and Effort!"
              cardSubtitle={
                <span>
                {" "}
                Students tend to spend more time on the levels below on average as compared to other levels in Code Combat.
                </span>

              }
              statIcon={AccessTime}
              statText= {'Last updated '+today}
            />
               </ItemGrid>
            </Grid>
        <Grid container>

          <ItemGrid xs={12} sm={12} md={12}>

            <RegularCard
              headerColor="purple"
              cardTitle="This Week's Overview of Cohort"
              cardSubtitle=""
              content={
                 <div
                    style = {{maxHeight:'400px', overflow:'auto'}}>
                <Table
                  tableHeaderColor="warning"
                  tableHead={["Name", "CCName", "LastUpdated", "LastLevelsPlayed", "LvlCompleted", "TimeSpent"]}
                  tableData={this.state.tablelist}
                />
                </div>
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
