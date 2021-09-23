import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class AlbumCard extends Component {
  render() {
    const { storeData } = this.props;
    const { albumArtistName } = this.props;
    return (
      <section>
        <h3>{albumArtistName && `Resultado de álbuns de: ${albumArtistName}` }</h3>
        {storeData.map(({ artistName, collectionName, artworkUrl100, collectionId }) => (
          <div key={ collectionId }>
            <Link
              to={ `/album/${collectionId}` }
              data-testid={ `link-to-album-${collectionId}` }
            >
              <div>
                <img src={ artworkUrl100 } alt="alguma-imagem-ai" />
                <h4>{artistName}</h4>
                <p>{collectionName}</p>
              </div>
            </Link>
          </div>
        ))}
      </section>
    );
  }
}

AlbumCard.propTypes = {
  albumArtistName: PropTypes.string.isRequired,
  storeData: PropTypes.arrayOf().isRequired,
};

export default AlbumCard;
