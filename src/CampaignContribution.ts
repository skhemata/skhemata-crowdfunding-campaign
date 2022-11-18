/* eslint-disable lit-a11y/click-events-have-key-events */
/* eslint-disable no-var */
/* eslint-disable class-methods-use-this */
/* eslint-disable prefer-const */
/* eslint-disable consistent-return */
/* eslint-disable lit-a11y/anchor-is-valid */
/* eslint-disable lit-a11y/no-redundant-role */
import {
  html,
  css,
  SkhemataBase,
  property,
  CSSResult,
} from '@skhemata/skhemata-base';
import '@power-elements/stripe-elements';
// import Stripe from 'stripe';
import { SkhemataFormStripe } from './contribution/SkhemataFormStripe';
import { LoginContribution } from './contribution/LoginContribution';
import { CreateAccountContribution } from './contribution/CreateAccountContribution';
import { ExpressCheckoutContribution } from './contribution/ExpressCheckoutContribution';
import { CardReward } from './components/CardReward';

export class CampaignContribution extends SkhemataBase {
  static get styles() {
    return <CSSResult[]>[
      ...super.styles,
      css`
        stripe-elements {
          --stripe-elements-base-line-height: 1.57rem;
          --stripe-elements-border: 1px solid #dbdbdb;
        }
      `,
    ];
  }

  static get scopedElements() {
    return {
      'skhemata-form-stripe': SkhemataFormStripe,
      'login-contribution': LoginContribution,
      'create-account-contribution': CreateAccountContribution,
      'express-checkout-contribution': ExpressCheckoutContribution,
      'card-reward-component': CardReward,
    };
  }

  // static get scopedElements() {
  //   return {
  //   };
  // }
  @property({ type: Object })
  stripeInfo = {
    secret_key: '',
    publishable_key: '',
    country_id: 0,
  };

  @property({ type: Object })
  contributionObj = {
    secret_key: '',
    publishable_key: '',
    id: '',
    confirmInfo: {
      entry_id: '',
      stripe_transaction_id: '',
    },
  };

  @property({ type: Object }) campaign?: any;

  @property({ type: Object }) stripeElements?: HTMLElement | null;

  @property({ type: String, attribute: 'currentPage' }) currentPage?: string;

  @property({ type: String, attribute: 'currentTab' }) currentTab = 'Login';

  @property({ type: Function })
  handleBack!: () => void;

  @property({ type: Object }) error: any;

  @property({ type: Object }) source: any;

  @property({ type: Boolean }) submitDisabled = false;

  @property({ type: Boolean }) authState = false;

  /**
   * Implement firstUpdated to perform one-time work after
   * the element’s template has been created.
   */
  async firstUpdated() {
    await this.getStripeKeys();
    this.stripeElements = this.shadowRoot?.querySelector('stripe-elements');
    console.log('stripeElements', this.stripeElements);
    this.handleAuthStateChange();
  }

  handleAuthStateChange() {
    const authToken = localStorage.getItem('skhemataToken');
    if (authToken) {
      this.authState = true;
    } else {
      this.authState = false;
    }
  }

  getStripeKeys = async () => {
    const authToken = window.localStorage.getItem('skhemataToken');
    console.log('authToken', authToken);

    // StripeInfo
    try {
      const response = await fetch(
        'https://coral.thrinacia.com/api/service/restv1/account/stripe/application',
        {
          // credentials: 'include',
          headers: {
            'X-Auth-Token': authToken || '',
          },
        }
      );
      const data = await response.json();
      this.stripeInfo.secret_key = data.secret_key;
      this.stripeInfo.publishable_key = data.publishable_key;
      this.stripeInfo.country_id = data.country_id;
    } catch (error) {
      console.log(error);
    }
  };

  handleContribution = async () => {
    // https://stripe.com/docs/payments/quickstart
    // const stripe = new Stripe(this.stripeInfo.secret_key);

    const skhemataFormStripe: any = this.shadowRoot?.getElementById(
      'skhemata-form-stripe'
    );

    const { stripeElements } = skhemataFormStripe;

    try {
      // Get the Stripe token
      // const checkIntent = await stripeElements?.createToken();
      // console.log('checkIntent: ', checkIntent);
      const token = await stripeElements?.createToken();
      console.log('token: ', token);
      // Check the card
      const cardInfo = {
        name: 'Alex',
        number: '',
        cvc: '',
        card_token: token.token.id,
      };
      const response = await fetch(
        'https://coral.thrinacia.com/api/service/restv1/account/stripe/2/card/',
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('skhemataToken') || '',
          },
          body: JSON.stringify(cardInfo),
        }
      );
      // Insufficient funds and other errors will be shown here:
      const dataResp = await response.json();
      console.log('response1: ', dataResp);
      // Plege to campaign
      const pledgeInfo = {
        amount: 1,
        anonymous_contribution: null,
        anonymous_contribution_partial: null,
        pledge_level_id: null,
        stripe_account_card_id: dataResp.stripe_account_card_id,
        shipping_address_id: null,
        phone_number_id: null,
        use_sca: 1,
      };
      const response2 = await fetch(
        'https://coral.thrinacia.com/api/service/restv1/campaign/1/pledge',
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('skhemataToken') || '',
          },
          body: JSON.stringify(pledgeInfo),
        }
      );
      const dataResp2 = await response2.json();
      console.log('response2: ', dataResp2);
      if (dataResp2.payment_intent_status === 'requires_action') {
        console.log('requires_action');
      }

      const confirmInfo = {
        entry_id: dataResp2.entry_id,
        stripe_transaction_id: dataResp2.stripe_transaction_id,
      };

      // https://coral.thrinacia.com/api/service/restv1/account/stripe/payment-intent-direct/confirm/pi_3M4AewAU16hwuwkc0VMkLNRK
      const response3 = await fetch(
        `https://coral.thrinacia.com/api/service/restv1/account/stripe/payment-intent-direct/confirm/${dataResp2.charge_id}`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('skhemataToken') || '',
          },
          body: JSON.stringify(confirmInfo),
        }
      );
      const dataResp3 = await response3.json();
      console.log('response3: ', dataResp3);

      this.contributionObj.secret_key =
        dataResp3.next_action.use_stripe_sdk.stripe_js;
      this.contributionObj.id = dataResp3.id;
      this.contributionObj.confirmInfo = confirmInfo;

      // const response4 = await fetch(
      //   `https://coral.thrinacia.com/api/service/restv1/account/stripe/payment-intent-direct/confirm/${dataResp3.result.id}`,
      //   {
      //     method: 'POST',
      //     credentials: 'include',
      //     headers: {
      //       'Content-Type': 'application/json',
      //       'x-auth-token': localStorage.getItem('skhemataToken') || '',
      //     },
      //     body: JSON.stringify(confirmInfo),
      //   }
      // );
      // const dataResp4 = await response4.json();
      // console.log('response4: ', dataResp4);

      // this.contributionObj.secret_key = dataResp3.result.client_secret;
      this.requestUpdate();
    } catch (error) {
      console.log(error);
    }
  };

  postData = async (url = '', data = {}) => {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('skhemataToken') || '',
      },
      body: JSON.stringify(data),
    });
    console.log('response2', response);

    // return response.json();
  };

  dropdownHandle = () => {
    if (this.shadowRoot) {
      const dropdown = this.shadowRoot.querySelector('.dropdown');
      if (dropdown) {
        dropdown.classList.toggle('is-active');
      }
    }
  };

  // onChange(e: any) {
  //   this.submitDisabled = !(e.target.complete && !e.target.hasError);
  // }

  // onClick() {
  //   const stripe: any = this.shadowRoot?.querySelector('stripe-elements');
  //   stripe?.createSource();
  // }

  // onSource(e: any) {
  //   this.source = e.detail.source;
  // }

  // onError(e: any) {
  //   this.error = e.target.error;
  // }

  handleCheck = () => {
    const skhemataFormStripe: any = this.shadowRoot?.getElementById(
      'skhemata-form-stripe'
    );

    const { stripeElements } = skhemataFormStripe;

    stripeElements?.createToken().then((response: any) => {
      console.log('response', response);

      // Payment processsing here
    });
  };

  // Login
  handleLogin = async () => {
    const data = {
      email: 'myadmin@thrinacia.com',
      password: '__bootstrap__',
    };

    fetch('https://coral.thrinacia.com/api/service/restv1/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(user => {
        console.log('Success:', user);
        window.localStorage.setItem('skhemataToken', user.auth_token);
        this.requestUpdate();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  // logout
  handleLogout = () => {
    fetch('https://coral.thrinacia.com/api/service/restv1/logout', {
      method: 'POST',
      // credentials: 'include',
      // mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        console.log(response);
        window.localStorage.removeItem('skhemataToken');
        this.requestUpdate();
        // window.location.reload();
      })
      .catch(e => console.log(e));
  };

  handleTabSwitch = (event: any, tab: string) => {
    this.currentTab = tab;
  };

  // https://stripe.com/docs/payments/quickstart

  render() {
    console.log('contribution key here: ', this.contributionObj.secret_key);

    return html`<div class="container">
      <script src="https://js.stripe.com/v3/"></script>
      <button class="button" @click="${this.handleBack}">Back</button>
      <button class="button" @click="${this.handleCheck}">Check</button>
      <button class="button" @click="${this.handleLogin}">Login</button>
      <button class="button" @click="${this.handleLogout}">Logout</button>
      <div>
        <form id="payment-form">
          <div id="payment-element">
            <!--Stripe.js injects the Payment Element-->
          </div>
          <button id="submit">
            <div class="spinner hidden" id="spinner"></div>
            <span id="button-text">Pay now</span>
          </button>
          <div id="payment-message" class="hidden"></div>
        </form>
      </div>

      ${this.authState
        ? html`
            <div class="field">
              <h3 class="title">Card Information</h3>
              <div class="control">
                <input class="input" type="text" placeholder="Name on Card" />
              </div>
              <div class="control">
                <skhemata-form-stripe
                  id="skhemata-form-stripe"
                  .publishableKey=${this.stripeInfo.publishable_key}
                  .clientSecret=${this.stripeInfo.secret_key}
                  .contributionSk=${this.contributionObj.secret_key}
                  .contributionId=${this.contributionObj.id}
                  .confirmInfo=${this.contributionObj.confirmInfo}
                ></skhemata-form-stripe>
              </div>
            </div>
          `
        : html`
            <div class="tabs">
              <ul>
                <li class="${this.currentTab === 'Login' ? 'is-active' : ''}">
                  <a @click="${(e: any) => this.handleTabSwitch(e, 'Login')}"
                    >Login</a
                  >
                </li>
                <li
                  class="${this.currentTab === 'CreateAccount'
                    ? 'is-active'
                    : ''}"
                >
                  <a
                    @click="${(e: any) =>
                      this.handleTabSwitch(e, 'CreateAccount')}"
                    >Create Account</a
                  >
                </li>
                <li
                  class="${this.currentTab === 'ExpressCheckout'
                    ? 'is-active'
                    : ''}"
                >
                  <a
                    @click="${(e: any) =>
                      this.handleTabSwitch(e, 'ExpressCheckout')}"
                    >Express Checkout</a
                  >
                </li>
              </ul>
            </div>

            ${this.currentTab === 'Login'
              ? html` <login-contribution></login-contribution>`
              : null}
            ${this.currentTab === 'CreateAccount'
              ? html` <create-account-contribution></create-account-contribution>`
              : null}
            ${this.currentTab === 'ExpressCheckout'
              ? html` <express-checkout-contribution></express-checkout-contribution>`
              : null}
          `}

      <div class="field">
        <h3 class="title">Review Payment</h3>
        <div class="control">
          <div class="dropdown">
            <div class="dropdown-trigger">
              <button
                class="button"
                aria-haspopup="true"
                aria-controls="dropdown-menu"
                @click="${this.dropdownHandle}"
              >
                <span>Dropdown button</span>
                <span class="icon is-small">
                  <svg
                    viewbox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style="width: 12px;height: 12px"
                  >
                    <path
                      d="M9.08329 0.666626C8.74996 0.333293 8.24996 0.333293 7.91663 0.666626L4.99996 3.58329L2.08329 0.666626C1.74996 0.333293 1.24996 0.333293 0.916626 0.666626C0.583293 0.999959 0.583293 1.49996 0.916626 1.83329L4.41663 5.33329C4.58329 5.49996 4.74996 5.58329 4.99996 5.58329C5.24996 5.58329 5.41663 5.49996 5.58329 5.33329L9.08329 1.83329C9.41663 1.49996 9.41663 0.999959 9.08329 0.666626Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </span>
              </button>
            </div>
            <div class="dropdown-menu" id="dropdown-menu" role="menu">
              <div class="dropdown-content">
                <a href="#" class="dropdown-item">Regular Contribution</a>
                <a href="#" class="dropdown-item">Anonymous Contribution</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="field">
        <div class="control">
          <input
            min="1"
            class="input"
            type="number"
            placeholder="Contribution Amount"
          />
        </div>
      </div>

      <button class="button" @click="${this.handleContribution}">
        Contribute
      </button>

      <div>
        ${this.campaign?.pledges && this.campaign?.pledges.length > 0
          ? this.campaign.pledges.map(
              (pledge: any) => html`
                <card-reward-component
                  .pledge=${pledge}
                ></card-reward-component>
              `
            )
          : ''}
      </div>
    </div> `;
  }
}
