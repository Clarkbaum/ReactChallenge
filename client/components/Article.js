import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';

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
        <Dialog 
          title="Edit"
          open={this.state.open}
          actions={actions}
        >
          test dialog
        </Dialog>
      </Paper>
    )
  }
}

export default Article;
