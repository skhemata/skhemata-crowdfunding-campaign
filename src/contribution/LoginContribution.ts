/* eslint-disable import/no-extraneous-dependencies */
import '@power-elements/stripe-elements';
import { CSSResult, html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { Bulma } from '@skhemata/skhemata-css';
import { loginRequest } from '../utils/requests';
import { GlobalStyles } from '../styles/global';

export class LoginContribution extends LitElement {
  static styles = <CSSResult[]>[
    Bulma,
    GlobalStyles,
    css`
      .formWrapper div {
        width: 100%;
      }
    `,
  ];

  @property({ type: Boolean }) submitDisabled = false;

  @property({ type: Boolean }) authState: boolean | undefined;

  @property({ type: Function })
  handleAuthStateChange!: () => void;

  //   firstUpdated() {}

  handleLogin = async () => {
    if (this.shadowRoot) {
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
        if (data.auth_token !== undefined) {
          window.localStorage.setItem('skhemataToken', data.auth_token);
        }

        this.handleAuthStateChange();
        this.requestUpdate();
      }
    }
  };

  render() {
    return html`
      <div
        class="field formWrapper is-flex is-flex-direction-column is-align-items-flex-end is-flex-gap-4"
      >
        <div class="is-flex is-flex-gap-4">
          <div class="control">
            <input class="input is-size-5" type="email" placeholder="Email" />
          </div>
          <div class="control">
            <input
              class="input is-size-5"
              type="password"
              placeholder="Password"
            />
          </div>
        </div>

        <button
          class="button btnRadius has-background-success has-text-white is-size-5 py-0 px-6"
          @click="${this.handleLogin}"
        >
          Login
        </button>
      </div>
    `;
  }
}
