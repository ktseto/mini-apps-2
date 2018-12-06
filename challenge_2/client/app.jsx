import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        labels: [],
        datasets: [{
          label: "",
          data: [],
          backgroundColor: 'white',
          borderColor: 'black',
          // backgroundColor: 'rgb(255, 99, 132)',
          // borderColor: 'rgb(255, 99, 132)',
        }]
      },
    };
  }

  componentDidMount() {
    axios.get('/bpi')
      .then((res) => {
        const newData = {
          labels: Object.keys(res.data.bpi),
          datasets: [{
            label: "Historical BPI",
            data: Object.values(res.data.bpi),
            backgroundColor: 'black',
            borderColor: 'black',
          }],
        };

        this.setState({
          data: newData,
        });
      })
  }

  render() {
    return (
      <div>
        <Bar data={this.state.data} />
        <div>Powered by CoinDesk</div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
