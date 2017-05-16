import React from 'react';
import 'whatwg-fetch';
import Article from './Article'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  addButton: {
    marginBottom: 20,
    marginTop: 20
  },
  topTitle: {
    fontFamily: 'proxima-nova,"Helvetica Neue",Helvetica,Roboto,Arial,sans-serif',
    backgroundColor: '#2d2d2d',
    color: '#61dafb',
    textAlign: 'center',
    height: 100,
    paddingTop: 50,
    margin: 0
  },
  subTitle: {
    fontSize: 16,
    color: 'white'
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      open: false,
      addTitle: 'title',
      addAuthor: 'author',
      addDate: 'date',
      addBody: 'body'
    };
  }
  componentDidMount() {
    this.getArticles();
  }

  handleOpen() {
    this.setState({open: true});
  };

  handleClose() {
    this.setState({open: false});
    this.setState({addTitle: 'title'})
    this.setState({addAuthor: 'author'})
    this.setState({addDate: 'date'})
    this.setState({addBody: 'body'})
  };

  getArticles() {
    fetch('http://localhost:8000/articles', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(response => this.setState({
      data: response
    }))
    .catch(err => console.log("error fetching articles", err))
  }

  textChange(type, value) {
    if(type === 'title'){
      this.setState({addTitle: value})
    } else if (type === 'author') {
      this.setState({addAuthor: value})
    } else if (type === 'date') {
      this.setState({addDate: value})
    } else if (type === 'body') {
      this.setState({addBody: value})
    }
  }

  addArticle() {
    fetch('http://localhost:8000/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: this.state.addTitle,
        author: this.state.addAuthor,
        date: this.state.addDate,
        articalBody: this.state.addBody
      })
    })
    .then(console.log("article added"))
    .catch(err => console.log("error posting article", err))

    this.setState({open: false});
    window.location.reload();
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose.bind(this)}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onTouchTap={this.addArticle.bind(this)}
      />,
    ];
    return (
      <MuiThemeProvider>
        <div>
          <h1 style={styles.topTitle}>
            React Full Stack
            <div style={styles.subTitle}>list, create, delete, and update your articles</div> 
          </h1>
          <RaisedButton 
            label="Add Article" 
            onTouchTap={this.handleOpen.bind(this)}
            style={styles.addButton}
          />
          <Dialog 
            title="Add Article"
            open={this.state.open}
            actions={actions}
          >
            <div>
              <TextField
                name='title'
                floatingLabelText='Title'
                fullWidth={true}
                onChange={(e, value) => this.textChange('title', value)}
              />
            </div>
            <div>
              <TextField
                name='author'
                floatingLabelText='Author'
                fullWidth={true}
                onChange={(e, value) => this.textChange('author', value)}
              />
            </div>
            <div>
              <TextField
                name='date'
                floatingLabelText='Date'
                fullWidth={true}
                onChange={(e, value) => this.textChange('date', value)}
              />
            </div>
            <div>
              <TextField
                name='articalBody'
                floatingLabelText='Artical Body'
                multiLine
                fullWidth={true}
                onChange={(e, value) => this.textChange('body', value)}
              />
            </div>
          </Dialog>
          {this.state.data.map(article => 
            <Article article={article}/>
          )}
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App;
