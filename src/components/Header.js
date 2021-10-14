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
      <>
        <header className="header" data-testid="header-component">
          <Link
            className="header-link"
            to="/search"
            data-testid="link-to-search"
          >
            Search
          </Link>
          <Link
            className="header-link"
            to="/favorites"
            data-testid="link-to-favorites"
          >
            Favorites
          </Link>
          <Link
            className="header-link"
            to="/profile"
            data-testid="link-to-profile"
          >
            Profile
          </Link>
        </header>
        {!receivedName && <Carregando />}
        <h3 id="name-login" data-testid="header-user-name">
          {`Welcome ${nameIs}!`}
        </h3>
      </>
    );
  }
}

export default Header;
