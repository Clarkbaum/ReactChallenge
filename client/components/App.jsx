import React from 'react';
import 'whatwg-fetch';
import Article from './Article'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MERN from '../assets/MERN.jpg';

const styles = {
  addButton: {
    marginBottom: 20,
    marginTop: 20,
  },
  header: {
    backgroundColor: '#2d2d2d',
    height: 200,
    paddingTop: 100,
    margin: 0,
    textAlign: 'center',
    marginBottom: 20
  },
  topTitle: {
    fontSize: 34,
    fontWeight: 600,
    fontFamily: 'proxima-nova,"Helvetica Neue",Helvetica,Roboto,Arial,sans-serif',
    color: '#61dafb',
    margin: 0
  },
  subTitle: {
    fontFamily: 'proxima-nova,"Helvetica Neue",Helvetica,Roboto,Arial,sans-serif',
    fontSize: 16,
    color: 'white'
  },
  mernLogo: {
    height: 50,
    marginRight: 10
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      open: false,
      hovered: false,
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

  onMouseOver() {
    this.setState({ hovered:true });
  }

  onMouseOut() {
    this.setState({ hovered:false });
  }

  isHovered() {
    if (this.state.hovered) {
      return { 
        backgroundColor: "rgba(0,255,0,0.2)" ,
        marginTop: 20
      }
    } else {
      return { 
        backgroundColor: "rgba(0, 255, 0, 0.5)" ,
        marginTop: 20
      }
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
          <div style={styles.header}>
            <img style={styles.mernLogo} className="logo" src={MERN} alt="MERN" />
            <span style={styles.topTitle}>React Full Stack </span>
            <div style={styles.subTitle}>list, create, delete, and update your articles</div> 
            <FlatButton 
              label="Add Article" 
              onTouchTap={this.handleOpen.bind(this)}
              style={this.isHovered()}
              onMouseOver={this.onMouseOver.bind(this)}
              onMouseOut={this.onMouseOut.bind(this)} 
            />
          </div>
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
