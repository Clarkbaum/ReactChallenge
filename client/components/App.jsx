import React from 'react';
import 'whatwg-fetch';
import Article from './Article'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }
  componentDidMount() {
    this.getArticles();
  }

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

  handleSubmit(id, editBody) {
    fetch('http://localhost:8000/articles/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: editBody
    })
    .then(console.log("article edited"))
    .catch(err => console.log("error put/edit articles", err))

    this.setState({open: false});
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <h1>React Full Stack </h1>
          <FlatButton label="add article" />
          {this.state.data.map(article => 
            <Article 
              article={article} 
              handleSubmit={() => this.handleSubmit.bind(this)}
            />
          )}
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App;
