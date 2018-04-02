import React from "react";
import PropTypes from "prop-types";
import { withStyles, Grid, Hidden, Button, Dialog, TextField, Paper } from "material-ui";

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

class test extends React.Component {
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
  constructor(props) {
    super(props)
    this.state = {
      counter: 0
    }
    this.addOne = this.addOne.bind(this)
  }

  addOne() {
    this.setState({
      counter: this.state.counter + 1
    })
  }

  submit(ev) {
    ev.preventDefault();
  }

  render() {
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
            onClick = {this.handleOpen}
            color = "primary" 
          >
          Create Assignment
          </Button>
            <Dialog
              label="New Assignment"
              modal={true}
              open={this.state.open}
              autoScrollBodyContent = {true}
              onBackdropClick = {this.handleClose}
              //fullWidth={true}
              //maxWidth='md'
              withStyles = {true}
            >
            <Paper
              height = '100'
              width = '100'
              margin = '20'
              display = 'inline-block'
            >
            <Grid container>
            <ItemGrid >
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
            </ItemGrid>
            </Grid>
            </Paper>
            </Dialog>
              { this.state.counter }
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

export default withStyles(iconsStyle)(test);
