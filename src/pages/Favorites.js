import React, { Component } from 'react';
import Header from '../components/Header';

class Favorites extends Component {
  render() {
    return (
      <div data-testid="page-favorites">
        <h1>FAVORITE</h1>
        <Header />
      </div>
    );
  }
}

export default Favorites;
