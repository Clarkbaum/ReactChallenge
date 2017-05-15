import React from 'react';
import FlatButton from 'material-ui/FlatButton';

class Article extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      
    };
    console.log("this.props", this.props)
  }
  

  render() {
    return (
      <div>
        <div>
          {this.props.article.title}
          <FlatButton label="Default"/>
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
      </div>
    )
  }
}

export default Article;
