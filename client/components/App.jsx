import React from 'react';
import 'whatwg-fetch';
import Article from './Article'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';


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
          <h1>React Full Stack </h1>
          <FlatButton 
            label="Add Article" 
            onTouchTap={this.handleOpen.bind(this)}
          />
          <Dialog 
            title="Add Article"
            open={this.state.open}
            actions={actions}
          >
            <div>
              <TextField
                name='title'
                floatingLabelText='title'
                fullWidth={true}
                onChange={(e, value) => this.textChange('title', value)}
              />
            </div>
            <div>
              <TextField
                name='author'
                floatingLabelText='author'
                fullWidth={true}
                onChange={(e, value) => this.textChange('author', value)}
              />
            </div>
            <div>
              <TextField
                name='date'
                floatingLabelText='date'
                fullWidth={true}
                onChange={(e, value) => this.textChange('date', value)}
              />
            </div>
            <div>
              <TextField
                name='articalBody'
                floatingLabelText='articalBody'
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
