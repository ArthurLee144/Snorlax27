class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newestTitle: {},
      newestPost: {},
      username: '',


    }
    this.handleTitle = this.handleTitle.bind(this);
    this.handlePost = this.handlePost.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }



  handlePost(event) {
    this.setState({newestPost: event.target.value})
  }

  handleTitle(event) {
    this.setState({newestTitle: event.target.value})
  }

  handleSubmit(event) {
    var context = this;
    event.preventDefault();


      $.ajax({
        type: 'POST',
        url: '/entries',
        data: {
          title: this.state.newestTitle,
          text: this.state.newestPost,
          username: this.state.username
        },
        success: function() {
          console.log('line 37 input.jsx post success')
        }
      }).then(function() {
        context.props.rerender();
      });

  }

  render() {
    return(
      <div id="inputdisplay">
      <form id="text" onSubmit={this.handleSubmit}>
        <h2 id="hello">Write text to be analyzed</h2>
        <input className="form-control" placeholder="Enter title of your super awesome diary entry" name="title" onChange={this.handleTitle}></input><br></br>
        <textarea id="textarea" type='text' name="entry" onChange={this.handlePost} /><br></br>
        <button type="submit" className="btn btn-submit" value="Submit" onClick={this.handleSubmit}>Analyze</button>
      </form>
      </div>

    )
  }
}