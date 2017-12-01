class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: ""
    }
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }

  handleSubmit(event) {
    var scope = this;
    event.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/login',
      data: {
        username: this.state.username,
        password: this.state.password
      },
      success: function(data) {
        console.log('data login.jsx line 24', data)
        if (data === 'true') {
          scope.props.handleLogin(scope.state.username);
        }
      }
    });
  }

  handleCreate(event) {
    event.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/newAccount',
      data: {
        username: this.state.username,
        password: this.state.password
      },
      success: function() {
        console.log('line 23 input.jsx post success')
      }
    });
  }

  handleUsername(e) {
    this.setState({username: e.target.value})
  }

  handlePassword(e) {
    this.setState({password: e.target.value})
  }

  render() {
    return (
    <div className="loginwrapper" id='signin'>
      <form onSubmit={this.handleSubmit}>
        Enter a username: <input id="input" type="text" onChange={this.handleUsername}/>
        Enter a password: <input  id="input" type="text" onChange={this.handlePassword}/>
        <a href="#text"><button id="submit" className="btn btn-success" type="submit" onClick={this.handleSubmit}>Login</button></a>
        <div className="space"></div>
        <a href="#text"><button id="submit" className="btn btn-danger" type="submit" onClick={this.handleCreate}>Create</button></a>
      </form>
    </div>
    )
  }
}

