import React, { Component } from 'react';
import AlbumCard from '../components/AlbumCard';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from './Carregando';
import Header from '../components/Header';

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
    this.artistNameStorage();
  }

  artistNameStorage() {
    const { artistName } = this.state;
    localStorage.setItem('ARTISTName', JSON.stringify([artistName]));
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
        <Header />
        <div id="search-general">
          <form>
            <input
              id="placeholder-search"
              data-testid="search-artist-input"
              type={ loading ? 'hidden' : 'text' }
              name="artistName"
              placeholder="TYPE ANY ARTIST NAME"
              value={ artistName }
              onChange={ handleChange }
            />
            <button
              id="btn-search"
              type="button"
              style={ { display: loading && 'none' } }
              data-testid="search-artist-button"
              disabled={ artistName.length < minCharacter }
              onClick={ apiFetch }
            >
              Search
            </button>
          </form>
        </div>
        <hr id="brake-line" />
        {loading && <Carregando />}
        {notFoundArtist && <h3>Nenhum álbum foi encontrado</h3>}
        <AlbumCard storeData={ storeData } albumArtistName={ albumArtistName } />
      </div>
    );
  }
}

export default Search;
