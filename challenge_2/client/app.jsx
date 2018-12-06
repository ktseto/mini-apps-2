import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const msInDay = 24 * 60 * 60 * 1000;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        labels: [],
        datasets: [{
          label: "",
          data: [],
          borderColor: 'black',
          // backgroundColor: 'rgb(255, 99, 132)',
          // borderColor: 'rgb(255, 99, 132)',
        }]
      },
      start: formatDate(new Date(new Date() - 30 * msInDay)),
      end: formatDate(new Date()),
    };
  }

  componentDidMount() {
    const { start, end } = this.state;

    axios.get(`/bpi?start=${start}&end=${end}`)
      .then((res) => {
        const newData = {
          labels: Object.keys(res.data.bpi),
          datasets: [{
            label: "Historical BPI",
            data: Object.values(res.data.bpi),
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
        <Line data={this.state.data} />
        <div>Powered by CoinDesk</div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
