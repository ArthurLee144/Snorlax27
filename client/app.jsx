class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [],
      userLoggedIn: false,
      username: '',
      name: true,
      sentences: []
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.filterComponents = this.filterComponents.bind(this);
    this.rerender = this.rerender.bind(this);

  }

  componentDidMount() {
    // var scope = this;
    // $.ajax({
    //   type: 'GET',
    //   url: '/entries',
    //   success: function(data) {
    //     scope.setState({ entries: data })
    //   }
    // });

    $(document).on('click', 'a[href^="#"]', function (event) {
      event.preventDefault();

      $('html, body').animate({
          scrollTop: $($.attr(this, 'href')).offset().top
      }, 700);
    });
  }


  handleLogin(user) {
    var scope = this;
    $.ajax({
      type: 'GET',
      url: '/entries',
      success: function(data) {
        scope.setState({ entries: data, userLoggedIn: true })
      }
    });
  }

  handleLogout() {
    var scope = this;
    $.ajax({
      type: 'POST',
      url: '/logout',
      success: function(data) {
        scope.setState({userLoggedIn: false, entries:[]});
      }
    })
  }


  icons() {
    return (
      <section>
        <div>
          <h2>Let an AI analyze your writing for the most effective communication.</h2>
        </div>
        <div className="ionicon">
          <i className="ion-ios-glasses-outline icon-big"></i>
          <h3>Natural Language API</h3><br></br><br></br>
          <p>
            Emotisphere will analyze the sentiment of your text - so you get a better understanding of your writing and how it can impact others.          </p>
        </div>
      </section>
    )
  }

  seemlessBackground() {
    return (
      <div className="seemless2">

          <Login handleLogin={this.handleLogin}/>

      </div>
    );
  }

  filterNavbar() {
    var scope = this;

    if (this.state.userLoggedIn) {
      return (
        <nav className= "navbar navbar-default navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#top">Emotisphere</a>
            </div>
            <ul className="nav navbar-nav">

              <li><a href="#top">Made with<i className="ion-android-favorite icon-medium"></i>by Snorlax27 @ California, Maryland, and Toronto</a>
              </li>
            </ul>
            <div id="space"></div>
            <button onClick={this.handleLogout} className="btn btn-danger navbar-btn">Logout</button>
          </div>
        </nav>
      );
    } else {
      return (
        <nav className = "navbar navbar-default navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#top">Emotisphere</a>
            </div>
            <ul className="nav navbar-nav">
              <li><a href="#top">Made with<i className="ion-android-favorite icon-medium"></i>by Snorlax27 @ California, Maryland, and Toronto</a>
              </li>
            </ul>
          </div>
        </nav>
      );
    }
  }

  //Display diary in list after post
  rerender() {
    var scope = this;

      $.ajax({
        type: 'GET',
        url: '/entries',
        success: function(data) {
          scope.setState({ entries: data })
        },
        error: function(err) {
          console.log('rerender error', err);
        }
      });

  }

  filterComponents() {
      return (
        <div>

          <Input rerender={this.rerender} loggedIn={this.state.userLoggedIn}/>



          <DiaryList list={this.state.entries} />
          </div>

      );
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  render() {
    return(
      <div>
        {this.filterNavbar()}
        {this.icons()}
        {this.seemlessBackground()}
        {this.filterComponents()}

      </div>
    )
  }

}


//----------------------------------------
//<Router>
//<Route path='/' component={App}/>
//<Route  path='/login' component={Login}/>
//<Route path='/signup' component={Signup}/>
//</Router>
//----------------------------------------


ReactDOM.render(<App/>, document.getElementById('app'));