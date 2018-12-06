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
      data: {},
      start: formatDate(new Date(new Date() - 30 * msInDay)),
      end: formatDate(new Date()),
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  getData(url) {
    axios.get(url)
      .then((res) => {
        const newData = {
          labels: Object.keys(res.data.bpi),
          datasets: [{
            label: "Historical BPI",
            data: Object.values(res.data.bpi),
            borderColor: 'black',
            fill: false,
          }],
        };

        this.setState({
          data: newData,
        });
      })
  }

  componentDidMount() {
    const { start, end } = this.state;
    this.getData(`/bpi?start=${start}&end=${end}`);
  }

  handleSearch() {
    const { start, end } = this.state;
    this.getData(`/bpi?start=${start}&end=${end}`);
  }

  handleDateChange(e) {
    const newDate = {};
    newDate[e.target.id] = e.target.value;

    this.setState(newDate);
  }

  render() {
    const { data, start, end } = this.state;
    return (
      <div>
        Start date:<input value={start} onChange={this.handleDateChange} id='start' />
        End date:<input value={end} onChange={this.handleDateChange} id='end' />
        <button onClick={this.handleSearch}>Search</button>
        <Line data={data} />
        <div>Powered by CoinDesk</div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
