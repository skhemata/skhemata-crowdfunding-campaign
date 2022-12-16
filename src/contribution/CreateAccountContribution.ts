/* eslint-disable import/no-extraneous-dependencies */
import '@power-elements/stripe-elements';
import { CSSResult, html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { Bulma } from '@skhemata/skhemata-css';

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

  //   firstUpdated() {

  //   }

  handleCreateAccount = async () => {
    console.log('Create Account');
    
  }

  render() {
    return html`
      <div class="field formWrapper">
        <div class="control double-box-wrapper">
          <input class="input" type="text" placeholder="First Name" />
          <input class="input" type="text" placeholder="Last Name" />
        </div>
        <div class="control">
          <input class="input" type="email" placeholder="Email" />
        </div>
        <div class="control double-box-wrapper">
          <input class="input" type="password" placeholder="Password" />
          <input class="input" type="password" placeholder="Confirm Password" />
        </div>

        <button class="button" @click="${this.handleCreateAccount}">
          Create Account
        </button>
      </div>
    `;
  }
}
