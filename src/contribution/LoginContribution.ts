/* eslint-disable import/no-extraneous-dependencies */
import '@power-elements/stripe-elements';
import { CSSResult, html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { Bulma } from '@skhemata/skhemata-css';
import { loginRequest } from '../utils/requests';

export class LoginContribution extends LitElement {
  static styles = <CSSResult[]>[Bulma, css`
    .formWrapper {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }

    .formWrapper div {
      width: 100%;
    }
  `];

  @property({ type: Boolean }) submitDisabled = false;

  @property({ type: Boolean }) authState: boolean | undefined;

  @property({ type: Function })
  handleAuthStateChange!: () => void;

  //   firstUpdated() {}

  handleLogin = async () => {
    if(this.shadowRoot) {
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

        const res = await loginRequest('/authenticate', 'POST', info);
        const data = await res.json();
        if(data.auth_token !== undefined) {
          window.localStorage.setItem('skhemataToken', data.auth_token);
        }
        
        this.handleAuthStateChange();
        this.requestUpdate();
      }
  }
  };

  render() {
    return html`
      <div class="field formWrapper">
        <div class="control">
          <input class="input" type="email" placeholder="Email" />
        </div>
        <div class="control">
          <input class="input" type="password" placeholder="Password" />
        </div>

        <button class="button" @click="${this.handleLogin}">
          Login
        </button>
      </div>
    `;
  }
}
