import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { storeMusic } = this.props;
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
