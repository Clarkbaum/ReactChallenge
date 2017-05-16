import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

const styles = {
  article: {
    padding: 10,
    marginBottom: 20
  },
  articleTitle: {
    font: '48px/52px Effra,Helvetica,Arial,sans-serif',
    fontWeight: 700,
    marginBottom: 10
  },
  articleAuthor: {
    marginTop: 10,
    font: '20px Effra,Helvetica,Arial,sans-serif',
    fontWeight: 600
  },
  articleDate: {
    color: '#a8a8a8',
    marginBottom: 60
  }
}
class Article extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      editTitle: this.props.article.title,
      editAuthor: this.props.article.author,
      editDate: this.props.article.date,
      editBody: this.props.article.articalBody
    };
    console.log("this.props", this.props)
  }

  handleOpen() {
    this.setState({open: true});
  };

  handleClose() {
    this.setState({open: false});
    //dont want state out of sync if canceled
    this.setState({editTitle: this.props.article.title})
    this.setState({editAuthor: this.props.article.author})
    this.setState({editDate: this.props.article.date})
    this.setState({editBody: this.props.article.articalBody})
  };

  handleSubmit() {
    fetch('http://localhost:8000/articles/' + this.props.article._id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: this.state.editTitle,
        author: this.state.editAuthor,
        date: this.state.editDate,
        articalBody: this.state.editBody
      })
    })
    .then(console.log("article edited"))
    .catch(err => console.log("error put/edit articles", err))

    this.setState({open: false});
    window.location.reload();
  }

  handleDelete() {
    fetch('http://localhost:8000/articles/' + this.props.article._id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(console.log("article deleted"))
    .catch(err => console.log("error delete article", err))

    window.location.reload();
  }

  textChange(type, value) {
    if(type === 'title'){
      this.setState({editTitle: value})
    } else if (type === 'author') {
      this.setState({editAuthor: value})
    } else if (type === 'date') {
      this.setState({editDate: value})
    } else if (type === 'body') {
      this.setState({editBody: value})
    }
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
        onTouchTap={this.handleSubmit.bind(this)}
      />,
    ];

    return (
      <Paper style={styles.article} zDepth={2}>
        <div style={styles.articleTitle}>
          {this.props.article.title}
        </div>
        -------------------
        <div style={styles.articleAuthor}>
          {this.props.article.author}
        </div>
        <div style={styles.articleDate}>
          {this.props.article.date}
        </div>
        <div>
          {this.props.article.articalBody}
        </div>
        <FlatButton
          label="Edit"
          onTouchTap={this.handleOpen.bind(this)}
        />
        <FlatButton
          label="Delete"
          onTouchTap={this.handleDelete.bind(this)}

        />
        <Dialog 
          title="Edit"
          open={this.state.open}
          actions={actions}
        >
          <div>
            <TextField
              defaultValue={this.props.article.title}
              name='title'
              fullWidth={true}
              onChange={(e, value) => this.textChange('title', value)}
            />
          </div>
          <div>
            <TextField
              defaultValue={this.props.article.author}
              name='author'
              fullWidth={true}
              onChange={(e, value) => this.textChange('author', value)}
            />
          </div>
          <div>
            <TextField
              defaultValue={this.props.article.date}
              name='date'
              fullWidth={true}
              onChange={(e, value) => this.textChange('date', value)}
            />
          </div>
          <div>
            <TextField
              defaultValue={this.props.article.articalBody}
              name='articalBody'
              multiLine
              fullWidth={true}
              onChange={(e, value) => this.textChange('body', value)}
            />
          </div>
        </Dialog>
      </Paper>
    )
  }
}

export default Article;
