/* eslint-disable lit-a11y/anchor-is-valid */
/* eslint-disable lit-a11y/click-events-have-key-events */
/* eslint-disable import/no-extraneous-dependencies */
import { CSSResult, html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { Bulma } from '@skhemata/skhemata-css';

export class CardReward extends LitElement {
  static styles = <CSSResult[]>[
    Bulma,
    css`
      /* .cardReward {
        max-width: 300px;
        margin: 0 auto;
      } */

      .cardReward header {
        cursor: pointer;
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

  @property({ type: Boolean })
  openStatus = false;

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

  handleRewardOpen = () => {
    this.openStatus = !this.openStatus;

    this.handleChosenReward(this.pledge.name, this.pledge);
  };

  render() {
    console.log(this.pledge);

    return html`
      <div class="card cardReward">
        <header class="card-header" @click="${this.handleRewardOpen}">
          <p class="card-header-title">
            <span> ${this.pledge.name} </span>
            <span>&nbsp; - &nbsp;</span>
            <span>
              <span>
                ${this.currencySymbols[
                  this.campaign?.currencies[0].code_iso4217_alpha
                ]}
                ${this.pledge.amount}
                ${this.campaign?.currencies[0].code_iso4217_alpha}
              </span>
            </span>
          </p>
        </header>
        <div class="card-content ${this.openStatus ? '' : 'is-hidden'}">
          <div class="content">
            ${this.pledge.description}

            <br />
            <time datetime="2016-1-1">${this.pledge.created}</time>

            <div>
              <input
                min="1"
                class="input"
                type="number"
                placeholder="Contribution Amount"
                .value="${this.contributionAmount.toString()}"
                @input="${this.handleContributionAmount}"
              />
            </div>
          </div>
        </div>
        <footer class="card-footer ${this.openStatus ? '' : 'is-hidden'}">
          <a class="card-footer-item" @click="${this.handleContribute}"
            >Contribute</a
          >
        </footer>
      </div>
    `;
  }
}
