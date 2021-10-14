import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class AlbumCard extends Component {
  doTruncarStr(text, size) {
    return (text.length >= size + 3) ? text.substring(0, size).concat('...') : text;
  }

  render() {
    const { storeData } = this.props;
    const { albumArtistName } = this.props;
    return (
      <div>
        <h3>{albumArtistName && `Álbuns de ${albumArtistName}` }</h3>
        <div className="container-album">
          {storeData.map(({ artistName,
            collectionName,
            artworkUrl100,
            collectionId }) => (
              <div className="album-style" key={ collectionId }>
              <Link
                  to={ `/album/${collectionId}` }
                  data-testid={ `link-to-album-${collectionId}` }
                >
                  <img src={ artworkUrl100 } alt="album-artist" />
                </Link>
              <div className="album-style-2">
                  <h4>{this.doTruncarStr(artistName, 10)}</h4>
                  <p>{this.doTruncarStr(collectionName, 20)}</p>
                </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  albumArtistName: PropTypes.string.isRequired,
  storeData: PropTypes.arrayOf().isRequired,
};

export default AlbumCard;
