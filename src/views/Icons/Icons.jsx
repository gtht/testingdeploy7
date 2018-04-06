import React from "react";
import PropTypes from "prop-types";
import { withStyles, Grid, Hidden, Button, Dialog, TextField, Paper, DialogTitle, 
  DialogActions, DialogContent, DialogContentText, CardContent, CardActions, CardHeader, Card } from "material-ui";

import { RegularCard, P, A, ItemGrid } from "components";

import ChartistGraph from "react-chartist";
import {
  StatsCard,
  ChartCard
} from "components";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts";

import dashboardStyle from "variables/styles/dashboardStyle";
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

import iconsStyle from "variables/styles/iconsStyle";
import firebase from "firebase";
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

/*
function Icons({ ...props }) {
  return (
    <Grid container>
      <ItemGrid xs={12} sm={12} md={8}>
            <ChartCard
              chart={
                <ChartistGraph
                  className="ct-chart"
                  data={dailySalesChart.data}
                  type="Line"
                  options={dailySalesChart.options}
                  listener={dailySalesChart.animation}
                />
              }
              chartColor="green"
              title="Daily Sales"
              text={
                <span>
                  <span>
                    <ArrowUpward
                    />{" "}
                    55%
                  </span>{" "}
                  increase in today sales.
                </span>
              }
              statIcon={AccessTime}
              statText="updated 4 minutes ago"
            />
          <Button 
            color="primary">
            Create Assignment
          </Button>
      </ItemGrid>
    </Grid>
  );
}
*/

var config = {
    apiKey: "AIzaSyC2n7VJ7--T2859rBpru7q0I2BDxu5omU4",
    authDomain: "inclassexercises-241b5.firebaseapp.com",
    databaseURL: "https://inclassexercises-241b5.firebaseio.com",
    projectId: "inclassexercises-241b5",
    storageBucket: "",
    messagingSenderId: "1002580453239"
  };

try {
  firebase.initializeApp(config);
} catch (error) {}

var db = firebase.database();
let data = db.ref('testCharts');
data.on('value', snapshot => {
  snapshot.val();
})

function writeUserData(name) {
  firebase.database().ref('testCharts/').set({
    username: name
  });
}

class InClassChart extends React.Component {
  state = {
    value: 0,
    open: false,
    assName: '',
    number: 0
  }
  handleOpen = () => {
    this.setState({assName: ''})
    this.setState({open: true})

  }
  handleClose = () => {
    this.setState({open: false})
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      assName: e.target.value
    })
  }

  createAss(e) {

    firebase.database().ref('asses/' + this.state.number + '/').set({
        name: this.state.assName
    })
    // to close the dialog box after clicking create
    this.setState({open: false});
  }

  submitAss(assName, uid) {
    firebase.database().ref('asses/' + assName + '/').set({
      uid: 'submitted'
    })
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid container>
        <ItemGrid xs={40} sm={40} md={40}>
          <Button
              onClick = {this.handleOpen}
              color = "rose" 
            >
              Create Assignment
            </Button>
            <RegularCard
            headerColor = "green"
            cardTitle = "Assignment A"
            content={
              <Button
              // need to make the button post to a certain node in firebase
                //onClick = {this.submitAss.bind(this)}
              >
                Submit
              </Button>
            }
          />
            
            <ChartCard
              db = {firebase}
              chart = {
                <LineChart width={730} height={250} data={this.props.testCharts}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                  <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
              }
              chartColor="orange"
              title="Assignment 1"
              text={
                <span>
                  <span>
                    <ArrowUpward
                    />{" "}
                    55%
                  </span>{" "}
                  increase in today sales.
                </span>
              }
              statIcon={AccessTime}
              statText="updated 4 minutes ago"
            />
          

          <Paper
            height = '1000'
            width = '1000'
            margin = '5'
            display = 'inline-block'
          >
            

            <Dialog
              modal={true}
              open={this.state.open}
              autoScrollBodyContent = {true}
              onBackdropClick = {this.handleClose}
              //fullWidth={true}
              maxWidth = 'lg'
              withStyles = {false}
            >
              <DialogTitle>
                New Assignment
              </DialogTitle>
              
              <DialogContent>
                <DialogContentText>
                  Key in the new Assignment name, and hit "Create".
                </DialogContentText>

                <p> </p>
                  
                  <TextField 
                    label = "Assignment Name"
                    required = 'true'
                    fullWidth = 'true'
                    onChange = {this.handleChange.bind(this)}
                    value = {this.state.assName}
                  />
                  
                <DialogActions>
                  <Button
                    primary={true}
                    keyboardFocused={true}
                    onClick = {this.createAss.bind(this)}
                  >
                  Create
                  </Button>

                  <Button
                    primary={true}
                    onClick={this.handleClose}
                  >
                  Cancel
                  </Button>
                </DialogActions>

              </DialogContent>
            </Dialog>
          </Paper>

        </ItemGrid>
      </Grid>
    )
  }
}

/*
Icons.propTypes = {
  classes: PropTypes.object.isRequired
};
*/

export default withStyles(iconsStyle)(InClassChart);
