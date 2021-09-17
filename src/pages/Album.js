import React, { Component } from 'react';
import Header from '../components/Header';

class Album extends Component {
  render() {
    return (
      <div data-testid="page-album">
        <h1>ALBUM</h1>
        <Header />
      </div>
    );
  }
}

export default Album;
