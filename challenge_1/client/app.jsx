import React from 'react';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import Item from './item.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      searchString: '',
    };

    this.perPage = 10;

    this.handleChange = this.handleChange.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  getEvents(endpoint) {
    axios.get(endpoint)
      .then((res) => {
        this.setState({
          data: res.data,
        });
      });
  }

  componentDidMount() {
    this.getEvents(`/events?_limit=${this.perPage}`);
  }

  handleChange(e) {
    this.getEvents(`/events?q=${e.target.value}&_limit=${this.perPage}`);
    this.setState({
      searchString: e.target.value,
    });
  }

  handlePageClick(data) {
    this.getEvents(`/events?q=${this.searchString}&_page=${data.selected}&_limit=${this.perPage}`);
  }

  render() {
    return (
      <div>
        <input onChange={this.handleChange}></input>
        {this.state.data.map((item, index) => <Item key={index} data={item} />)}
        <ReactPaginate pageCount={this.perPage}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={5}
                       onPageChange={this.handlePageClick}
                       />
      </div>
    );
  }
};
