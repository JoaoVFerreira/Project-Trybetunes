import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from '../pages/Carregando';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      getBackFavSOng: [],

    };
    this.keepFavoriteSongs = this.keepFavoriteSongs.bind(this);
  }

  async keepFavoriteSongs(track) {
    this.setState({
      loading: true,
    }, async () => {
      await addSong(track);
      const keep = await getFavoriteSongs();
      this.setState({
        loading: false,
        getBackFavSOng: keep,
      });
    });
  }

  render() {
    const { storeMusic } = this.props;
    const { loading, getBackFavSOng } = this.state;
    const { keepFavoriteSongs } = this;
    if (loading) return <Carregando />;
    console.log(getBackFavSOng);
    return (
      <div>
        {storeMusic.slice(1).map(({ trackName, previewUrl, trackId }) => (
          <div key={ trackId }>
            <p>{ trackName }</p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
              .
            </audio>
            <label htmlFor={ `favorite-${trackId}` }>
              Favorita
              <input
                onChange={ () => keepFavoriteSongs(trackId) }
                id={ `favorite-${trackId}` }
                checked={ getBackFavSOng.some((t) => t === trackId) }
                type="checkbox"
                data-testid={ `checkbox-music-${trackId}` }
              />
            </label>
          </div>
        ))}
      </div>
    );
  }
}

MusicCard.propTypes = {
  storeMusic: PropTypes.arrayOf().isRequired,
};

export default MusicCard;
