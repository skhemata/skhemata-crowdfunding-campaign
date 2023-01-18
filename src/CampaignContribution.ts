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
import { Bulma } from '@skhemata/skhemata-css';
import { SkhemataFormStripe } from './contribution/SkhemataFormStripe';
import { LoginContribution } from './contribution/LoginContribution';
import { CreateAccountContribution } from './contribution/CreateAccountContribution';
import { ExpressCheckoutContribution } from './contribution/ExpressCheckoutContribution';
import { CardReward } from './components/CardReward';
import { CampaignProfile } from './contribution/CampaignProfile';
import { Menu } from './components/Menu';
import { CardInfo } from './contribution/CardInfo';
import { GlobalStyles } from './styles/global';

export class CampaignContribution extends SkhemataBase {
  static get styles() {
    return <CSSResult[]>[
      ...super.styles,
      Bulma,
      GlobalStyles,
      css`
        stripe-elements {
          --stripe-elements-base-line-height: 1.57rem;
          --stripe-elements-border: 1px solid #dbdbdb;
        }

        body {
          margin: 0 !important;
        }

        .campaign-reward-wrapper {
          position: relative;
          border: 1px solid #e5e5e5;
          border-radius: 9px;
          overflow: hidden;
        }

        .campaign-reward-hover-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: hsla(141, 71%, 48%, 0.75);
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;

          opacity: 0;
          transition: opacity 0.3s ease-in-out;
          /* display: none; */
        }

        .campaign-reward-container {
          gap: 1.5rem;
        }

        .campaign-reward-body {
          padding: 1rem 1.5rem;
        }

        .card-header {
          position: relative;
          cursor: pointer;
          /* border-radius: 9px; */
        }

        .dropdown-icon {
          position: absolute;
          right: 0.5rem;
        }

        .dropdown-icon.is-active {
          transform: rotate(180deg);
        }

        .totalContribution-container {
          border-top: 1px solid #e5e5e5;
        }

        .contributeBtn {
          border-radius: 7.5px;
        }

        .tabs li.is-active a {
          border-bottom-color: hsl(141, 71%, 48%);
          color: hsl(141, 71%, 48%);
        }

        .campaign-categories-list {
          gap: 1.5rem;
        }

        /* 
        *,
        ::before,
        ::after {
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

       
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        input[type='number'] {
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
        } */
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

  @property({ type: String, attribute: 'nameOnCardError' })
  nameOnCardError?: string;

  @property({ type: String, attribute: 'contributionAmountError' })
  contributionAmountError?: string;

  @property({ type: String, attribute: 'stripeCardError' })
  stripeCardError?: string;

  @property({ type: String, attribute: 'campaignError' })
  campaignError?: string;

  @property({ type: String, attribute: 'currentTab' }) currentTab = 'Login';

  @property({ type: Function })
  handleBack!: () => void;

  @property({ type: Object }) error: any;

  @property({ type: Object }) source: any;

  @property({ type: Boolean }) submitDisabled = false;

  @property({ type: Boolean }) loadingState = false;

  @property({ type: Boolean }) authState: boolean | undefined;

  @property({ type: String }) stripeInfoPublishableKey: string | undefined;

  @property({ type: Number }) contributionAmount = 1;

  @property({ type: Object }) stripe?: any;

  @property({ type: String, attribute: 'api_url' }) apiUrl?: string;

  @property({ type: Boolean })
  openStatus = true;

  @property({ type: Function })
  handleAuthStateChange!: () => void;

  @property({ type: Function })
  getStripeKeys!: () => void;

  /**
   * Implement firstUpdated to perform one-time work after
   * the element’s template has been created.
   */

  async firstUpdated() {
    await super.firstUpdated();
    this.handleAuthStateChange();
    this.getStripeKeys();
    this.stripeElements = this.shadowRoot?.querySelector('stripe-elements');
    this.initStripe();
  }

  handleRewardOpen = () => {
    this.openStatus = !this.openStatus;
  };

  initStripe() {
    if (window.Stripe && this.authState && this.stripeInfoPublishableKey) {
      const stripe: any = window.Stripe(this.stripeInfoPublishableKey);
      this.stripe = stripe;
    } else {
      console.log('Stripe is not loaded');
    }
  }

  // handleAuthStateChange = () => {
  //   const authToken = window.localStorage.getItem('skhemataToken');

  //   if (authToken !== null) {
  //     this.authState = true;
  //     this.getStripeKeys();
  //   } else {
  //     this.authState = false;
  //   }
  //   this.requestUpdate();
  // }

  // getStripeKeys = async () => {
  //   const authToken = window.localStorage.getItem('skhemataToken');

  //   // StripeInfo
  //   if(this.authState) {
  //     try {
  //       const response = await fetch(
  //         `${this.apiFull}account/stripe/application`,
  //         {
  //           // credentials: 'include',
  //           headers: {
  //             'X-Auth-Token': authToken || '',
  //           },
  //         }
  //       );
  //       const data = await response.json();
  //       this.stripeInfo.secret_key = data.secret_key;
  //       this.stripeInfoPublishableKey = data.publishable_key;
  //       this.stripeInfo.country_id = data.country_id;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  handleContribution = async () => {
    // https://stripe.com/docs/payments/quickstart

    if (this.nameOnCard && this.contributionAmount) {
      this.nameOnCardError = '';
      this.contributionAmountError = '';

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
        const response = await fetch(`${this.apiFull}account/stripe/2/card/`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('skhemataToken') || '',
          },
          body: JSON.stringify(cardInfo),
        });
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
        const response2 = await fetch(`${this.apiFull}campaign/1/pledge`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('skhemataToken') || '',
          },
          body: JSON.stringify(pledgeInfo),
        });
        const dataResp2 = await response2.json();
        console.log('response2: ', dataResp2);
        if (dataResp2.message === 'Campaign not approved') {
          this.campaignError = 'Campaign not approved';
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
      if (!this.nameOnCard) {
        this.nameOnCardError = 'This field cannot be empty';
      } else {
        this.nameOnCardError = '';
      }

      if (!this.contributionAmount) {
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
  };

  // Login
  handleLogin = async () => {
    const data = {
      email: 'myadmin@thrinacia.com',
      password: '__bootstrap__',
    };

    fetch(`${this.apiFull}authenticate`, {
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
    fetch(`${this.apiFull}logout`, {
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
    console.log('contribution: ', this.stripeInfoPublishableKey);

    return html`
      <campaign-profile
        .apiUrl="${this.apiUrl}"
        .campaign=${this.campaign}
      ></campaign-profile>

      <div class="container mt-4">
        <!-- <script src="https://js.stripe.com/v3/"></script> -->

        <div
          class="is-flex is-justify-content-space-between is-align-items-center my-6"
        >
          <div class="is-flex is-align-items-center campaign-categories-list">
            <span class="pr-5">
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.7125 6.01859C16.6446 6.17395 17.2768 7.05788 17.1214 7.99002L16.5964 11.14H21.6911L22.3071 7.42752C22.4625 6.49538 23.3464 5.86324 24.2786 6.01859C25.2107 6.17395 25.8429 7.05788 25.6875 7.99002L25.1679 11.14H28.2857C29.2339 11.14 30 11.9061 30 12.8543C30 13.8025 29.2339 14.5686 28.2857 14.5686H24.5946L23.4536 21.4257H26.5714C27.5196 21.4257 28.2857 22.1918 28.2857 23.14C28.2857 24.0882 27.5196 24.8543 26.5714 24.8543H22.8804L22.2643 28.5668C22.1089 29.499 21.225 30.1311 20.2929 29.9757C19.3607 29.8204 18.7286 28.9365 18.8839 28.0043L19.4089 24.8597H14.3089L13.6929 28.5722C13.5375 29.5043 12.6536 30.1365 11.7214 29.9811C10.7893 29.8257 10.1571 28.9418 10.3125 28.0097L10.8321 24.8543H7.71429C6.76607 24.8543 6 24.0882 6 23.14C6 22.1918 6.76607 21.4257 7.71429 21.4257H11.4054L12.5464 14.5686H9.42857C8.48036 14.5686 7.71429 13.8025 7.71429 12.8543C7.71429 11.9061 8.48036 11.14 9.42857 11.14H13.1196L13.7357 7.42752C13.8911 6.49538 14.775 5.86324 15.7071 6.01859H15.7125ZM16.0232 14.5686L14.8821 21.4257H19.9768L21.1179 14.5686H16.0232Z"
                  fill="#48C78E"
                />
              </svg>
            </span>

            ${this.campaign?.categories.map(
              (category: { name: string }) =>
                html`<span>${category.name}</span>`
            )}
          </div>

          <menu-component
            .handleAuthStateChange="${this.handleAuthStateChange}"
            .authState="${this.authState}"
            .apiFull="${this.apiFull}"
          ></menu-component>
        </div>

        <div class="columns">
          <div class="column">
            <div class="is-flex is-align-items-center">
              <a
                class="is-flex is-align-items-center"
                @click="${this.handleBack}"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_201_8781)">
                    <path
                      d="M24 12C24 5.37188 18.6281 0 12 0C5.37188 0 0 5.37188 0 12C0 18.6281 5.37188 24 12 24C18.6281 24 24 18.6281 24 12ZM10.0781 5.95312C10.5188 5.5125 11.2312 5.5125 11.6672 5.95312C12.1031 6.39375 12.1078 7.10625 11.6672 7.54219L8.33906 10.8703L18.375 10.875C18.9984 10.875 19.5 11.3766 19.5 12C19.5 12.6234 18.9984 13.125 18.375 13.125H8.33906L11.6672 16.4531C12.1078 16.8937 12.1078 17.6062 11.6672 18.0422C11.2266 18.4781 10.5141 18.4828 10.0781 18.0422L4.82812 12.7969C4.3875 12.3562 4.3875 11.6438 4.82812 11.2078L10.0781 5.95312Z"
                      fill="#48C78E"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_201_8781">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </a>
              <h3 class="titleFont is-size-3 has-text-weight-bold ml-2">
                ${this.authState ? 'Card Information' : 'Account Information'}
              </h3>
            </div>
          </div>
        </div>

        <div class="columns contribution-container-wrapper">
          <div class="column contribution-container-left">
            ${this.authState
              ? html`
                  <!--  Card Information  -->
                  <div class="field">
                    <!-- <div
                      class="is-flex is-align-items-center is-justify-content-space-between mb-4"
                    >
                      <div class="is-flex is-align-items-center">
                        <a
                          class="is-flex is-align-items-center"
                          @click="${this.handleBack}"
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clip-path="url(#clip0_201_8781)">
                              <path
                                d="M24 12C24 5.37188 18.6281 0 12 0C5.37188 0 0 5.37188 0 12C0 18.6281 5.37188 24 12 24C18.6281 24 24 18.6281 24 12ZM10.0781 5.95312C10.5188 5.5125 11.2312 5.5125 11.6672 5.95312C12.1031 6.39375 12.1078 7.10625 11.6672 7.54219L8.33906 10.8703L18.375 10.875C18.9984 10.875 19.5 11.3766 19.5 12C19.5 12.6234 18.9984 13.125 18.375 13.125H8.33906L11.6672 16.4531C12.1078 16.8937 12.1078 17.6062 11.6672 18.0422C11.2266 18.4781 10.5141 18.4828 10.0781 18.0422L4.82812 12.7969C4.3875 12.3562 4.3875 11.6438 4.82812 11.2078L10.0781 5.95312Z"
                                fill="#48C78E"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_201_8781">
                                <rect width="24" height="24" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </a>
                        <h3
                          class="titleFont is-size-3 has-text-weight-bold ml-2"
                        >
                          Card Information
                        </h3>
                      </div>

                      <menu-component
                        .handleAuthStateChange="${this.handleAuthStateChange}"
                        .authState="${this.authState}"
                        .apiFull="${this.apiFull}"
                      ></menu-component>
                    </div> -->

                    <div class="reward-section-box">
                      <div class="control">
                        <input
                          class="input ${this.nameOnCardError
                            ? 'is-danger'
                            : ''}"
                          type="text"
                          placeholder="Name on Card"
                          @change="${this.handleNameOnCardChange}"
                        />
                        ${this.nameOnCardError
                          ? html`<p class="help is-danger">
                              ${this.nameOnCardError}
                            </p>`
                          : html``}
                      </div>

                      <div class="control">
                        <skhemata-form-stripe
                          id="skhemata-form-stripe"
                          .publishableKey=${this.stripeInfoPublishableKey}
                          .contributionSk=${this.contributionObj.secret_key}
                          .contributionId=${this.contributionObj.id}
                          .confirmInfo=${this.contributionObj.confirmInfo}
                        ></skhemata-form-stripe>
                        <!-- ${this.stripeCardError
                          ? html`<p class="help is-danger">
                              ${this.stripeCardError}
                            </p>`
                          : html``} -->
                      </div>
                    </div>
                  </div>
                `
              : html`
                  <!-- Account Information -->
                  <div class="field">
                    <!-- <div class="is-flex is-align-items-center mb-4">
                      <a
                        class="is-flex is-align-items-center"
                        @click="${this.handleBack}"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_201_8781)">
                            <path
                              d="M24 12C24 5.37188 18.6281 0 12 0C5.37188 0 0 5.37188 0 12C0 18.6281 5.37188 24 12 24C18.6281 24 24 18.6281 24 12ZM10.0781 5.95312C10.5188 5.5125 11.2312 5.5125 11.6672 5.95312C12.1031 6.39375 12.1078 7.10625 11.6672 7.54219L8.33906 10.8703L18.375 10.875C18.9984 10.875 19.5 11.3766 19.5 12C19.5 12.6234 18.9984 13.125 18.375 13.125H8.33906L11.6672 16.4531C12.1078 16.8937 12.1078 17.6062 11.6672 18.0422C11.2266 18.4781 10.5141 18.4828 10.0781 18.0422L4.82812 12.7969C4.3875 12.3562 4.3875 11.6438 4.82812 11.2078L10.0781 5.95312Z"
                              fill="#48C78E"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_201_8781">
                              <rect width="24" height="24" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </a>
                      <h3 class="titleFont is-size-3 has-text-weight-bold ml-2">
                        Account Information
                      </h3>
                    </div> -->
                    <div class="tabs">
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
                      ? html` <login-contribution
                          .handleAuthStateChange="${this.handleAuthStateChange}"
                          .authState="${this.authState}"
                        ></login-contribution>`
                      : null}
                    ${this.currentTab === 'CreateAccount'
                      ? html`
                          <create-account-contribution
                            .handleAuthStateChange="${this
                              .handleAuthStateChange}"
                            .authState="${this.authState}"
                          ></create-account-contribution>
                          <!-- <card-information-component></card-information-component> -->
                        `
                      : null}
                    ${this.currentTab === 'ExpressCheckout'
                      ? html`
                          <express-checkout-contribution></express-checkout-contribution>
                          <!-- <card-information-component></card-information-component> -->
                        `
                      : null}
                  </div>
                `}

            <!-- Review Payment -->
            <div class="field review-payment-section mt-6">
              <h3 class="titleFont is-size-4 has-text-weight-bold">
                Review Payment
              </h3>

              <div
                class="is-flex is-justify-content-space-between total-amount-box mt-4 mb-2"
              >
                <p class="is-size-5">Contribution:</p>
                <p class="is-size-5">
                  ${this.currencySymbols[
                    this.campaign?.currencies[0].code_iso4217_alpha
                  ]}
                  ${this.contributionAmount}
                  ${this.campaign?.currencies[0].code_iso4217_alpha}
                </p>
              </div>

              <div
                class="is-flex is-justify-content-space-between total-amount-box mt-2 mb-5"
              >
                <p class="is-size-5">Tip:</p>
                <p class="is-size-5">
                  ${this.currencySymbols[
                    this.campaign?.currencies[0].code_iso4217_alpha
                  ]}
                  ${this.campaign?.tip_amount}
                  ${this.campaign?.currencies[0].code_iso4217_alpha}
                </p>
              </div>

              <div
                class="totalContribution-container is-flex is-justify-content-space-between total-amount-box pt-5 mb-2"
              >
                <h4 class="titleFont is-size-4 has-text-weight-bold">
                  Total Contribution:
                </h4>
                <h4 class="titleFont is-size-4 has-text-weight-bold">
                  ${this.currencySymbols[
                    this.campaign?.currencies[0].code_iso4217_alpha
                  ]}
                  ${this.contributionAmount}
                  ${this.campaign?.currencies[0].code_iso4217_alpha}
                </h4>
              </div>

              <div
                class="is-flex is-justify-content-space-between is-align-items-center contribution-box mt-6"
              >
                <div class="control">
                  <div class="dropdown">
                    <div class="dropdown-trigger">
                      <button
                        class="button has-background-grey-lighter is-size-5"
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
                        <a href="#" class="dropdown-item"
                          >Regular Contribution</a
                        >
                        <a href="#" class="dropdown-item"
                          >Anonymous Contribution</a
                        >
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    class="button contributeBtn has-background-dark has-text-white is-size-5 py-0 px-5 ${this
                      .loadingState
                      ? 'is-loading'
                      : ''}"
                    @click="${this.handleContribution}"
                  >
                    Contribute
                  </button>

                  ${this.campaignError
                    ? html`<p class="help is-danger">${this.campaignError}</p>`
                    : html``}
                </div>
              </div>
            </div>
          </div>

          <!-- Choose Your Reward -->
          <div class="column is-one-third field choose-reward-section">
            <h3
              class="titleFont is-size-5 has-text-weight-bold has-text-centered mb-4"
            >
              Choose Your Reward
            </h3>

            <div class="reward-section-box">
              <!--  -->
              <div
                class="card cardReward campaign-reward-wrapper mb-4 ${this
                  .chosenReward === 'standard'
                  ? 'reward-btn'
                  : ''}"
                @click="${() => this.handleChosenReward('standard')}"
              >
                <header
                  class="card-header has-background-grey-light is-flex is-justify-content-center is-align-items-center py-1"
                  @click="${this.handleRewardOpen}"
                >
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14 24L18 20.95L22 24L20.5 19.05L24.5 16.2H19.6L18 11L16.4 16.2H11.5L15.5 19.05L14 24ZM18 28C16.6167 28 15.3167 27.7373 14.1 27.212C12.8833 26.6873 11.825 25.975 10.925 25.075C10.025 24.175 9.31267 23.1167 8.788 21.9C8.26267 20.6833 8 19.3833 8 18C8 16.6167 8.26267 15.3167 8.788 14.1C9.31267 12.8833 10.025 11.825 10.925 10.925C11.825 10.025 12.8833 9.31233 14.1 8.787C15.3167 8.26233 16.6167 8 18 8C19.3833 8 20.6833 8.26233 21.9 8.787C23.1167 9.31233 24.175 10.025 25.075 10.925C25.975 11.825 26.6873 12.8833 27.212 14.1C27.7373 15.3167 28 16.6167 28 18C28 19.3833 27.7373 20.6833 27.212 21.9C26.6873 23.1167 25.975 24.175 25.075 25.075C24.175 25.975 23.1167 26.6873 21.9 27.212C20.6833 27.7373 19.3833 28 18 28Z"
                      fill="#363636"
                    />
                  </svg>
                  <h4 class="titleFont is-size-4 has-text-weight-bold">
                    No reward
                  </h4>

                  <div
                    class="dropdown-icon ${this.openStatus ? 'is-active' : ''}"
                  >
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18 25.5C17.5781 25.5 17.2031 25.3594 16.9219 25.0781L7.92188 16.0781C7.3125 15.5156 7.3125 14.5312 7.92188 13.9688C8.48438 13.3594 9.46875 13.3594 10.0312 13.9688L18 21.8906L25.9219 13.9688C26.4844 13.3594 27.4688 13.3594 28.0312 13.9688C28.6406 14.5312 28.6406 15.5156 28.0312 16.0781L19.0312 25.0781C18.75 25.3594 18.375 25.5 18 25.5Z"
                        fill="#363636"
                      />
                    </svg>
                  </div>
                </header>
                <div class="card-content ${this.openStatus ? '' : 'is-hidden'}">
                  <div class="content">
                    <div class="control">
                      <input
                        min="1"
                        class="input input-number ${this.contributionAmountError
                          ? 'is-danger'
                          : ''}"
                        type="number"
                        placeholder="Contribution Amount"
                        .value="${this.contributionAmount.toString()}"
                        @input="${this.handleContributionAmount}"
                      />
                      ${this.contributionAmountError
                        ? html`<p class="help is-danger">
                            ${this.contributionAmountError}
                          </p>`
                        : html``}
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
                            .openStatus="${this.chosenReward === pledge.name}"
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
      </div>
    `;
  }
}
