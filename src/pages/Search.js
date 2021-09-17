import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const minCharacter = 2;
    const { artistName } = this.state;
    const { handleChange } = this;
    return (
      <div data-testid="page-search">
        <h1>SEARCH</h1>
        <Header />
        <form>
          <input
            data-testid="search-artist-input"
            type="text"
            name="artistName"
            placeholder="Nome do Artista"
            value={ artistName }
            onChange={ handleChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ artistName.length < minCharacter }
          >
            Procurar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
