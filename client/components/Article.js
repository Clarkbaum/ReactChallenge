import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

const styles = {
  article: {
    padding: 10,
    marginBottom: 20
  }
}
class Article extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
    console.log("this.props", this.props)
  }

  handleOpen() {
    this.setState({open: true});
  };

  handleClose() {
    this.setState({open: false});
  };
  

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
        onTouchTap={this.handleClose.bind(this)}
      />,
    ];

    return (
      <Paper style={styles.article} zDepth={2}>
        <div>
          {this.props.article.title}

        </div>
        <div>
          {this.props.article.author}
        </div>
        <div>
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
            />
          </div>
          <div>
            <TextField
              defaultValue={this.props.article.author}
              name='author'
              fullWidth={true}
            />
          </div>
          <div>
            <TextField
              defaultValue={this.props.article.date}
              name='date'
              fullWidth={true}
            />
          </div>
          <div>
            <TextField
              defaultValue={this.props.article.articalBody}
              name='articalBody'
              multiLine
              fullWidth={true}
            />
          </div>
        </Dialog>
      </Paper>
    )
  }
}

export default Article;
