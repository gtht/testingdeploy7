import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
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

class Dashboard extends React.Component {
  state = {
    value: 0
  };
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
            <ChartCard 
              chart = {
                <LineChart width={700} height={250} data={this.props.asses}
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
              title="Line Chart 1"
              text={"Some text here"}
              statIcon={AccessTime}
              statText="updated 4 minutes ago"
            />
          </ItemGrid>
          <ItemGrid xs={8} sm={8} md={5}>
            <RegularCard
              headerColor="orange"
              cardTitle="Table 2"
              cardSubtitle="Assignment that took longest to complete at the top"
              content={
                <Table
                  tableHeaderColor="warning"
                  tableHead={["Assignment Name", "Time Taken to Complete"]}
                  tableData={[
                    ["AWS Lambda 2", "Incomplete"],
                    ["Charting Tutorial", "Incomplete"],
                    ["AWS Lambda 1", "6h 43mins"]
                  ]}
                />
              }
            />
          </ItemGrid>
          <ItemGrid xs={8} sm={8} md={5}>
            <RegularCard
              headerColor="orange"
              cardTitle="Table 2"
              cardSubtitle="Assignment that took longest to complete at the top"
              content={
                <Table
                  tableHeaderColor="warning"
                  tableHead={["Assignment Name", "Time Taken to Complete"]}
                  tableData={[
                    ["AWS Lambda 2", "Incomplete"],
                    ["Charting Tutorial", "Incomplete"],
                    ["AWS Lambda 1", "6h 43mins"]
                  ]}
                />
              }
            />
          </ItemGrid>
        </Grid>
        <Grid container>
          <ItemGrid xs={100} sm={100} md={10}>
            <ChartCard 
              chart = {
                <LineChart width={350} height={300} data={this.props.asses}
                    margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
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
              title="Line Chart 1"
              text={"Some text here"}
              statIcon={AccessTime}
              statText="updated 4 minutes ago"
            />
            <RegularCard
              headerColor="orange"
              cardTitle="Table 2"
              cardSubtitle="Assignment that took longest to complete at the top"
              content={
                <Table
                  tableHeaderColor="warning"
                  tableHead={["Assignment Name", "Time Taken to Complete", "Relevant Concepts"]}
                  tableData={[
                    ["AWS Lambda 2", "Incomplete", "AWS Lambda, API Gateway, Python"],
                    ["Charting Tutorial", "Incomplete", "Recharts, React, JavaScript"],
                    ["AWS Lambda 1", "6h 43mins", "AWS Lambda, API Gateway, Python"]
                  ]}
                />
              }
            />
            <ChartCard 
              chart = {
                <LineChart width={350} height={300} data={this.props.asses}
                    margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
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
              title="Line Chart 1"
              text={"Some text here"}
              statIcon={AccessTime}
              statText="updated 4 minutes ago"
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
