/* eslint-disable import/no-extraneous-dependencies */
import '@power-elements/stripe-elements';
import { CSSResult, html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { Bulma } from '@skhemata/skhemata-css';
import { ifDefined } from 'lit/directives/if-defined.js';

export class SkhemataFormStripe extends LitElement {
  static styles = <CSSResult[]>[
    Bulma,
    css`
      stripe-elements {
        --stripe-elements-base-line-height: 1.57rem;
        --stripe-elements-border: 1px solid #dbdbdb;
      }
    `,
  ];

  @property({ type: Object }) error: any;

  @property({ type: Object }) output: any;

  @property({ type: Boolean }) unsupported = false;

  @property({ type: String, attribute: 'publishable-key' }) publishableKey = '';

  @property({ type: Boolean }) submitDisabled = false;

  // Previous:
  @property({ type: Object }) source: any;

  @property({ type: String, attribute: 'secret-key' }) clientSecret = '';

  @property({ type: String, attribute: 'contributionSk' }) contributionSk = '';

  @property({ type: String, attribute: 'contributionId' }) contributionId = '';

  @property({ type: Object }) confirmInfo = {};

  @property({ type: Object }) stripeElements?: HTMLElement | null;

  @property({ type: Object }) stripePaymentRequest?: HTMLElement | null;

  // onChange(e: any) {
  //   this.submitDisabled = !(e.target.complete && !e.target.hasError);
  // }

  // onClick() {
  //   const stripe: any = this.shadowRoot?.querySelector('stripe-elements');
  //   stripe?.createSource();

  //   const stripeRequest: any = this.shadowRoot?.querySelector(
  //     'stripe-payment-request'
  //   );
  //   stripeRequest?.createPaymentMethod({
  //     type: 'card',
  //     card: {
  //       number: '4242424242424242',
  //       exp_month: 12,
  //       exp_year: 2023,
  //       cvc: '123',
  //     },
  //   });
  // }

  onSource(e: any) {
    this.source = e.detail.source;
  }

  // onError(e: any) {
  //   this.error = e.target.error;
  // }

  async firstUpdated() {
    // change to Stripe object ????
    this.stripeElements = this.shadowRoot?.querySelector('stripe-elements');

    this.stripePaymentRequest = this.shadowRoot?.querySelector(
      'stripe-payment-request'
    );
  }

  render() {
    console.log('same key but here: ', this.publishableKey);

    return html`
    <div class="field">
      <label class="label"></label>
      <div class="control">

        <stripe-elements     
          hide-postal-code = "true"  
          publishable-key="${ifDefined(this.publishableKey)}"
        ></stripe-elements>

      </div>
    </div>
  </div>
    `;
  }

  // onChange(e: any) {
  //   this.submitDisabled = !(e.target.complete && !e.target.hasError);
  // }

  // onClick() {
  //   const stripe: any = this.shadowRoot?.querySelector('stripe-elements');
  //   stripe.submit();
  // }

  // onError(e: any) {
  //   this.error = e.target.error;
  // }

  // onFail(event: { detail: any }) {
  //   this.output = event.detail;
  // }

  // onReady() {
  //   this.unsupported = false;
  // }

  // onSuccess(event: { detail: any }) {
  //   this.output = event.detail;
  // }

  // onUnsupported() {
  //   this.unsupported = true;
  // }
}
