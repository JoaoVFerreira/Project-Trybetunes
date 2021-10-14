import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { updateUser } from '../services/userAPI';
import Carregando from './Carregando';

class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      image: '',
      description: '',
      loading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  async saveChanges() {
    const { history: { push } } = this.props;
    const { name, email, image, description } = this.state;
    this.setState({
      loading: true,
    }, async () => {
      await updateUser({
        name,
        email,
        image,
        description,
      });
      this.setState({
        name: '',
        email: '',
        image: '',
        description: '',
        loading: false,
      });
      push('/profile');
    });
  }

  render() {
    const { name, email, image, description, loading } = this.state;
    if (loading) return <Carregando />;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <h3 id="eH3">Change your information profile by editing the following inputs!</h3>
        <div className="edit-profile">
          <form>
            <div className="edit">
              <input
                className="input-edit"
                type="text"
                value={ name }
                name="name"
                placeholder="NAME"
                onChange={ this.handleChange }
                required
              />
            </div>
            <div className="edit">
              <input
                className="input-edit"
                type="email"
                value={ email }
                name="email"
                placeholder="EMAIL"
                onChange={ this.handleChange }
                required
              />
            </div>
            <div className="edit">
              <input
                className="input-edit"
                type="text"
                value={ image }
                name="image"
                placeholder="URL IMAGE"
                onChange={ this.handleChange }
                required
              />
            </div>
            <div className="edit">
              <input
                className="input-edit"
                type="text"
                value={ description }
                name="description"
                placeholder="DESCRIPTION"
                onChange={ this.handleChange }
                required
              />
            </div>
            <input
              className="edit-btn"
              type="button"
              value="SAVE"
              onClick={ () => this.saveChanges() }
            />
          </form>
        </div>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.objectOf(
    PropTypes.func,
  ).isRequired,
};

export default ProfileEdit;
