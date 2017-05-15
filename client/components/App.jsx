import React from 'react';
import 'whatwg-fetch';
import Article from './Article'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <h1>React Full Stack </h1>
          {this.state.data.map(article => 
            <Article article={article} />
          )}
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App;
