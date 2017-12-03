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
    console.log('handleSubmit login called');
    console.log(this.state.username);
    console.log(this.state.password)

    var scope = this;
    if (event) {
      event.preventDefault();
    }
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
          scope.props.handleLogin(scope.state.username)
        }
      },
      error: function(errorType, warn, exception) {
        //should render some warning to user
        console.log('error was thorwn')
        console.log('errorType', errorType)
        console.log('warn', warn)
        console.log('exception', exception)
      }
    });
  }

  handleCreate(event) {
    var scope = this;
    event.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/newAccount',
      data: {
        username: this.state.username,
        password: this.state.password
      },
      success: function() {
        console.log('handleCreate success')
        scope.handleSubmit()
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

        <div className="tab">
          Enter a username:
        </div>
         <input id="input" type="text" onChange={this.handleUsername}/>

        <div className="tab">
          Enter a password:
        </div>
          <input  id="input" type="text" onChange={this.handlePassword}/>

        <a href="#text">
          <button id="submit" className="btn" type="submit" onClick={this.handleSubmit}>
            Login
          </button>
        </a>

        <div className="space"></div>

        <a href="#text">
          <button id="submit" className="btn" type="submit" onClick={this.handleCreate}>
            Create
          </button>
        </a>

        <a href="#text">
          <button id="submit" className="btn" type="submit">
            Continue as a Guest
          </button>
        </a>

      </form>
    </div>
    )
  }
}