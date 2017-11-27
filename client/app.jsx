class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [],
      userLoggedIn: false,
      username: '',
      music1: false,
      music2: false,
      music3: false,
      music4: false,
      music5: false,
      name: true
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.filterComponents = this.filterComponents.bind(this);
    this.rerender = this.rerender.bind(this);
    this.playJazz = this.playJazz.bind(this);
    this.playKPOP = this.playKPOP.bind(this);
    this.playTotoro = this.playTotoro.bind(this);
    this.playBeethoven = this.playBeethoven.bind(this);
    this.playRick = this.playRick.bind(this);
  }

  componentDidMount() {
    var scope = this;
    $.ajax({
      type: 'GET',
      url: '/entries',
      success: function(data) {
        scope.setState({ entries: data })
      }
    });

    $(document).on('click', 'a[href^="#"]', function (event) {
      event.preventDefault();

      $('html, body').animate({
          scrollTop: $($.attr(this, 'href')).offset().top
      }, 700);
    });
  }

  playBeethoven() {
    if (this.state.music4) {
      $('#beethoven')[0].src = "//www.youtube.com/embed/6VE33eYgVzw?showinfo=0&controls=0";
      this.state.music4 = false;
    } else {
      $('#beethoven')[0].src += "&autoplay=1";
      this.state.music4 = true;
    }
  }

  playRick() {
    if (this.state.music5) {
      $('#rick')[0].src = "//www.youtube.com/embed/dQw4w9WgXcQ?showinfo=0&controls=0";
      this.state.music5 = false;
    } else {
      $('#rick')[0].src += "&autoplay=1";
      this.state.music5 = true;
    }
  }

  playTotoro() {
    if (this.state.music3) {
      $('#totoro')[0].src = "//www.youtube.com/embed/FJnrKIdIU1E?showinfo=0&controls=0";
      this.state.music3 = false;
    } else {
      $('#totoro')[0].src += "&autoplay=1";
      this.state.music3 = true;
    }
  }

  playJazz() {
    if (this.state.music1) {
      $('#jazz')[0].src = "//www.youtube.com/embed/wKzMlkKNodA?showinfo=0&controls=0";
      this.state.music1 = false;
    } else {
      $('#jazz')[0].src += "&autoplay=1";
      this.state.music1 = true;
    }
  }

  playKPOP() {
    if (this.state.music2) {
      $('#video')[0].src = "//www.youtube.com/embed/dh_EvwzKVoY?showinfo=0&controls=0";
      this.state.music2 = false;
    } else {
      $('#video')[0].src += "&autoplay=1";
      this.state.music2 = true;
    }
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
        scope.setState({userLoggedIn: false});
      }
    })
  }

  randomNameOrder() {
    var result = [];
    var names = ['Super Dan', 'Lord Benji', 'Awesome Mike', 'Sweet Yahzi'];
    for (var i = 3; i >= 0; i--) {
      var random = Math.floor(Math.random() * i);
      if (i === 0) {
        result.push('& ' + names[random]);
      } else {
        result.push(names[random]);
      }
      names.splice(random, 1);
    }
    return result.join(', ');
  }

  icons() {
    return (
      <section>
        <div>
          <h2>Write your diary and let an AI analyze it for you.</h2>
        </div>
          <div className="ionicon">
            <i className="ion-ios-glasses-outline icon-big"></i>
            <h3>Natural Language API</h3><br></br><br></br>
            <p>
               Aylien TextAPI will analyze the sentiment of your text (from negative to positive) - so you get a better understanding of your daily feelings!
            </p>
          </div>
      </section>
    )
  }

  headerRender() {
    var scope = this;
    if (!this.state.userLoggedIn) {
      return(
        <header id="top">
          <nav>
            <div className="row">
              <img src="https://lh3.googleusercontent.com/0xBvdPgDd3s5gaDcq-CNkgoQPtcT5lPxO_SMxyUcz0rAf61OLprSnA2hLMsU5YFTx4LoyaxEcWKJUmcRuJvQ5uDm3q3hiw8QQaMjesuWk-Q4Ow7UP2WAPt8NaIUFbAqvO24V7eux7XzFwiEU8C8NhALt-0Uy-bcKhUEHpJTjj3Wk13OH-cb-zQh0kCVv0Dwcjqyop5EAvu5Yk-TQJxBQ7ZG_BVM8n2wOVyL-Jf7gI6MqXOvhHwyzOwVveqpquNPitCWS3MfGl373LKwaxZHWPTllUYReyTeDvmtUJ1wX1fX3X64DocaNwn4YPfRZg2GiJSom6sD4fxXvAjinm4pWNktHckZjZo_oLj2a451ZnxEBsPfpKm2gmJIoGL7qgCNSuxxQNDDuNo3pE9Bvl-xQoEEHfyaeqDGV1BkzNcXqloCpYJnlnRNxgRQmZ8AEIkgJlpissyxy7LJshyHpvAD5oYK3q1hShq4SaXvUTAp09L6P6Yikj9ylNwNxH6pVtqDBiDfdygIa7gMh4pznA2qLuzz333WeByBGL0OAAnM_4twzyN_9OkpBLsG8GAtc1g=s200-no"></img>
              <ul className="main-nav">
                <li><a href="#signin">Sign In</a></li>
                <li><a href="#signin">Create Account</a></li>
              </ul>
            </div>
            <div className="hero-text-box">

              <h1 id="h1-header">Goodbye solitary.<br></br>Hello together.</h1>
              <button id="audio" onClick={this.playJazz} className="btn btn-warning">Jazz</button><div className="space"></div>
              <button id="audio" onClick={this.playKPOP} className="btn btn-info" href="#">DAN FAV</button><div className="space"></div>
              <button id="audio" onClick={this.playBeethoven} className="btn btn-success" href="#">BEN FAV</button><div className="space"></div>
              <button id="audio" onClick={this.playTotoro} className="btn btn-default" href="#">YAZ FAV</button><div className="space"></div>
              <button id="audio" onClick={this.playRick} className="btn btn-primary" href="#">MIK FAV</button><div className="space"></div>
            </div>
          </nav>
        </header>
      )
    } else {
      return (
        <header id="top">
          <nav>
            <div className="row">
              <img src="https://lh3.googleusercontent.com/0xBvdPgDd3s5gaDcq-CNkgoQPtcT5lPxO_SMxyUcz0rAf61OLprSnA2hLMsU5YFTx4LoyaxEcWKJUmcRuJvQ5uDm3q3hiw8QQaMjesuWk-Q4Ow7UP2WAPt8NaIUFbAqvO24V7eux7XzFwiEU8C8NhALt-0Uy-bcKhUEHpJTjj3Wk13OH-cb-zQh0kCVv0Dwcjqyop5EAvu5Yk-TQJxBQ7ZG_BVM8n2wOVyL-Jf7gI6MqXOvhHwyzOwVveqpquNPitCWS3MfGl373LKwaxZHWPTllUYReyTeDvmtUJ1wX1fX3X64DocaNwn4YPfRZg2GiJSom6sD4fxXvAjinm4pWNktHckZjZo_oLj2a451ZnxEBsPfpKm2gmJIoGL7qgCNSuxxQNDDuNo3pE9Bvl-xQoEEHfyaeqDGV1BkzNcXqloCpYJnlnRNxgRQmZ8AEIkgJlpissyxy7LJshyHpvAD5oYK3q1hShq4SaXvUTAp09L6P6Yikj9ylNwNxH6pVtqDBiDfdygIa7gMh4pznA2qLuzz333WeByBGL0OAAnM_4twzyN_9OkpBLsG8GAtc1g=s200-no"></img>
              <ul className="main-nav">
              </ul>
            </div>
            <div className="hero-text-box">
              <h1 id="h1-header">Goodbye solitary.<br></br>Hello together.</h1>
              <button id="audio" onClick={this.playJazz} className="btn btn-warning">Jazz</button><div className="space"></div>
              <button id="audio" onClick={this.playKPOP} className="btn btn-info" href="#">DAN FAV</button>
              <button id="audio" onClick={this.playBeethoven} className="btn btn-success" href="#">BEN FAV</button><div className="space"></div>
              <button id="audio" onClick={this.playTotoro} className="btn btn-default" href="#">YAZ FAV</button><div className="space"></div>
              <button id="audio" onClick={this.playRick} className="btn btn-primary" href="#">MIK FAV</button><div className="space"></div>
            </div>
          </nav>
        </header>
      )
    }
  }

  seemlessBackground() {
    if (this.state.userLoggedIn) {
      return (
        <div className="seemless2"><h2 id="success">Every great dream begins with a dreamer. Always remember, you have within you the strength, patience, and the passion to reach for the stars to change the world.</h2><h3 id="author">Harriet Tubman</h3></div>
      )
    } else {
      return (
        <div className="seemless">
          <Login handleLogin={this.handleLogin}/>
        </div>
      )
    }
  }

  filterNavbar() {
    var scope = this;
    var message = scope.randomNameOrder();
    if (this.state.userLoggedIn) {
      return (
        <nav className= "navbar navbar-default navbar-fixed-bottom">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#top">Emotisphere</a>
            </div>
            <ul className="nav navbar-nav">

              <li><a href="#top">Made with<i className="ion-android-favorite icon-medium"></i>by Snorlax27 @ California, Maryland, and Toronto // {message}</a></li>
            </ul>
            <div id="space"></div>
            <button onClick={this.handleLogout} className="btn btn-danger navbar-btn">Logout</button>
          </div>
        </nav>
      )
    } else {
      return (
        <nav className = "navbar navbar-default navbar-fixed-bottom">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#top">Emotisphere</a>
            </div>
            <ul className="nav navbar-nav">

              <li><a href="#top">Made with<i className="ion-android-favorite icon-medium"></i>by Snorlax27 @ California, Maryland, and Toronto // {message}</a></li>
            </ul>
          </div>
        </nav>
      )
    }
  }

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
    })
  }

  filterComponents() {
    if (this.state.userLoggedIn) {
      return (
        <div>
          <Input rerender={this.rerender} />
          <DiaryList list={this.state.entries} />
        </div>
      )
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }


  render() {
    return(
      <div>
        {this.headerRender()}
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