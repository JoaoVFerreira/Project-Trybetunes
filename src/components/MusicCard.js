import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
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
    const { getBackFavSOng } = this.state;
    if (getBackFavSOng.includes(track)) {
      return this.setState({
        loading: true,
      }, async () => {
        await removeSong(track);
        const removeFavSong = await getFavoriteSongs();
        this.setState({
          loading: false,
          getBackFavSOng: removeFavSong,
        });
      });
    }
    this.setState({
      loading: true,
    }, async () => {
      await addSong(track);
      const store = await getFavoriteSongs();
      this.setState({
        loading: false,
        getBackFavSOng: store,
      });
    });
  }

  render() {
    const { storeMusic } = this.props;
    const { loading, getBackFavSOng } = this.state;
    const { keepFavoriteSongs } = this;
    if (loading) return <Carregando />;
    return (
      <div>
        {storeMusic.slice(1).map(({ trackName, previewUrl, trackId }) => (
          <div className="music-style" key={ trackId }>
            <div className="p">
              <p>{ trackName }</p>
            </div>
            <div className="audio">
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>audio</code>
                .
              </audio>
              <span className="tw-heart-box" htmlFor={ `favorite-${trackId}` }>
                <input
                  onChange={ () => keepFavoriteSongs(trackId) }
                  id={ `favorite-${trackId}` }
                  checked={ getBackFavSOng.includes(trackId)
                  && getBackFavSOng.some((t) => t === trackId) }
                  type="checkbox"
                  data-testid={ `checkbox-music-${trackId}` }
                />
                <span className="tw-heart" />
              </span>
            </div>
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
