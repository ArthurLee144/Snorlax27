'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DiaryEntry = function (_React$Component) {
  _inherits(DiaryEntry, _React$Component);

  function DiaryEntry(props) {
    _classCallCheck(this, DiaryEntry);

    var _this = _possibleConstructorReturn(this, (DiaryEntry.__proto__ || Object.getPrototypeOf(DiaryEntry)).call(this, props));

    _this.state = {
      entries: [],
      clicked: false,
      sentences: [{ 'text': 'I am a dog', 'sentiment': ['confident: 0.5', 'angry: 0.2'] }, { 'text': 'I am a cat', 'sentiment': ['happy: 0.4'] }, { 'text': 'I am a turtle', 'sentiment': ['slow: 0.6', 'confident: 0.8'] }]
    };
    _this.diaryText = _this.diaryText.bind(_this);
    _this.filterComponents = _this.filterComponents.bind(_this);
    _this.changeState = _this.changeState.bind(_this);
    return _this;
  }

  _createClass(DiaryEntry, [{
    key: 'diaryText',
    value: function diaryText(event) {
      this.setState({ entries: event.target.value });
      console.log('Line 12 DiaryEntry.jsx was run');
    }
  }, {
    key: 'renderSentimentBar',
    value: function renderSentimentBar(sentiment) {
      if (!sentiment) {
        return React.createElement('div', null);
      }
      console.log('SENTIMENT BAR', sentiment);
      var polarity = sentiment.polarity;
      var barType;
      var message;
      if (polarity === 'neutral') {
        message = "Your mood seems indifferent. Are you a robot?";
        barType = "progress-bar progress-bar-warning progress-bar-striped active";
      } else if (polarity === 'positive') {
        message = "Share your positive energy!";
        barType = "progress-bar progress-bar-info progress-bar-striped active";
      } else {
        message = "Where did your smile go?";
        barType = "progress-bar progress-bar-danger progress-bar-striped active";
      }
      return React.createElement(
        'div',
        { className: 'progress' },
        React.createElement(
          'div',
          { className: barType, role: 'progressbar', 'aria-valuemin': '0', 'aria-valuenow': String(sentiment.polarity_confidence * 100), 'aria-valuemax': '100', style: { width: String(sentiment.polarity_confidence * 100) + '%' } },
          '"',
          message,
          '"'
        )
      );
    }
  }, {
    key: 'filterComponents',
    value: function filterComponents() {
      if (!this.props.item.title) {
        this.props.item.title = "Title is not given.";
      }

      if (this.state.clicked) {

        var postDate = new Date(this.props.item.time);
        console.log('THIS IS THE PROPS ITEM', this.props.item);
        return React.createElement(
          'div',
          null,
          React.createElement(
            'h3',
            { className: 'title', onClick: this.changeState },
            this.props.item.title
          ),
          this.renderSentimentBar(this.props.item.sentiment),
          React.createElement(
            'div',
            { className: 'entryInfo' },
            'Entry: ',
            this.props.item.text,
            ' ',
            React.createElement('br', null),
            'Date: ',
            postDate.toDateString(),
            ' ',
            React.createElement('br', null),
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
            React.createElement('br', null),
            React.createElement('br', null)
          )
        );
      } else {
        return React.createElement(
          'div',
          null,
          React.createElement(
            'h3',
            { className: 'title', onClick: this.changeState },
            this.props.item.title
          ),
          this.renderSentimentBar(this.props.item.sentiment)
        );
      }
    }
  }, {
    key: 'changeState',
    value: function changeState() {
      this.setState({ clicked: !this.state.clicked });
    }
  }, {
    key: 'render',
    value: function render() {
      return this.filterComponents();
    }
  }]);

  return DiaryEntry;
}(React.Component);