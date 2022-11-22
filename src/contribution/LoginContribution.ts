/* eslint-disable import/no-extraneous-dependencies */
import '@power-elements/stripe-elements';
import { CSSResult, html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { Bulma } from '@skhemata/skhemata-css';
import { loginRequest } from '../utils/requests';

export class LoginContribution extends LitElement {
  static styles = <CSSResult[]>[Bulma, css``];

  @property({ type: Boolean }) submitDisabled = false;

  //   firstUpdated() {}

  handleLogin = async () => {
    const email = this.shadowRoot?.querySelector(
      'input[type="email"]'
    ) as HTMLInputElement;
    const password = this.shadowRoot?.querySelector(
      'input[type="password"]'
    ) as HTMLInputElement;
    if (email.value && password.value) {
      const info = {
        email: email.value,
        password: password.value,
      };
      console.log('INFO: ', info);

      const res = await loginRequest('/authenticate', 'POST', info);
      const data = await res.json();
      window.localStorage.setItem('skhemataToken', data.auth_token);
      console.log(data);
      this.requestUpdate();
    }
  };

  render() {
    return html`
      <div class="field">
        <div class="control">
          <input class="input" type="email" placeholder="Email" />
        </div>
        <div class="control">
          <input class="input" type="password" placeholder="Password" />
        </div>

        <button class="button" @click="${this.handleLogin}">
          Login and Contribute
        </button>
      </div>
    `;
  }
}
