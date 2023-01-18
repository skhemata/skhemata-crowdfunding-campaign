/* eslint-disable import/no-extraneous-dependencies */
import '@power-elements/stripe-elements';
import { CSSResult, html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { Bulma } from '@skhemata/skhemata-css';
import { GlobalStyles } from '../styles/global';

export class ExpressCheckoutContribution extends LitElement {
  static styles = <CSSResult[]>[
    Bulma,
    GlobalStyles,
    css`
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
    `,
  ];

  @property({ type: Boolean }) submitDisabled = false;

  //   firstUpdated() {

  //   }

  render() {
    return html`
      <div class="field formWrapper">
        <div class="is-flex is-flex-gap-4 control double-box-wrapper">
          <div class="is-flex is-flex-direction-column is-flex-gap-4">
            <input
              class="input is-size-5"
              type="text"
              placeholder="First Name"
            />
            <input
              class="input is-size-5"
              type="text"
              placeholder="Last Name"
            />
          </div>
          <div class="is-flex is-flex-direction-column is-flex-gap-4">
            <input class="input is-size-5" type="email" placeholder="Email" />
            <div class="is-flex is-justify-content-flex-end">
              <button
                class="button btnRadius has-background-success has-text-white is-size-5 py-0 px-6"
              >
                Express Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
