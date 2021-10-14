import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
    this.renderUSer = this.renderUSer.bind(this);
    this.defineUser = this.defineUser.bind(this);
  }

  componentDidMount() {
    this.defineUser();
  }

  async defineUser() {
    const userInfo = await getUser();
    this.setState({
      loading: false,
      userInfo,
    });
  }

  renderUSer() {
    const { userInfo } = this.state;
    const { name, email, image, description } = userInfo;
    return (
      <div className="profile-saved">
        <p><strong>{ name }</strong></p>
        <p><em>{ email }</em></p>
        <div>
          <img src={ image } alt="user-perfil" id="img-perfil" />
        </div>
        <p>{description}</p>
        <Link to="/profile/edit">Change Infos</Link>
      </div>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {(loading) ? <Carregando /> : this.renderUSer()}
      </div>
    );
  }
}

export default Profile;
