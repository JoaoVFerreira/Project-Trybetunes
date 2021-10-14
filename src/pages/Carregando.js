import React from 'react';
import Loader from 'react-loader-spinner';

export default class Carregando extends React.Component {
  render() {
    return (
      <div id="loading">
        <Loader
          type="BallTriangle"
          color="#00BFFF"
          height={ 80 }
          width={ 80 }
          align="center"
        />
      </div>
    );
  }
}
