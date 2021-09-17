import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Carregando from '../pages/Carregando';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      receivedName: false,
      nameIs: '',
    };
  }

  componentDidMount() {
    this.renderNameOrLoading();
  }

  async renderNameOrLoading() {
    this.setState({
      receivedName: false,
    }, async () => {
      const getUserName = await getUser();
      this.setState({
        receivedName: true,
        nameIs: getUserName.name,
      });
    });
  }

  render() {
    const { receivedName, nameIs } = this.state;
    return (
      <header data-testid="header-component">
        <Link to="/search" data-testid="link-to-search"> Search </Link>
        <Link to="/favorites" data-testid="link-to-favorites"> Favorites </Link>
        <Link to="/profile" data-testid="link-to-profile"> Profile </Link>
        <h1>Aqui está o header</h1>
        {!receivedName && <Carregando />}
        <h3 testid="header-user-name">
          {nameIs}
        </h3>
      </header>
    );
  }
}

export default Header;
