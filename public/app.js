'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = {
      entries: [],
      userLoggedIn: false,
      username: '',
      name: true,
      sentences: []
    };
    _this.handleLogin = _this.handleLogin.bind(_this);
    _this.handleLogout = _this.handleLogout.bind(_this);
    _this.componentDidMount = _this.componentDidMount.bind(_this);
    _this.filterComponents = _this.filterComponents.bind(_this);
    _this.rerender = _this.rerender.bind(_this);

    return _this;
  }

  _createClass(App, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
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
  }, {
    key: 'handleLogin',
    value: function handleLogin(user) {
      var scope = this;
      $.ajax({
        type: 'GET',
        url: '/entries',
        success: function success(data) {
          scope.setState({ entries: data, userLoggedIn: true });
        }
      });
    }
  }, {
    key: 'handleLogout',
    value: function handleLogout() {
      var scope = this;
      $.ajax({
        type: 'POST',
        url: '/logout',
        success: function success(data) {
          scope.setState({ userLoggedIn: false, entries: [] });
        }
      });
    }
  }, {
    key: 'icons',
    value: function icons() {
      return React.createElement(
        'section',
        null,
        React.createElement(
          'div',
          null,
          React.createElement(
            'h2',
            null,
            'Let an AI analyze your writing for the most effective communication.'
          )
        ),
        React.createElement(
          'div',
          { className: 'ionicon' },
          React.createElement('i', { className: 'ion-ios-glasses-outline icon-big' }),
          React.createElement(
            'h3',
            null,
            'Natural Language API'
          ),
          React.createElement('br', null),
          React.createElement('br', null),
          React.createElement(
            'p',
            null,
            'Emotisphere will analyze the sentiment of your text - so you get a better understanding of your writing and how it can impact others.          '
          )
        )
      );
    }
  }, {
    key: 'seemlessBackground',
    value: function seemlessBackground() {
      return React.createElement(
        'div',
        { className: 'seemless2' },
        React.createElement(
          'div',
          { id: 'centerlog' },
          React.createElement(Login, { handleLogin: this.handleLogin })
        )
      );
    }
  }, {
    key: 'filterNavbar',
    value: function filterNavbar() {
      var scope = this;

      if (this.state.userLoggedIn) {
        return React.createElement(
          'nav',
          { className: 'navbar navbar-default navbar-fixed-bottom' },
          React.createElement(
            'div',
            { className: 'container-fluid' },
            React.createElement(
              'div',
              { className: 'navbar-header' },
              React.createElement(
                'a',
                { className: 'navbar-brand', href: '#top' },
                'Emotisphere'
              )
            ),
            React.createElement(
              'ul',
              { className: 'nav navbar-nav' },
              React.createElement(
                'li',
                null,
                React.createElement(
                  'a',
                  { href: '#top' },
                  'Made with',
                  React.createElement('i', { className: 'ion-android-favorite icon-medium' }),
                  'by Snorlax27 @ California, Maryland, and Toronto'
                )
              )
            ),
            React.createElement('div', { id: 'space' }),
            React.createElement(
              'button',
              { onClick: this.handleLogout, className: 'btn btn-danger navbar-btn' },
              'Logout'
            )
          )
        );
      } else {
        return React.createElement(
          'nav',
          { className: 'navbar navbar-default navbar-fixed-bottom' },
          React.createElement(
            'div',
            { className: 'container-fluid' },
            React.createElement(
              'div',
              { className: 'navbar-header' },
              React.createElement(
                'a',
                { className: 'navbar-brand', href: '#top' },
                'Emotisphere'
              )
            ),
            React.createElement(
              'ul',
              { className: 'nav navbar-nav' },
              React.createElement(
                'li',
                null,
                React.createElement(
                  'a',
                  { href: '#top' },
                  'Made with',
                  React.createElement('i', { className: 'ion-android-favorite icon-medium' }),
                  'by Snorlax27 @ California, Maryland, and Toronto'
                )
              )
            )
          )
        );
      }
    }

    //Display diary in list after post

  }, {
    key: 'rerender',
    value: function rerender() {
      var scope = this;
      if (scope.state.userLoggedIn) {
        $.ajax({
          type: 'GET',
          url: '/entries',
          success: function success(data) {
            scope.setState({ entries: data });
          },
          error: function error(err) {
            console.log('rerender error', err);
          }
        });
      } else {
        $.ajax({
          type: 'GET',
          url: '/guest',
          data: {
            text: this.state.newestPost
          },
          success: function success(data) {
            scope.setState({ sentences: data });
          }
        });
      }
    }
  }, {
    key: 'filterComponents',
    value: function filterComponents() {
      return React.createElement(
        'div',
        null,
        React.createElement(Input, { rerender: this.rerender, loggedIn: this.state.userLoggedIn }),
        React.createElement(
          'div',
          { id: 'results' },
          React.createElement(
            'h2',
            { id: 'hello' },
            'Results'
          ),
          React.createElement('div', { id: 'container' })
        ),
        React.createElement(DiaryList, { list: this.state.entries })
      );
      this.handleLogin = this.handleLogin.bind(this);
      this.handleLogout = this.handleLogout.bind(this);
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        this.filterNavbar(),
        this.icons(),
        this.seemlessBackground(),
        this.filterComponents()
      );
    }
  }]);

  return App;
}(React.Component);

//----------------------------------------
//<Router>
//<Route path='/' component={App}/>
//<Route  path='/login' component={Login}/>
//<Route path='/signup' component={Signup}/>
//</Router>
//----------------------------------------


ReactDOM.render(React.createElement(App, null), document.getElementById('app'));