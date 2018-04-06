/*
import React from "react";
import PropTypes from "prop-types";
import { withStyles, Grid, Hidden, Button, Dialog, TextField, Paper } from "material-ui";

import { RegularCard, P, A, ItemGrid } from "components";

import ChartistGraph from "react-chartist";
import {
  StatsCard,
  ChartCard
} from "components";

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

var config = {
    apiKey: "AIzaSyDvF966Qymq1ktNm39fWqo8CY42GSA6UnQ",
    authDomain: "friendlychat-af4c8.firebaseapp.com",
    databaseURL: "https://friendlychat-af4c8.firebaseio.com",
    projectId: "friendlychat-af4c8",
    storageBucket: "friendlychat-af4c8.appspot.com",
    messagingSenderId: "919303787426"
  };

try {
  firebase.initializeApp(config);
} catch (error) {}

var db = firebase.database();
let data = db.ref('testCharts');
data.on('value', snapshot => {
  snapshot.val();
})

function InClassChart({ ...props }) {
  state = {
    value: 0,
    open: false
  }
  handleOpen = () => {
    this.setState({open: true})

  }
  handleClose = () => {
    this.setState({open: false})
  }

    return (
      <Grid container>
        <ItemGrid xs={40} sm={40} md={40}>
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
              chartColor="green"
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
          <Button
            onClick = {this.handleOpen}
            color = "primary" 
          >
          Create Assignment
          </Button>
          <Grid container>
            <ItemGrid xs={300} sm={300} md={300}>
            <Dialog
              label="New Assignment"
              modal={true}
              open={this.state.open}
              autoScrollBodyContent = {true}
              onBackdropClick = {this.handleClose}
              //fullWidth={true}
              maxWidth = 'md'
              withStyles = {false}
            >
            <Paper
              height = '400'
              width = '400'
              margin = '20'
              //display = 'inline-block'
            >
            
            <p>Creating a new Assignment</p>

            <TextField 
              label = "Assignment Name"
            />
            <br />
            <p></p>
            <Button
              primary={true}
              onClick={this.handleClose}
            >
            Cancel
            </Button>
            <Button
              primary={true}
              keyboardFocused={true}
              onClick={this.handleClose}
            >
            Submit
            </Button>
            </Paper>
            </Dialog>
              { this.state.counter }
            </ItemGrid>
            </Grid>

        </ItemGrid>
      </Grid>
    )
}


export default withStyles(InClassChart);
*/