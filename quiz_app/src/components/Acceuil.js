import React, { Component } from 'react';

class Acceuil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      currentPage: 1,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    setTimeout(5000);
    if (this.state.data.length > 0) {
      return; 
    }

    fetch('https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple')
      .then((response) => {
        if (response.status === 429) {
          throw new Error('Too many requests. Please wait a moment.');
        }
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((res) => {
        this.setState({
          data: res.results,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          error: error.message,
          loading: false,
        });
        
      });
  }

  paginate = (pageNum)=>{this.setState({currentPage: pageNum});}

  render() {
    const { loading, currentPage, data } = this.state;

    if (loading) {
      return <p>Loading...</p>;
    }

    const currentItem = data[currentPage - 1];

    return (
        <div>
        <h1>Data from API</h1>
        <ul>
          <li key={currentItem.question}>{currentItem.question}</li>
        </ul>
        <div>
          {/* Pagination buttons */}
          {currentPage > 1 && (
            <button onClick={() => this.paginate(currentPage - 1)}>Previous</button>
          )}
          {currentPage < data.length && (
            <button onClick={() => this.paginate(currentPage + 1)}>Next</button>
          )}
        </div>
      </div>
    );
  }
}

export default Acceuil;
