import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from './Carregando';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      arrayFavoriteSongs: [],
    };
    this.renderFavorites = this.renderFavorites.bind(this);
    this.removeFavorites = this.removeFavorites.bind(this);
  }

  componentDidMount() {
    this.getArtistName();
  }

  async getArtistName() {
    this.setState({ loading: true }, async () => {
      const nomeARTISTA = JSON.parse(localStorage.getItem('ARTISTName'));
      await searchAlbumsAPI(nomeARTISTA);
      let musics = await getMusics(JSON.parse(localStorage.getItem('idALBUM')));
      musics = musics.slice(1);
      const favoriteID = await getFavoriteSongs();
      const i1 = musics.filter(({ trackId }) => trackId === favoriteID[0]);
      const i2 = musics.filter(({ trackId }) => trackId === favoriteID[1]);
      const i3 = musics.filter(({ trackId }) => trackId === favoriteID[2]);
      const i4 = musics.filter(({ trackId }) => trackId === favoriteID[3]);
      const i5 = musics.filter(({ trackId }) => trackId === favoriteID[4]);
      const i6 = musics.filter(({ trackId }) => trackId === favoriteID[5]);
      const i7 = musics.filter(({ trackId }) => trackId === favoriteID[6]);
      const i8 = musics.filter(({ trackId }) => trackId === favoriteID[7]);
      const i9 = musics.filter(({ trackId }) => trackId === favoriteID[8]);
      const i10 = musics.filter(({ trackId }) => trackId === favoriteID[9]);
      const all = [...i1, ...i2, ...i3, ...i4, ...i5, ...i6, ...i7, ...i8, ...i9, ...i10];
      this.setState({
        loading: false,
        arrayFavoriteSongs: all,
      });
    });
  }

  removeFavorites(track) {
    this.setState({ loading: true }, async () => {
      const nomeARTISTA = JSON.parse(localStorage.getItem('ARTISTName'));
      await searchAlbumsAPI(nomeARTISTA);
      let musics = await getMusics(JSON.parse(localStorage.getItem('idALBUM')));
      musics = musics.slice(1);
      await removeSong(track);
      const favoriteID = await getFavoriteSongs();
      const i1 = musics.filter(({ trackId }) => trackId === favoriteID[0]);
      const i2 = musics.filter(({ trackId }) => trackId === favoriteID[1]);
      const i3 = musics.filter(({ trackId }) => trackId === favoriteID[2]);
      const i4 = musics.filter(({ trackId }) => trackId === favoriteID[3]);
      const i5 = musics.filter(({ trackId }) => trackId === favoriteID[4]);
      const i6 = musics.filter(({ trackId }) => trackId === favoriteID[5]);
      const i7 = musics.filter(({ trackId }) => trackId === favoriteID[6]);
      const i8 = musics.filter(({ trackId }) => trackId === favoriteID[7]);
      const i9 = musics.filter(({ trackId }) => trackId === favoriteID[8]);
      const i10 = musics.filter(({ trackId }) => trackId === favoriteID[9]);
      const all = [...i1, ...i2, ...i3, ...i4, ...i5, ...i6, ...i7, ...i8, ...i9, ...i10];
      this.setState({
        loading: false,
        arrayFavoriteSongs: all,
      });
    });
  }

  renderFavorites() {
    const { arrayFavoriteSongs } = this.state;
    return arrayFavoriteSongs.map(({ trackName, previewUrl, trackId }) => (
      <div className="music-style" key={ trackId }>
        <div>
          <p>{ trackName }</p>
        </div>
        <div className="audio">
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
            .
          </audio>
          <label htmlFor={ `favorite-${trackId}` }>
            <span className="tw-heart-box" htmlFor={ `favorite-${trackId}` }>
              <input
                id={ `favorite-${trackId}` }
                type="checkbox"
                data-testid={ `checkbox-music-${trackId}` }
                checked
                onChange={ () => this.removeFavorites(trackId) }
              />
              <span className="tw-heart" />
            </span>
          </label>
        </div>
      </div>
    ));
  }

  render() {
    const { loading, arrayFavoriteSongs } = this.state;
    if (loading) return <Carregando />;
    console.log(arrayFavoriteSongs);
    return (
      <div data-testid="page-favorites">
        <Header />
        { this.renderFavorites()}
      </div>
    );
  }
}

export default Favorites;
