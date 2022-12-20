/* eslint-disable import/no-extraneous-dependencies */
import '@power-elements/stripe-elements';
import { CSSResult, html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { Bulma } from '@skhemata/skhemata-css';
import { loginRequest } from '../utils/requests';

export class CreateAccountContribution extends LitElement {
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

    .double-box-wrapper {
      display: flex;
      flex-direction: row;
      gap: 1rem;
    }
  `];

  @property({ type: Boolean }) submitDisabled = false;

  @property({ type: Boolean }) authState = false;

  @property({ type: Function })
  handleAuthStateChange!: () => void;

  //   firstUpdated() {

  //   }

  handleCreateAccount = async () => {
    if(this.shadowRoot) {
      const firstName = this.shadowRoot?.getElementById('firstName') as HTMLInputElement;
      const lastName = this.shadowRoot?.getElementById('lastName') as HTMLInputElement;
      const email = this.shadowRoot?.getElementById('email') as HTMLInputElement;
      const password = this.shadowRoot?.getElementById('password') as HTMLInputElement;
      const confirmPassword = this.shadowRoot?.getElementById('confirmPassword') as HTMLInputElement;

      if (email.value && password.value && firstName.value && lastName.value && password.value === confirmPassword.value) {
        const info = {
          email: email.value,
          first_name: firstName.value,
          inline_registration: true,
          last_name: lastName.value,
          password: password.value,
          password_confirm: confirmPassword.value,
        }

        const res = await loginRequest('/register', 'POST', info);
        const data = await res.json();
        if(data.auth_token !== undefined) {
          window.localStorage.setItem('skhemataToken', data.auth_token);
        }
        this.handleAuthStateChange();
        this.requestUpdate();

      } else if(password.value !== confirmPassword.value) {
          console.log('Passwords do not match');
          
        } else {
          console.log('Please fill out all fields');
        }
  }

    
    
  }

  render() {
    return html`
      <div class="field formWrapper">
        <div class="control double-box-wrapper">
          <input class="input" type="text" id="firstName" placeholder="First Name" />
          <input class="input" type="text" id="lastName" placeholder="Last Name" />
        </div>
        <div class="control">
          <input class="input" type="email" id="email" placeholder="Email" />
        </div>
        <div class="control double-box-wrapper">
          <input class="input" type="password" id="password" placeholder="Password" />
          <input class="input" type="password" id="confirmPassword" placeholder="Confirm Password" />
        </div>

        <button class="button" @click="${this.handleCreateAccount}">
          Create Account
        </button>
      </div>
    `;
  }
}
