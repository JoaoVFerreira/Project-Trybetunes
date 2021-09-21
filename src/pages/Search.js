import React, { Component } from 'react';
import AlbumCard from '../components/AlbumCard';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from './Carregando';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
      storeData: [],
      loading: false,
      notFoundArtist: null,
      albumArtistName: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.apiFetch = this.apiFetch.bind(this);
  }

  handleChange(event) {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  }

  async apiFetch() {
    const { artistName } = this.state;
    this.setState(
      {
        loading: true,
        albumArtistName: artistName,
      },
      async () => {
        const apiCall = await searchAlbumsAPI(artistName);
        this.setState({
          storeData: apiCall,
          artistName: '',
          loading: false,
        },
        () => {
          if (apiCall.length === 0) this.setState({ notFoundArtist: true });
          if (apiCall.length > 0) this.setState({ notFoundArtist: false });
        });
      },
    );
  }

  render() {
    const minCharacter = 2;
    const { artistName,
      albumArtistName,
      storeData, loading,
      notFoundArtist } = this.state;
    const { handleChange, apiFetch } = this;
    return (
      <div data-testid="page-search">
        <h1>SEARCH</h1>
        <Header />
        <form>
          <input
            data-testid="search-artist-input"
            type={ loading ? 'hidden' : 'text' }
            name="artistName"
            placeholder="Nome do Artista"
            value={ artistName }
            onChange={ handleChange }
          />
          <button
            type="button"
            style={ { display: loading && 'none' } }
            data-testid="search-artist-button"
            disabled={ artistName.length < minCharacter }
            onClick={ apiFetch }
          >
            Procurar
          </button>
        </form>
        {loading && <Carregando />}
        {notFoundArtist && <h3>Nenhum álbum foi encontrado</h3>}
        <AlbumCard storeData={ storeData } albumArtistName={ albumArtistName } />
      </div>
    );
  }
}

export default Search;
