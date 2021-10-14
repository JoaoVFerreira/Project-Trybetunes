import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      storeMusic: [],
    };
    this.listMusicApi = this.listMusicApi.bind(this);
  }

  componentDidMount() {
    this.listMusicApi();
  }

  async listMusicApi() {
    const { match: { params: { id } } } = this.props;
    this.setState({ storeMusic: await getMusics(id) });
    localStorage.setItem('idALBUM', JSON.stringify(id));
  }

  render() {
    const { storeMusic } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {storeMusic.length
        && <h2 data-testid="artist-name">{ storeMusic[0].artistName }</h2>}
        {storeMusic.length
        && <h3 data-testid="album-name">{storeMusic[0].collectionName}</h3>}
        { storeMusic.length && <MusicCard storeMusic={ storeMusic } /> }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
