/* eslint-disable lit-a11y/anchor-is-valid */
/* eslint-disable lit-a11y/click-events-have-key-events */
/* eslint-disable import/no-extraneous-dependencies */
import { CSSResult, html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { Bulma } from '@skhemata/skhemata-css';
import { GlobalStyles } from '../styles/global';

export class CardReward extends LitElement {
  static styles = <CSSResult[]>[
    Bulma,
    GlobalStyles,
    css`
      /* .cardReward {
        max-width: 300px;
        margin: 0 auto;
      } */

      .cardReward header {
        cursor: pointer;
      }

      /* Chrome, Safari, Edge, Opera */
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      /* Firefox */
      input[type='number'] {
        -moz-appearance: textfield;
      }

      .pledge-date {
        margin: 1rem 0;
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

      .campaign-reward-wrapper:hover .campaign-reward-hover-background {
        opacity: 1;
        /* display: flex; */
      }

      .campaign-reward-container {
        gap: 1.5rem;
      }

      .campaign-reward-body {
        padding: 1rem 1.5rem;
      }

      .card-header {
        position: relative;
      }

      .dropdown-icon {
        position: absolute;
        right: 0.5rem;
      }

      .dropdown-icon.is-active {
        transform: rotate(180deg);
      }
    `,
  ];

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

  @property({ type: Object }) pledge: any;

  @property({ type: Object }) campaign?: any;

  @property({ type: Boolean }) openStatus: boolean | undefined;

  @property({ type: Function })
  handleContribute!: () => void;

  @property({ type: Function })
  handleContributionAmount!: () => void;

  @property({ type: Number })
  contributionAmount = 0;

  @property({ type: Function })
  handleChosenReward!: (reward: string, pledge: object) => void;

  async firstUpdated() {
    this.contributionAmount = this.pledge.amount;
  }

  render() {
    return html`
      <div class="cardReward campaign-reward-wrapper mb-4">
        <header
          class="card-header has-background-success is-flex is-justify-content-center is-align-items-center"
          @click="${() =>
            this.handleChosenReward(this.pledge.name, this.pledge)}"
        >
          <svg
            width="44"
            height="45"
            viewBox="0 0 44 45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M34 14.583C34 15.4268 33.3297 16.2049 32.2 16.833C30.8359 17.5877 28.8016 18.1221 26.4672 18.2814C26.2937 18.1971 26.1203 18.1174 25.9375 18.0471C24.0906 17.2736 21.6344 16.833 19 16.833C18.6109 16.833 18.2313 16.8424 17.8516 16.8611L17.8 16.833C16.6703 16.2049 16 15.4268 16 14.583C16 12.5111 20.0312 10.833 25 10.833C29.9688 10.833 34 12.5111 34 14.583ZM17.5328 18.3846C18.0109 18.3518 18.5031 18.333 19 18.333C21.9156 18.333 24.5031 18.9096 26.1484 19.8049C27.3109 20.4377 28 21.2252 28 22.083C28 22.2705 27.9672 22.4533 27.9016 22.6314C27.6859 23.2502 27.1047 23.8174 26.2609 24.2955C26.2562 24.3002 26.2469 24.3002 26.2422 24.3049C26.2281 24.3143 26.2141 24.3189 26.2 24.3283C24.5594 25.2377 21.9437 25.8283 19 25.8283C16.2063 25.8283 13.7078 25.2986 12.0531 24.4643C11.9641 24.4221 11.8797 24.3752 11.7953 24.3283C10.6703 23.7049 10 22.9268 10 22.083C10 20.4518 12.5031 19.0596 16 18.5486C16.4922 18.4783 17.0031 18.4221 17.5328 18.3846ZM29.5 22.083C29.5 21.0564 29.0031 20.2127 28.3703 19.5799C29.6969 19.3736 30.9109 19.0455 31.9422 18.6189C32.7063 18.3002 33.4188 17.9064 34 17.4236V19.083C34 19.9877 33.2266 20.8221 31.9469 21.4689C31.2625 21.8158 30.4281 22.1111 29.4906 22.3361C29.4953 22.2518 29.5 22.1721 29.5 22.0877V22.083ZM28 26.583C28 27.4268 27.3297 28.2049 26.2 28.833C26.1156 28.8799 26.0313 28.9221 25.9422 28.9689C24.2922 29.8033 21.7937 30.333 19 30.333C16.0563 30.333 13.4406 29.7424 11.8 28.833C10.6703 28.2049 10 27.4268 10 26.583V24.9236C10.5859 25.4064 11.2938 25.8002 12.0578 26.1189C13.9094 26.8924 16.3656 27.333 19 27.333C21.6344 27.333 24.0906 26.8924 25.9422 26.1189C26.3078 25.9689 26.6594 25.7955 26.9922 25.608C27.2781 25.4486 27.5453 25.2705 27.7984 25.083C27.8688 25.0314 27.9344 24.9752 28 24.9236V25.083V25.3502V26.583ZM29.5 26.583V25.083V23.8689C30.3906 23.6721 31.2109 23.4236 31.9422 23.1189C32.7063 22.8002 33.4188 22.4064 34 21.9236V23.583C34 24.0752 33.7656 24.5674 33.3016 25.0314C32.5375 25.7955 31.1922 26.4236 29.4906 26.8314C29.4953 26.7518 29.5 26.6674 29.5 26.583V26.583ZM19 31.833C21.6344 31.833 24.0906 31.3924 25.9422 30.6189C26.7063 30.3002 27.4188 29.9064 28 29.4236V31.083C28 33.1549 23.9688 34.833 19 34.833C14.0312 34.833 10 33.1549 10 31.083V29.4236C10.5859 29.9064 11.2938 30.3002 12.0578 30.6189C13.9094 31.3924 16.3656 31.833 19 31.833Z"
              fill="#363636"
            />
          </svg>
          <h4 class="titleFont is-size-4 has-text-weight-bold">
            ${this.currencySymbols[
              this.campaign?.currencies[0].code_iso4217_alpha
            ]}
            ${this.pledge.amount}
            ${this.campaign?.currencies[0].code_iso4217_alpha}
          </h4>
          <div class="dropdown-icon ${this.openStatus ? 'is-active' : ''}">
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
            <h4 class="titleFont is-size-5 has-text-weight-bold mb-2">
              ${this.pledge.name}
            </h4>
            <p class="is-size-6 mb-4">${this.pledge.description}</p>
            <div class="is-flex is-align-items-center">
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24.6 14.4285C26.2575 14.4285 27.6 13.0966 27.6 11.4523C27.6 9.80792 26.2575 8.47607 24.6 8.47607C22.9425 8.47607 21.6 9.80792 21.6 11.4523C21.6 13.0966 22.9425 14.4285 24.6 14.4285ZM10.8 14.4285C12.4575 14.4285 13.8 13.0966 13.8 11.4523C13.8 9.80792 12.4575 8.47607 10.8 8.47607C9.1425 8.47607 7.8 9.80792 7.8 11.4523C7.8 13.0966 9.1425 14.4285 10.8 14.4285ZM30 19.5884C30 17.3972 28.2075 15.6189 25.9987 15.6189H24.3975C23.8012 15.6189 23.235 15.7491 22.725 15.9798C22.7737 16.2477 22.7962 16.5267 22.7962 16.8094C22.7962 18.2305 22.1662 19.5066 21.1725 20.3808C21.18 20.3808 21.1875 20.3808 21.1987 20.3808H29.2012C29.64 20.3808 30 20.0237 30 19.5884ZM14.8012 20.3808C14.8087 20.3808 14.8162 20.3808 14.8275 20.3808C13.83 19.5066 13.2037 18.2305 13.2037 16.8094C13.2037 16.5267 13.23 16.2514 13.275 15.9798C12.765 15.7454 12.1987 15.6189 11.6025 15.6189H10.0012C7.7925 15.6189 6 17.3972 6 19.5884C6 20.0274 6.36 20.3808 6.79875 20.3808H14.8012ZM14.4 16.8094C14.4 18.7811 16.0125 20.3808 18 20.3808C19.9875 20.3808 21.6 18.7811 21.6 16.8094C21.6 14.8377 19.9875 13.238 18 13.238C16.0125 13.238 14.4 14.8377 14.4 16.8094ZM25.2 26.5304C25.2 23.7923 22.9613 21.5713 20.2013 21.5713H15.7987C13.0387 21.5713 10.8 23.7923 10.8 26.5304C10.8 27.0773 11.2462 27.5237 11.8012 27.5237H24.1987C24.75 27.5237 25.2 27.081 25.2 26.5304V26.5304Z"
                  fill="#48C78E"
                />
              </svg>
              <span class="is-size-6 ml-2"
                >${this.pledge.total_backers}
                ${this.pledge.total_backers === 1 ? 'backer' : 'backers'}</span
              >
            </div>

            <!-- <div class="pledge-date">
              <time datetime="2016-1-1"
                >Created: ${new Date(this.pledge.created).toDateString()}</time
              >
            </div> -->

            ${this.handleChosenReward === undefined
              ? html``
              : html`
                  <div>
                    <label class="label">Contribution Amount</label>
                    <input
                      min="1"
                      class="input"
                      type="number"
                      placeholder="Contribution Amount"
                      .value="${this.contributionAmount.toString()}"
                      @input="${this.handleContributionAmount}"
                    />
                  </div>
                `}
          </div>
        </div>
      </div>
    `;
  }
}
