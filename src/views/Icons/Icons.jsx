import React from "react";
import PropTypes from "prop-types";
import { withStyles, Grid, Hidden, Button, Dialog, TextField, Paper, DialogTitle,
  DialogActions, DialogContent, DialogContentText, CardContent, CardActions,
  CardHeader, Card, MenuItem } from "material-ui";

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

import _ from "lodash";
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
<<<<<<< HEAD
          <Button
=======
          <Button
>>>>>>> fdaa376e8626e8f8a6ad6b81da3a9258d357c791
            color="primary">
            Create Assignment
          </Button>
      </ItemGrid>
    </Grid>
  );
}
*/

class InClassChart extends React.Component {
  state = {
    value: 0,
    open: false,
    assName: '',
    allAsses: [],
    number: 0
  }

  constructor(props) {
    super(props);

    var db = firebase.database();
    let data = db.ref('asses');
    data.on('value', snapshot => {
      this.getAssData(snapshot.val());
    })
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
    firebase.database().ref('asses/' + this.state.assName + '/').set({
        name: this.state.assName
    })
    // to close the dialog box after clicking create
    this.setState({open: false});
    //this.setState({number: this.state.number + 1})
    let newAss = firebase.database().ref('asses');
    newAss.on('value', snapshot => {
      this.getAssData(snapshot.val());
    });
  }

  ///////// TODO: REDO SUBMITASS ////////////////
  submitAss(assName) {
    this.setState({
      number: this.state.number + 1
    })
    firebase.database().ref('asses/' + assName + '/submissions' + '/' + this.state.number + '/').set({
      status: 'submitted'
    })
  }

  getAssData(values){
    let assVal = values;   // this is an Object
    let asses = _(assVal)
                      .keys()
                      .map(assKey => {
                          let cloned = _.clone(assVal[assKey]);
                          cloned.key = assKey;
                          return cloned;
                      })
                      .value();
      //stores array of Objects into lessons state
      this.setState({
        allAsses: asses
      });
      //this.setState({
        //nextIndex: this.state.listOfLessons.length
      //});
  }

  render() {

    // this is the part that creates the thing to pop up everytime we create a new ass
    let messageNodes = this.state.allAsses.map((ass, index) => {
      return (
        // create Grid here jic wanna add more items to return
        <Grid popup>
          <RegularCard
            headerColor = "orange"
            // because the key is name, so we use ass.name to reflect the name of the ass
            cardTitle = {ass.name}
            content = {
              <Grid con>
                <Button
                size = 'small'
                variant = 'fab'
                onClick = {this.submitAss.bind(this)}
                >
                  Submit
                </Button>
                <ChartCard
                  db = {firebase}
                  chart = {
                    <LineChart width={730} height={250} data={this.props.asses}
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
                  chartColor="yellow"
                  title={ass.name}
                  statIcon={InfoOutline}
                  statText="See how many students are done with this assignment"
                />
              </Grid>
            }
          >
          </RegularCard>
        </Grid>
      )
    })

    return (
      <Grid container>
        <ItemGrid xs={40} sm={40} md={40}>
          <Button
              size = 'large'
              fullWidth = 'true'
              variant = 'raised'
              onClick = {this.handleOpen}
              color = "secondary"
            >
              Create Assignment
            </Button>
            {messageNodes}

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
