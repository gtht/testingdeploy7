import React from "react";
import { Grid, ListItem } from "material-ui";
import { AddAlert } from "material-ui-icons";

import {
  RegularCard,
  A,
  P,
  Small,
  Button,
  SnackbarContent,
  Snackbar,
  ItemGrid,
  MessageContents
} from "components";

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tl: false,
      tc: false,
      tr: false,
      bl: false,
      bc: false,
      br: false
    };
  }
  render() {
    return (
      <RegularCard
        cardTitle="Notifications"
        content={
          <div className="card">
            <div className="card-content"
              style= {{
                padding: '20px 15px',
                lineHeight: '20px',
                position: "relative",
                marginBottom: "10px",
                backgroundColor: "white",
                color: "#555555",
                borderRadius: "3px",
                boxShadow:
                "0 12px 20px -10px rgba(255, 255, 255, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(255, 255, 255, 0.2)"}}>
              <ListItem>
                <MessageContents />
              </ListItem>
            </div>
          </div>
        }
      />
    );
  }
}

export default Notifications;
