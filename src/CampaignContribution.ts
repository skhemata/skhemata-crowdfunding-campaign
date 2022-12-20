/* eslint-disable lit/binding-positions */
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
import { CampaignProfile } from './contribution/CampaignProfile';
import { Menu } from './components/Menu';
import { CardInfo } from './contribution/CardInfo';

export class CampaignContribution extends SkhemataBase {
  static get styles() {
    return <CSSResult[]>[
      ...super.styles,
      css`
        stripe-elements {
          --stripe-elements-base-line-height: 1.57rem;
          --stripe-elements-border: 1px solid #dbdbdb;
        }

        *, ::before, ::after {
            box-sizing: border-box;
        }

        .contribution-container-wrapper {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 3rem;

          margin-top: 2rem;
        }

        .reward-section-box {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        /* .choose-reward-section {
          grid-row: 1 / 3;
        } */

        .review-payment-section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .total-amount-box {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .total-amount-box h4 {
          font-weight: 600;
          font-size: 1.5rem;
        }

        .contribution-box {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .btn-back {
          background-color: #000000;
          color: #ffffff;
          padding: 0.2rem 0.7rem;
          border-radius: 0.5rem;
          border: none;
        }

        .contribution-container-left {
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }


        .reward-btn {
          border: 5px solid black;
          border-radius: 0.5rem;
        }

        .cardReward {
          cursor: pointer;
        }

        .title {
          border-bottom: 1px solid rgba(34, 36, 38, 0.15);
          padding-bottom: 4px;
        }

        .review-payment-section .contributeBtn {
          max-height: 40px !important;
        }

        .dropdown .button {
          justify-content: space-between;
          width: 200px;
        }

       /* Chrome, Safari, Edge, Opera */
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        /* Firefox */
        input[type=number] {
          -moz-appearance: textfield;
        }

        .btn-back-wrapper {
          display: grid;
          grid-template-columns: 2fr 1fr; 
        }

        .btn-back-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-right: 3rem;
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
      'campaign-profile': CampaignProfile,
      'menu-component': Menu,
      'card-information-component': CardInfo,
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

  @property({ type: String })
  chosenReward = 'standard';

  @property({ type: Object, attribute: 'currencySymbols' })
  currencySymbols?: any = {
    ALL: 'L',
    AFN: '؋',
    ARS: '$',
    AWG: 'ƒ',
    AUD: '$',
    AZN: '₼',
    BSD: '$',
    BBD: '$',
    BYR: 'p.',
    BZD: 'BZ$',
    BMD: '$',
    BOB: 'Bs.',
    BAM: 'KM',
    BWP: 'P',
    BGN: 'лв',
    BRL: 'R$',
    BND: '$',
    BIF: 'FBu',
    KHR: '៛',
    CAD: '$',
    KYD: '$',
    CLP: '$',
    CNY: '¥',
    COP: '$',
    CRC: '₡',
    HRK: 'kn',
    CUP: '₱',
    CZK: 'Kč',
    DKK: 'kr',
    DOP: 'RD$',
    XCD: '$',
    EGP: '£',
    SVC: '₡',
    EEK: 'kr',
    EUR: '€',
    FKP: '£',
    FJD: '$',
    GHC: 'GH₵',
    GIP: '£',
    GTQ: 'Q',
    GGP: '£',
    GYD: '$',
    HNL: 'L',
    HKD: '$',
    HUF: 'Ft',
    ISK: 'kr',
    INR: '₹',
    IDR: 'Rp',
    IRR: '﷼',
    IMP: '£',
    ILS: '₪',
    JMD: '$',
    JPY: '¥',
    JEP: '£',
    KES: 'KSh',
    KZT: '₸',
    KPW: '₩',
    KRW: '₩',
    KGS: 'лв',
    LAK: '₭',
    LVL: 'Ls',
    LBP: 'ل.ل',
    LRD: '$',
    LTL: 'Lt',
    MKD: 'ден',
    MYR: 'RM',
    MUR: '₨',
    MXN: '$',
    MNT: '₮',
    MZN: 'MT',
    NAD: '$',
    NPR: '₨',
    ANG: 'ƒ',
    NZD: '$',
    NIO: 'C$',
    NGN: '₦',
    NOK: 'kr',
    OMR: 'ر.ع.',
    PKR: '₨',
    PAB: 'B/.',
    PYG: '₲',
    PEN: 'S/.',
    PHP: '₱',
    PLN: 'zł',
    QAR: 'ر.ق',
    RON: 'lei',
    RUB: '₽',
    RMB: '￥',
    SHP: '£',
    SAR: 'ر.س',
    RSD: 'Дин.',
    SCR: '₨',
    SGD: '$',
    SBD: '$',
    SOS: 'Sh.So.',
    ZAR: 'R',
    LKR: 'Rs',
    SEK: 'kr',
    CHF: 'Fr.',
    SRD: '$',
    SYP: '£',
    TZS: 'TSh',
    TWD: 'NT$',
    THB: '฿',
    TTD: 'TT$',
    TRY: '₺',
    TRL: '₺',
    TVD: '$',
    UGX: 'USh',
    UAH: '₴',
    GBP: '£',
    USD: '$',
    UYU: '$U',
    UZS: "so'm",
    VEF: 'Bs.',
    VND: '₫',
    YER: '﷼',
    ZWD: 'Z$',
  };

  @property({ type: Object }) campaign?: any;

  @property({ type: Object }) stripeElements?: HTMLElement | null;

  @property({ type: String, attribute: 'api_full' }) apiFull?: string;

  @property({ type: String, attribute: 'currentPage' }) currentPage?: string;

  @property({ type: String, attribute: 'nameOnCard' }) nameOnCard?: string;

  @property({ type: String, attribute: 'nameOnCardError' }) nameOnCardError?: string;

  @property({ type: String, attribute: 'contributionAmountError' }) contributionAmountError?: string;

  @property({ type: String, attribute: 'stripeCardError' }) stripeCardError?: string;

  @property({ type: String, attribute: 'campaignError' }) campaignError?: string;

  @property({ type: String, attribute: 'currentTab' }) currentTab = 'Login';

  @property({ type: Function })
  handleBack!: () => void;

  @property({ type: Object }) error: any;

  @property({ type: Object }) source: any;

  @property({ type: Boolean }) submitDisabled = false;

  @property({ type: Boolean }) loadingState = false;

  @property({ type: Boolean }) authState = false;

  @property({ type: Number }) contributionAmount = 1;

  @property({ type: Object }) stripe?: any;

  @property({ type: Boolean })
  openStatus = true;

  /**
   * Implement firstUpdated to perform one-time work after
   * the element’s template has been created.
   */

  async firstUpdated() {
    await super.firstUpdated();
    this.handleAuthStateChange();
    await this.getStripeKeys();
    this.stripeElements = this.shadowRoot?.querySelector('stripe-elements');
    this.initStripe();
  }

  handleRewardOpen = () => {
    this.openStatus = !this.openStatus;
  };

  initStripe() {
    if (window.Stripe && this.authState) {
      const stripe: any = window.Stripe(this.stripeInfo.publishable_key);
      this.stripe = stripe;
      
    } else {
      console.log('Stripe is not loaded');
    }
  }

  handleAuthStateChange = () => {
    const authToken = window.localStorage.getItem('skhemataToken');

    if (authToken !== null) {
      this.authState = true;
      this.getStripeKeys();
    } else {
      this.authState = false;
    }
    this.requestUpdate();
  }

  getStripeKeys = async () => {
    const authToken = window.localStorage.getItem('skhemataToken');

    // StripeInfo
    if(this.authState) {
      try {
        const response = await fetch(
          `${this.apiFull}account/stripe/application`,
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
    }
  };

  handleContribution = async () => {
    // https://stripe.com/docs/payments/quickstart

    if(this.nameOnCard && this.contributionAmount) {
      this.nameOnCardError = ''
      this.contributionAmountError = ''

    const skhemataFormStripe: any = this.shadowRoot?.getElementById(
      'skhemata-form-stripe'
    );

    const { stripeElements } = skhemataFormStripe;

      try {
        this.loadingState = true;
        // Get the Stripe token
        const token = await stripeElements?.createToken();
        console.log('token: ', token);
        // Check the card
        const cardInfo = {
          name: this.nameOnCard,
          number: '',
          cvc: '',
          card_token: token.token.id,
        };
        const response = await fetch(
          `${this.apiFull}account/stripe/2/card/`,
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
          amount: this.contributionAmount,
          anonymous_contribution: null,
          anonymous_contribution_partial: null,
          pledge_level_id: null,
          stripe_account_card_id: dataResp.stripe_account_card_id,
          shipping_address_id: null,
          phone_number_id: null,
          use_sca: 1,
        };
        const response2 = await fetch(
          `${this.apiFull}campaign/1/pledge`,
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
        if(dataResp2.message === 'Campaign not approved') {
          this.campaignError = 'Campaign not approved'
        }

        if (dataResp2.payment_intent_status === 'requires_action') {
          // Use Stripe.js to handle required card action

          this.stripe
            .handleCardAction(dataResp2.payment_intent_client_secret)
            .then((result: any) => {
              // if (result.error) {
              console.log('paymentIntent: ', result);

              fetch(
                `${this.apiFull}account/stripe/payment-intent-direct/confirm/${result.paymentIntent.id}`,
                {
                  method: 'POST',
                  credentials: 'include',
                  headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('skhemataToken') || '',
                  },
                  // body: JSON.stringify({}),
                }
              )
                .then(finalRes => {
                  console.log('response final: ', finalRes);
                })
                .catch((e: any) => console.log('e2', e));
            })
            .catch((e: any) => console.log(e));
        }

        this.stripeCardError = '';
        this.loadingState = false;

        this.requestUpdate();
      } catch (error: any) {
        console.log('Error: ', error);
        this.loadingState = false;
        this.stripeCardError = error.message;
      }
    } else {

      if(!this.nameOnCard) {
        this.nameOnCardError = 'This field cannot be empty';
      } else {
        this.nameOnCardError = '';
      }

      if(!this.contributionAmount) {
        this.contributionAmountError = 'This field cannot be empty';
      } else {
        this.contributionAmountError = '';
      }
      
    }

  };

  postData = async (url = '', data = {}) => {
    // Default options are marked with *
    await fetch(url, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('skhemataToken') || '',
      },
      body: JSON.stringify(data),
    });
  };

  dropdownHandle = () => {
    if (this.shadowRoot) {
      const dropdown = this.shadowRoot.querySelector('.dropdown');
      if (dropdown) {
        dropdown.classList.toggle('is-active');
      }
    }
  };

  handleNameOnCardChange = (e: any) => {
    this.nameOnCard = e.target.value;
  }

  // Login
  handleLogin = async () => {
    const data = {
      email: 'myadmin@thrinacia.com',
      password: '__bootstrap__',
    };

    fetch(`${this.apiFull}authenticate`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(user => {
        window.localStorage.setItem('skhemataToken', user.auth_token);
        this.handleAuthStateChange();
        this.requestUpdate();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  // logout
  handleLogout = () => {
    fetch(`${this.apiFull}logout`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        window.localStorage.removeItem('skhemataToken');
        this.handleAuthStateChange();
        this.requestUpdate();
      })
      .catch(e => console.log(e));
  };

  handleTabSwitch = (event: any, tab: string) => {
    this.currentTab = tab;
  };

  handleContributionAmount = (event: any) => {
    const { value } = event.target;
    this.contributionAmount = value;
  };

  handleChosenReward = (reward: string, pledge?: any) => {
    if (reward === 'standard') {
      if (this.contributionAmount > 1) {
        this.contributionAmount = 1;
      }
      this.chosenReward = reward;
      this.openStatus = true;
    } else {
      this.chosenReward = pledge.name;

      this.contributionAmount = pledge.amount;
      this.openStatus = false;
    }
  };


  // https://stripe.com/docs/payments/quickstart

  render() {
    return html`<div class="container">
      <div>
        <campaign-profile .campaign=${this.campaign}></campaign-profile>
      </div>
      <!-- <script src="https://js.stripe.com/v3/"></script> -->
      <div class="btn-back-wrapper">
        <div class="btn-back-container">
          <button class="button btn-back" @click="${this.handleBack}">Back</button>
          
          <div class="contribution-menuWrapper">
            <menu-component .handleAuthStateChange="${this.handleAuthStateChange}" .authState="${this.authState}" .apiFull="${this.apiFull}"></menu-component>
          </div>
        </div>

        <div></div>
      </div>

      <div class="contribution-container-wrapper">
        <div class="contribution-container-left">
          ${this.authState
            ? html`
                <!--  Card Information  -->
                <div class="field">
                  <h3 class="title">Card Information</h3>
                  <div class="reward-section-box">
                    <div class="control">
                      <input
                        class="input ${this.nameOnCardError ? "is-danger" : ""}"
                        type="text"
                        placeholder="Name on Card"
                        @change="${this.handleNameOnCardChange}"
                      />
                      ${this.nameOnCardError ? html`<p class="help is-danger">${this.nameOnCardError}</p>` : html``}
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
                      <!-- ${this.stripeCardError ? html`<p class="help is-danger">${this.stripeCardError}</p>` : html``} -->
                    </div>
                  </div>
                </div>
              `
            : html`
                <!-- Account Information -->
                <div class="field">
                  <h3 class="title">Account Information</h3>
                  <div class="tabs is-boxed">
                    <ul>
                      <li
                        class="${this.currentTab === 'Login'
                          ? 'is-active'
                          : ''}"
                      >
                        <a
                          @click="${(e: any) =>
                            this.handleTabSwitch(e, 'Login')}"
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
                    ? html` <login-contribution .handleAuthStateChange="${this.handleAuthStateChange}" .authState="${this.authState}"></login-contribution>`
                    : null}
                  ${this.currentTab === 'CreateAccount'
                    ? html`
                      <create-account-contribution .handleAuthStateChange="${this.handleAuthStateChange}" .authState="${this.authState}"></create-account-contribution>
                      <!-- <card-information-component></card-information-component> -->
                      `
                    : null}
                  ${this.currentTab === 'ExpressCheckout'
                    ? html `
                      <express-checkout-contribution></express-checkout-contribution>
                      <!-- <card-information-component></card-information-component> -->
                      `
                    : null}
                </div>
              `}

          <!-- Review Payment -->
          <div class="field review-payment-section">
            <h3 class="title">Review Payment</h3>

            <div class="total-amount-box">
              <h4>Total Contribution:</h4>
              <h4>
                <span>
                  ${this.currencySymbols[
                    this.campaign?.currencies[0].code_iso4217_alpha
                  ]}
                  ${this.contributionAmount}
                  ${this.campaign?.currencies[0].code_iso4217_alpha}
                </span>
              </h4>
            </div>

            <div class="contribution-box">
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
                      <a href="#" class="dropdown-item"
                        >Anonymous Contribution</a
                      >
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <button
                  class="button contributeBtn has-background-info has-text-white ${this.loadingState ? 'is-loading' : ''}"
                  @click="${this.handleContribution}"
                >
                  Contribute
                </button>

                ${this.campaignError ? html`<p class="help is-danger">${this.campaignError}</p>` : html``}
              </div>
            </div>
          </div>
        </div>

        <!-- Choose Your Reward -->
        <div class="field choose-reward-section">
          <h3 class="title">Choose Your Reward</h3>

          <div class="reward-section-box">
            <!--  -->
            <div
              class="card cardReward ${this.chosenReward === 'standard'
                ? 'reward-btn'
                : ''}"
              @click="${() => this.handleChosenReward('standard')}"
            >
              <header class="card-header" @click="${this.handleRewardOpen}">
                <p class="card-header-title">
                  <span
                    >No reward selected. I just want to contribute to this
                    campaign.</span
                  >
                </p>
              </header>
              <div class="card-content ${this.openStatus ? '' : 'is-hidden'}">
                <div class="content">
                  <div class="control">
                    <input
                      min="1"
                      class="input input-number ${this.contributionAmountError ? "is-danger" : ""}"
                      type="number"
                      placeholder="Contribution Amount"
                      .value="${this.contributionAmount.toString()}"
                      @input="${this.handleContributionAmount}"
                    />
                    ${this.contributionAmountError ? html`<p class="help is-danger">${this.contributionAmountError}</p>` : html``}
                  </div>
                </div>
              </div>
            </div>
            <!--  -->
            <div class="control">
              ${this.campaign?.pledges && this.campaign?.pledges.length > 0
                ? this.campaign.pledges.map(
                    (pledge: any) => html`
                      <div
                        class="${this.chosenReward === pledge.name
                          ? 'reward-btn'
                          : ''}"
                      >
                        <card-reward-component
                          .pledge=${pledge}
                          .campaign=${this.campaign}
                          .handleChosenReward=${this.handleChosenReward}
                          .handleContributionAmount=${this
                            .handleContributionAmount}
                          .contributionAmount=${this.contributionAmount}
                        ></card-reward-component>
                      </div>
                    `
                  )
                : ''}
            </div>
          </div>
        </div>
      </div>
    </div> `;
  }
}
