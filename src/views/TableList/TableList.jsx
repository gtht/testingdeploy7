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
import { withStyles, Grid, Paper } from "material-ui";
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
  Sector
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
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#000">
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
                <ScatterChart width={800} height={400} margin={{top: 20, right: 20, bottom: 20, left: 20}}>
                  <CartesianGrid />
                  <XAxis  dataKey={'x'} type="number" name='Day' 
                    label={
                      <AxisLabel axisType="xAxis" width={800} height={385}>
                      {"Day of the Week"}
                      </AxisLabel>
                    }
                  />
                  <YAxis dataKey={'y'} type="number" name='Play Time' unit='mins'
                    label={
                      <AxisLabel axisType="yAxis" width={100} height={385}>
                      {"Play Time (mins)"}
                      </AxisLabel>
                    }
                  />
                  <Scatter name='Took too Long' data={this.state.chartTooLong} fill='#FF0000'/>
                  <Scatter name='Took too Fast' data={this.state.chartTooShort} fill='#228B22'/>
                  <Legend verticalAlign="top" height={36}/>
                  <Tooltip cursor={{strokeDasharray: '3 3'}}/>
                  </ScatterChart>  
              }
              headerColor="red"
              cardTitle="Category of Student's Time Commitment on Code Combat"
              cardSubtitle={
                <span>
                {" "}
                  <b>tookTooLong</b> -- students spending 30% more time than the daily average ,   <b>tookTooFast</b> -- students spending 30% lesser time than the daily average
                </span>
                 
              }
              statIcon={AccessTime}
              statText= {'Last updated '+today}
            />
          </ItemGrid>
      </Grid>

        <Grid container> 
          <ItemGrid xs={12} sm={12} md={4}>
            <ChartCard
              chart={
                <PieChart width={250} height={300}>
                  <Pie 
                    activeIndex={this.state.activeIndex}
                    activeShape={renderActiveShape} 
                    data={this.state.pieChartData} 
                    cx={300/2} 
                    cy={300/2} 
                    innerRadius={60}
                    outerRadius={80} 
                    fill="#fbf6f6"
                    opacity= {0.3}
                    onMouseEnter={this.onPieEnter}
                  />
                 </PieChart>
              
              }
              chartColor="blue"
              title="Pie Chart of Student Categories"
              text={
                <span>
                  <span className={this.props.classes.successText}>
                    <ArrowUpward
                      className={this.props.classes.upArrowCardCategory}
                    />{" "}
                    
                  </span>{" "}
                  Overall summary of the students in each Category
                </span>
              }
              statIcon={AccessTime}
             statText= {'Last updated '+today}
            />
           
              
                </ItemGrid> 
               <ItemGrid xs={12} sm={12} md={2}>   
                  <StatsCard
                  icon={ContentCopy}
                  iconColor="purple"
                  title="Current Week's AvgTime Spent"
                  description="95"
                  small="mins"
                  statIcon={DateRange}
                  statIconColor="primary"
                  statLink={{ text: "Last 24 hours" }}
                />
          </ItemGrid>

                <ItemGrid xs={12} sm={12} md={6}>
                
               <ChartCard
                      chart={
                         <BarChart width={400} height={300} data={this.state.listavgDailyTimeSpent}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Weekday" />
                    <YAxis 
                        label={
                            <AxisLabel axisType="yAxis" width={400} height={250}>
                              {"Play Time (mins)"}
                            </AxisLabel>
                              }
                    />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="playtime" fill="#787878"  opacity= {0.9} />
                    
                  </BarChart>
                      
                      }
                      chartColor="green"
                      title="Daily Average Playtime per Student"
                      text={
                        <span>
                          <span className={this.props.classes.successText}>
                            <ArrowUpward
                              className={this.props.classes.upArrowCardCategory}
                            />{" "}
                            
                          </span>{" "}
                          Daily average play time refers to the avg time spent per level by student on that day
                        </span>
                }
              statIcon={AccessTime}
              statText= {'Last updated '+today}
            />
               </ItemGrid>
            </Grid>


        <Grid container> 
         <ItemGrid xs={12} sm={12} md={2}>   
                <StatsCard
                  icon={ContentCopy}
                  iconColor="blue"
                  title="Current Week's Total Levels Completed"
                  description="1728"
                  small="levels"
                  statIcon={DateRange}
                  statIconColor="primary"
                  statLink={{ text: "Last 24 hours" }}
                />
          </ItemGrid>
           
            <ItemGrid xs={12} sm={12} md={5}>
                 <ChartCard
              chart={
                <BarChart width={340} height={300} data={this.state.listdailyNumberOfLevelCompleted}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Weekday" />
                    <YAxis 
                       label={
                            <AxisLabel axisType="yAxis" width={340} height={250}>
                              {"Number of Levels Completed"}
                            </AxisLabel>
                              }
                    />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="levelsCompleted" fill="#787878" opacity= {0.9}/>
                    
                  </BarChart>
              
              }
              chartColor="yellow"
              title="Daily Total Levels Completed"
              text={
                <span>
                  <span className={this.props.classes.successText}>
                    <ArrowUpward
                      className={this.props.classes.upArrowCardCategory}
                    />{" "}
                    
                  </span>{" "}
                  Daily summation of all the levels completed by cohort
                </span>
              }
              statIcon={AccessTime}
              statText= {'Last updated '+today}
            />
              
               </ItemGrid>
         

        
           <ItemGrid xs={12} sm={12} md={5}>
                 <ChartCard
              chart={
                <BarChart width={340} height={300} data={this.state.listMaxDict}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-90} textAnchor="end" />
                    <YAxis 
                      label={
                            <AxisLabel axisType="yAxis" width={340} height={250}>
                              {"Play Time (mins)"}
                            </AxisLabel>
                              }
                    />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="playtime" fill="#787878" opacity= {0.9} />
                    
                  </BarChart>
              
              }
              chartColor="orange"
              title="Average Playtime for 10 Most Popular Levels for the Week "
              text={
                <span>
                  <span className={this.props.classes.successText}>
                    <ArrowUpward
                      className={this.props.classes.upArrowCardCategory}
                    />{" "}
                    
                  </span>{" "}
                  Mouse over the bars to find out more!
                </span>
              }
              statIcon={AccessTime}
              statText= {'Last updated '+today}
            />
              
               </ItemGrid>
            
        
          
            </Grid>




        <Grid container>
          
          <ItemGrid xs={12} sm={12} md={12}>
            <Paper 
            style = {{maxHeight: 200, overflow: 'auto'}}
            content = {            
              <RegularCard
                headerColor="purple"
                cardTitle="This Week's Overview of Cohort"
                cardSubtitle=""
                content={
                  <Table
                    tableHeaderColor="warning"
                    tableHead={["Student'sWeeklyCategory", "Name", "CCName", "LastUpdated", "LastLevelsPlayed", "Student'sAvgPlaytime", "CohortAvgPlaytime"]}
                    tableData={this.state.tablelist}
                  />
                }
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
