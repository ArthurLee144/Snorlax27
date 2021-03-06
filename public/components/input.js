"use strict";

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
      showChart: false,
      newestTitle: {},
      newestPost: {},
      username: '',
      sentences: [],
      watsonScores: [null, null, null, null, null, null, null]
    };
    _this.handleTitle = _this.handleTitle.bind(_this);
    _this.handlePost = _this.handlePost.bind(_this);
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    return _this;
  }

  _createClass(Input, [{
    key: "chartClick",
    value: function chartClick(event) {
      $("#impactful").hide();
      $("#container").show();
    }
  }, {
    key: "sentencesClick",
    value: function sentencesClick(event) {
      $("#container").hide();
      $("#impactful").show();
    }
  }, {
    key: "handlePost",
    value: function handlePost(event) {
      this.setState({ newestPost: event.target.value });
    }
  }, {
    key: "handleTitle",
    value: function handleTitle(event) {
      this.setState({ newestTitle: event.target.value });
    }
  }, {
    key: "handleGuestGet",
    value: function handleGuestGet() {
      var context = this;
      $.ajax({
        type: 'GET',
        url: '/guest',
        data: {
          text: this.state.newestPost
        },
        success: function success(data) {
          context.setState({
            sentences: data.watsonData.sentences,
            watsonScores: data.watsonData.overallData }, function () {
            console.log('successful get for watson in guest get');
          });
        }
      }).then(function () {
        context.makeChart();
      });
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(event) {
      var context = this;
      event.preventDefault();
      if (context.props.loggedIn) {
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
        context.handleGuestGet();
      } else {
        context.handleGuestGet();
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var context = this;
      console.log('MAKE MY CHART', context.state.watsonScores);
      context.makeChart();
      $("#impactful").hide();
    }
  }, {
    key: "makeChart",
    value: function makeChart() {
      var context = this;
      console.log('current state', context.state);
      Highcharts.chart('container', {

        chart: {
          polar: true,
          type: 'area'
        },

        title: {
          text: "",
          x: 0

        },

        pane: {
          size: '75%'
        },

        xAxis: {
          categories: ['Anger', 'Fear', 'Joy', 'Sadness', 'Analytical', 'Confident', 'Tentative'],
          tickmarkPlacement: 'on',
          lineWidth: 0
        },

        yAxis: {
          gridLineInterpolation: 'polygon',
          lineWidth: 0,
          min: 0
        },

        tooltip: {
          shared: true,
          pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.2f}%</b><br/>'
        },

        legend: {
          align: 'center',
          verticalAlign: 'top'
          //     y: 100,
          //     layout: 'vertical'
        },

        series: [{
          name: 'Sentiment Scores (0-100)',
          data: context.state.watsonScores,
          pointPlacement: 'on'
        }]
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "span",
          null,
          React.createElement(
            "h2",
            { id: "hello" },
            "Write text to be analyzed"
          ),
          React.createElement(
            "h2",
            { id: "hello" },
            "Results"
          )
        ),
        React.createElement(
          "div",
          { id: "inputdisplay" },
          React.createElement(
            "form",
            { id: "text", onSubmit: this.handleSubmit.bind(this) },
            React.createElement("input", { className: "form-control", placeholder: "Optional: Enter title", name: "title", onChange: this.handleTitle }),
            React.createElement("br", null),
            React.createElement("textarea", { id: "textarea", type: "text", name: "entry", placeholder: "Enter text", onChange: this.handlePost }),
            React.createElement("br", null),
            React.createElement(
              "button",
              { type: "submit", className: "btn btn-success", value: "Submit", onClick: this.handleSubmit.bind(this) },
              "Analyze"
            )
          )
        ),
        React.createElement(
          "div",
          { id: "results" },
          React.createElement("div", { id: "container" }),
          React.createElement(
            "div",
            { id: "impactful" },
            React.createElement("br", null),
            React.createElement(
              "h4",
              null,
              "Your most impactful sentences:"
            ),
            React.createElement("br", null),
            React.createElement(
              "div",
              null,
              this.state.sentences.map(function (sentence, i) {
                return React.createElement(
                  "div",
                  null,
                  React.createElement(
                    "h4",
                    null,
                    sentence.text
                  ),
                  sentence.allSentiments.map(function (emotion) {
                    return React.createElement(
                      "div",
                      null,
                      emotion
                    );
                  }),
                  React.createElement("br", null)
                );
              })
            ),
            React.createElement("br", null)
          ),
          React.createElement(
            "div",
            { id: "togglebuttons" },
            React.createElement(
              "button",
              { className: " btn btn-info", id: "btn-chart", onClick: this.chartClick.bind(this) },
              "Chart"
            ),
            React.createElement(
              "button",
              { className: " btn btn-info", id: "btn-sentences", onClick: this.sentencesClick.bind(this) },
              "Line by Line"
            )
          )
        )
      );
    }
  }]);

  return Input;
}(React.Component);