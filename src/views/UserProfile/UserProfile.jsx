import React from "react";
import { Grid, InputLabel } from "material-ui";

import {
  ProfileCard,
  RegularCard,
  Button,
  CustomInput,
  ItemGrid,
  Table
} from "components";

import avatar from "assets/img/faces/marc.jpg";

// for charting:
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

import {
  StatsCard,
  ChartCard
} from "components";

// necessary items for chart cards:
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


class StudentDashboard extends React.Component {
  state = {};

  // any methods eg handleChange


  render() {
    return (
      <div>
        <Grid container>
          <ItemGrid xs={40} sm={20} md={10}>
            <ChartCard 
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
              chartColor="green"
              title="Line Chart 1"
              text={"Some text here"}
              statIcon={AccessTime}
              statText="updated 4 minutes ago"
            />
            <RegularCard
              headerColor="orange"
              cardTitle="Table 1"
              cardSubtitle="For assignment completion process"
              content={
                <Table
                  tableHeaderColor="warning"
                  tableHead={["Assignment Name", "Status", "Percentage Completed"]}
                  tableData={[
                    ["Charting Tutorial", "Incomplete", "95%"],
                    ["AWS Lambda 1", "Submitted", "100%"],
                    ["AWS Lambda 2", "Incomplete", "55%"]
                  ]}
                />
              }
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
          </ItemGrid>
        </Grid>
      </div>
    )
  }
}

export default StudentDashboard;
