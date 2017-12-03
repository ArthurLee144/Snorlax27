'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Input = function (_React$Component) {
  _inherits(Input, _React$Component);

  function Input(props) {
    _classCallCheck(this, Input);

    var _this = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, props));

    _this.state = {
      newestTitle: {},
      newestPost: {},
      username: '',
      sentences: [{ 'text': 'I am a dog', 'sentiment': ['confident: 0.5', 'angry: 0.2'] }, { 'text': 'I am a cat', 'sentiment': ['happy: 0.4'] }, { 'text': 'I am a turtle', 'sentiment': ['slow: 0.6', 'confident: 0.8'] }]

    };
    _this.handleTitle = _this.handleTitle.bind(_this);
    _this.handlePost = _this.handlePost.bind(_this);
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    return _this;
  }

  _createClass(Input, [{
    key: 'handlePost',
    value: function handlePost(event) {
      this.setState({ newestPost: event.target.value });
    }
  }, {
    key: 'handleTitle',
    value: function handleTitle(event) {
      this.setState({ newestTitle: event.target.value });
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(event) {
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
        success: function success() {
          console.log('line 37 input.jsx post success');
        }
      }).then(function () {
        context.props.rerender();
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'span',
          null,
          React.createElement(
            'h2',
            { id: 'hello' },
            'Write text to be analyzed'
          ),
          React.createElement(
            'h2',
            { id: 'hello' },
            'Results'
          )
        ),
        React.createElement(
          'div',
          { id: 'inputdisplay' },
          React.createElement(
            'form',
            { id: 'text', onSubmit: this.handleSubmit },
            React.createElement('input', { className: 'form-control', placeholder: 'Enter title of your super awesome diary entry', name: 'title', onChange: this.handleTitle }),
            React.createElement('br', null),
            React.createElement('textarea', { id: 'textarea', type: 'text', name: 'entry', onChange: this.handlePost }),
            React.createElement('br', null),
            React.createElement(
              'button',
              { type: 'submit', className: 'btn btn-submit', value: 'Submit', onClick: this.handleSubmit },
              'Analyze'
            )
          )
        ),
        React.createElement(
          'div',
          { id: 'results' },
          React.createElement('div', { id: 'container' })
        ),
        React.createElement(
          'div',
          { id: 'impactful' },
          'Your most impactful sentences:',
          React.createElement('br', null),
          React.createElement(
            'div',
            null,
            this.state.sentences.map(function (sentence, i) {
              return React.createElement(
                'div',
                null,
                React.createElement(
                  'div',
                  null,
                  sentence.text
                ),
                sentence.sentiment.map(function (emotion) {
                  return React.createElement(
                    'div',
                    null,
                    emotion
                  );
                })
              );
            })
          ),
          React.createElement('br', null)
        )
      );
    }
  }]);

  return Input;
}(React.Component);