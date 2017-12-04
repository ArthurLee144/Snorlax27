class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showChart: false,
      newestTitle: {},
      newestPost: {},
      username: '',
      sentences: [],
      watsonScores: [null, null, null, null, null, null, null]
    }
    this.handleTitle = this.handleTitle.bind(this);
    this.handlePost = this.handlePost.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  chartClick(event) {
    $("#impactful").hide()
    $("#container").show()
  }

  sentencesClick(event) {
    $("#container").hide()
    $("#impactful").show()
  }

  handlePost(event) {
    this.setState({newestPost: event.target.value})
  }

  handleTitle(event) {
    this.setState({newestTitle: event.target.value})
  }

  handleGuestGet() {
    var context = this;
    $.ajax({
        type: 'GET',
        url: '/guest',
        data: {
          text: this.state.newestPost,
        },
        success: function(data) {
          context.setState({
            sentences: data.watsonData.sentences,
            watsonScores: data.watsonData.overallData}, function() {
              console.log('successful get for watson in guest get');
            }
          );
        }
    }).then(function() {
      context.makeChart();
    });
  }

  handleSubmit(event) {
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
          success: function() {
            console.log('line 37 input.jsx post success')
          }
        }).then(function() {
          context.props.rerender();
        });
        context.handleGuestGet();
      } else {
        context.handleGuestGet();
      }
  }

  componentDidMount() {
    var context = this;
    console.log('MAKE MY CHART', context.state.watsonScores);
    context.makeChart();
    $("#impactful").hide()
    }

    makeChart() {
        console.log('makeChart was called')
          var context = this;
          Highcharts.chart('container', {

              chart: {
                  polar: true,
                  type: 'area'
              },

              title: {
                  text: "",
                  x: 0,

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
                  verticalAlign: 'top',
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

  render() {
    return(
      <div>
      <span><h2 id="hello">Write text to be analyzed</h2><h2 id="hello">Results</h2></span>
      <div id="inputdisplay">
      <form id="text" onSubmit={this.handleSubmit.bind(this)}>

        <input className="form-control" placeholder="Optional: Enter title" name="title" onChange={this.handleTitle}></input><br></br>
        <textarea id="textarea" type='text' name="entry" placeholder="Enter text" onChange={this.handlePost} /><br></br>
        <button type="submit" className="btn btn-success" value="Submit" onClick={this.handleSubmit.bind(this)}>Analyze</button>
      </form>
      </div>

      <div id="results">
        <div id="container"></div>

          <div id="impactful">
          Your most impactful sentences:<br/>
              <div>
              {this.state.sentences.map((sentence, i) =>
                <div>
                <div>{sentence.text}</div>
                {sentence.allSentiments.map((emotion) =>
                  <div>{emotion}</div>
                  )}
                </div>
                )}
              </div><br/>
          </div>
        <div id="togglebuttons">
          <button className=" btn btn-info" id="btn-chart" onClick={this.chartClick.bind(this)}>Chart</button>
          <button className=" btn btn-info" id="btn-sentences" onClick={this.sentencesClick.bind(this)}>Line by Line</button>
        </div>
      </div>
      </div>
    )
  }
}