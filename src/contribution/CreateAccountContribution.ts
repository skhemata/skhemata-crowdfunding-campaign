/* eslint-disable import/no-extraneous-dependencies */
import '@power-elements/stripe-elements';
import { CSSResult, html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { Bulma } from '@skhemata/skhemata-css';

export class CreateAccountContribution extends LitElement {
  static styles = <CSSResult[]>[Bulma, css``];

  @property({ type: Boolean }) submitDisabled = false;

  //   firstUpdated() {

  //   }

  render() {
    return html`
      <div class="field">
        <div class="control">
          <input class="input" type="text" placeholder="First Name" />
        </div>
        <div class="control">
          <input class="input" type="text" placeholder="Last Name" />
        </div>
        <div class="control">
          <input class="input" type="email" placeholder="Email" />
        </div>
        <div class="control">
          <input class="input" type="password" placeholder="Password" />
        </div>
        <div class="control">
          <input class="input" type="password" placeholder="Confirm Password" />
        </div>
      </div>
    `;
  }
}
