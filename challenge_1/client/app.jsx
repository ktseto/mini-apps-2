import React from 'react';
import ReactPaginate from 'react-paginate';
import axios from 'axios';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };

    this.countPerPage = 10;

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    axios.get('/events')
      .then((res) => {
        this.setState({
          data: res.data,
        });
      });
  }

  handleChange(e) {
    const searchString = e.target.value;

    axios.get(`/events?q=${searchString}`)
      .then((res) => {

        this.setState({
          data: res.data,
        });
      })
  }

  render() {
    return (
      <div>
        <input onChange={this.handleChange}></input>
        <ReactPaginate pageCount={this.countPerPage}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={5} />
      </div>
    );
  }
};
