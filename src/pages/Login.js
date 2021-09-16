import React, { Component } from 'react';
import { createUser } from '../services/userAPI';
import Carregando from './Carregando';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      name: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.clickChange = this.clickChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  async clickChange() {
    const { name } = this.state;
    const { history: { push } } = this.props;
    this.setState(
      { loading: true },
      async () => {
        await createUser({ name });
        push('search');
      },
    );
  }

  render() {
    const { handleChange, clickChange } = this;
    const { name, loading } = this.state;
    const minCharacter = 3;
    return (
      <div data-testid="page-login">
        <form>
          <input
            type="text"
            name="name"
            value={ name }
            placeholder="Entre com o seu NOME"
            data-testid="login-name-input"
            onChange={ handleChange }
          />
          <div>
            <button
              type="button"
              data-testid="login-submit-button"
              name="btn-entrar"
              disabled={ name.length < minCharacter }
              onClick={ clickChange }
            >
              Entrar
            </button>
            { loading && <Carregando /> }
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
