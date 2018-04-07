import React, {Component} from 'react';
import trim from 'trim';

import { Grid, TextField, Snackbar } from "material-ui";

import {
  RegularCard,
  Button,
  ItemGrid,
  Muted
} from "components";


class MessageBox extends Component {
  constructor(props){
    super(props);

    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeDesc = this.handleChangeDesc.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      bc: false,
      title: '',
      desc:''
    };
  }

  handleChangeTitle(e){
      this.setState({
        title: e.target.value
      });
  }

  handleChangeDesc(e){
      this.setState({
        desc: e.target.value
      });
  }

  handleSubmit(e){
    // alert("from messageBOx:index="+this.props.selectedIndex);
    if (this.state.title.length > 1 && this.state.desc.length > 1){
      let dbCon = this.props.db.database().ref('/lessons/lecture'+(this.props.selectedIndex+1)+'/messages');
      dbCon.push({
        title: trim(this.state.title),
        desc: trim(this.state.desc)
      });

      this.showNotification("bc");

      this.setState({
        title: '',
        desc: ''
      });
    }
  }

  showNotification(place) {
    var x = [];
    x[place] = true;
    this.setState(x);
    setTimeout(
      function() {
        x[place] = false;
        this.setState(x);
      }.bind(this),
      6000
    );
  }

  render() {
        return (
          <div>
          <Grid container>
            <ItemGrid  xs={12} sm={12} md={12}>
              <RegularCard
                fullWidth= {true}
                cardSubtitle="Any Question(s)? Post it here!"
                content={
                  <div>
                    <Grid container>
                      <ItemGrid xs={12} sm={12} md={12}>
                        <TextField
                          fullWidth= {true}
                          label="Title"
                          required= {true}
                          value= {this.state.title}
                          onChange= {this.handleChangeTitle}
                        />
                        <TextField
                          fullWidth= {true}
                          label= "Description"
                          multiline= {true}
                          rows= {2}
                          rowsMax= {5}
                          required= {true}
                          value= {this.state.desc}
                          onChange= {this.handleChangeDesc}
                        />
                      </ItemGrid>
                      <p style={{margin: '10px'}}><Muted>*mandatory fields</Muted></p>
                    </Grid>
                  </div>
                }
                footer={<Button color="primary" onClick={this.handleSubmit }>Submit</Button>}
              />
              <Snackbar
                place="bc"
                message="Post has been added"
                open={this.state.bc}
                closeNotification={() => this.setState({ bc: false })}
                close
              />
            </ItemGrid>
            </Grid>
          </div>
        )
  }
}
export default MessageBox;
