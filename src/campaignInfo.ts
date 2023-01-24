/* eslint-disable lit/binding-positions */
/* eslint-disable lit-a11y/click-events-have-key-events */
/* eslint-disable prefer-const */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable prefer-template */
/* eslint-disable no-restricted-syntax */
import {
  html,
  css,
  SkhemataBase,
  property,
  CSSResult,
} from '@skhemata/skhemata-base';
import { Bulma } from '@skhemata/skhemata-css';
import { CardReward } from './components/CardReward';
import { GlobalStyles } from './styles/global';
import {
  handWithADollarSign,
  groupOfPeople,
  calendar,
  target,
} from './utils/icons';

export class campaignInfo extends SkhemataBase {
  static get styles() {
    return <CSSResult[]>[
      ...super.styles,
      Bulma,
      GlobalStyles,
      css`
        .campaign-image {
          max-width: 870px;
          width: 100%;
          height: auto;
          border-radius: 9px;
        }

        .campaign-icons-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        /* .raise-mode {
          border-radius: 5px;
          padding: 5px;
          line-height: 2.5;
        } */
        .raise-mode-container {
          display: flex;
          justify-content: center;
          gap: 0;
        }

        .raise-mode-container span {
          padding: 6px 12px;
        }

        .raise-mode-container span:first-of-type {
          border-radius: 6px 0 0 6px;
        }

        .raise-mode-container span:last-of-type {
          border-radius: 0 6px 6px 0;
        }
      `,
    ];
  }

  static get scopedElements() {
    return {
      'card-reward-component': CardReward,
    };
  }

  @property({ type: String, attribute: 'api_url' }) apiUrl?: number;

  @property({ type: String, attribute: 'loc_path' }) locPath?: number;

  @property({ type: String, attribute: 'campaign_id' }) campaignId?: number;

  @property({ type: Object, attribute: 'campaign' }) campaign?: any;

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

  @property({ type: Array, attribute: 'currencies' }) currencies?: any;

  @property({ type: String, attribute: 'currentPage' }) currentPage?: string;

  @property({ type: Array, attribute: 'activeRewards' })
  activeRewards: number[] = [];

  @property({ type: String }) campaignMainImage?: any;

  async firstUpdated() {
    // this.embedListener();
    // fetch('https://coral.thrinacia.com/api/service/restv1/locale/currency', {
    //   credentials: 'include',
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log('currencies: ', data);
    //     this.currencies = data;
    //   })
    //   .catch(e => console.log(e));
  }

  updated() {
    this.getCampaignMainImage();
  }

  handleRewardOpen = (index: number) => {
    if (this.activeRewards.includes(index)) {
      this.activeRewards = this.activeRewards.filter(item => item !== index);
    } else {
      const newArr = [...this.activeRewards, index];
      this.activeRewards = newArr;
    }
  };

  getRaisedInPeriod = () => {
    let returnDate = {
      unit: '',
      elapsed: 0,
    };
    let elapsedSecond = this.campaign?.seconds_elapsed;
    let elapsedMinute = elapsedSecond / 60;
    let elapsedHour = elapsedMinute / 60;
    let elapsedDay = elapsedHour / 24;
    let elapsedMonth = elapsedDay / 30;
    let elapsedYear = elapsedMonth / 12;

    if (elapsedYear >= 1) {
      returnDate.elapsed = Math.floor(elapsedYear);
      if (returnDate.elapsed > 1) {
        returnDate.unit = 'years';
      } else {
        returnDate.unit = 'year';
      }
    } else if (elapsedMonth >= 1) {
      returnDate.elapsed = Math.floor(elapsedMonth);
      if (returnDate.elapsed > 1) {
        returnDate.unit = 'months';
      } else {
        returnDate.unit = 'month';
      }
    } else if (elapsedDay >= 1) {
      returnDate.elapsed = Math.floor(elapsedDay);
      if (returnDate.elapsed > 1) {
        returnDate.unit = 'days';
      } else {
        returnDate.unit = 'day';
      }
    } else if (elapsedHour >= 1) {
      returnDate.elapsed = Math.floor(elapsedHour);
      if (returnDate.elapsed > 1) {
        returnDate.unit = 'hours';
      } else {
        returnDate.unit = 'hour';
      }
    } else if (elapsedMinute >= 1) {
      returnDate.elapsed = Math.floor(elapsedMinute);
      if (returnDate.elapsed > 1) {
        returnDate.unit = 'minutes';
      } else {
        returnDate.unit = 'minute';
      }
    } else if (elapsedSecond >= 1) {
      returnDate.elapsed = Math.floor(elapsedSecond);
      if (returnDate.elapsed > 1) {
        returnDate.unit = 'seconds';
      } else {
        returnDate.unit = 'second';
      }
    }

    return returnDate;
  };

  addCurrencySymbols = (amount: string) =>
    // const currencySymbol = this.currencySymbols[this.campaign?.currencies[0].code_iso4217_alpha];
    // const currencyName = this.campaign?.currencies[0].code_iso4217_alpha;
    `${new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'CAD',
    }).format(parseFloat(amount))}`;

  render() {
    return html`
      <div class="columns mb-6">
        <div class="left-info column">
          <img
            alt="main campaign"
            src=${this.campaignMainImage ||
            'https://via.placeholder.com/800x600'}
            class="campaign-image"
          />

          <!-- <div class="dropdown">
            <div class="dropdown-trigger">
              <button
                class="button"
                aria-haspopup="true"
                aria-controls="dropdown-menu5"
              >
                <span>Embed Code</span>
                <span class="icon is-small">
                  <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
              </button>
            </div>
            <div class="dropdown-menu" id="dropdown-menu5" role="menu">
              <div class="dropdown-content">
                <div class="dropdown-item">
                  <textarea rows="4" cols="50">
                  <iframe width="260" height="650" src="${this.embedUrl()}" frameborder="0" scrolling="no"></iframe></textarea
                  >
                </div>
              </div>
            </div>
          </div> -->
          <!-- 
          <div class="campaign-description"> 
            <div>${this.returnString()}</div>
          </div> -->
        </div>
        <div
          class="right-info column is-one-third is-flex is-flex-direction-column"
        >
          <!-- Raise Mode -->
          <div class="raise-mode-container has-text-centered mb-5">
            <span class="has-text-white has-background-dark">Raise mode</span>
            <span class="has-background-grey-lighter">
              ${this.campaign?.raise_mode_id === 1
                ? 'All or Nothing'
                : 'Keep it All'}
            </span>
          </div>

          <!-- Progress -->
          <div class="mb-6">
            <div class="has-text-centered  mb-5">
              <span
                class="has-text-success is-size-3 has-text-weight-semibold titleFont"
                >${this.addCurrencySymbols(this.campaign?.funded_amount)}</span
              >
            </div>

            <div>
              <progress
                class="progress is-warning mb-5"
                id="campaignProgress"
                value="${this.campaign?.funded_percentage}"
                max="100"
              >
                ${this.campaign?.funded_percentage}%
              </progress>
              <div class="is-flex is-justify-content-space-between">
                <div class="is-flex is-flex-direction-column is-size-7">
                  <span class="has-text-weight-semibold titleFont">Start</span>
                  <span>${this.campaign?.starts_date_time}</span>
                </div>

                <div
                  class="is-flex is-flex-direction-column has-text-right is-size-7"
                >
                  <span class="has-text-weight-semibold titleFont">End</span>
                  <span>${this.campaign?.ends_date_time}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Icons List (campaign numbers) -->
          <div class="campaign-icons-list">
            <div class="is-flex is-align-items-center">
              <span class="icon-wrapper">${handWithADollarSign}</span>
              <span
                class="has-text-black ml-4 is-size-5 has-text-weight-bold titleFont"
                >${this.campaign?.funded_percentage}%</span
              >
            </div>

            <div class="is-flex is-align-items-center">
              <span class="icon-wrapper"> ${groupOfPeople} </span>
              <span
                class="has-text-black ml-4 is-size-5 has-text-weight-bold titleFont"
                >${this.campaign?.total_backers}
                ${this.campaign?.total_backers === 1
                  ? 'Backer'
                  : 'Backers'}</span
              >
            </div>

            <div class="is-flex is-align-items-center">
              <span class="icon-wrapper"> ${calendar} </span>
              <span
                class="has-text-black ml-4 is-size-5 has-text-weight-bold titleFont"
                >${this.campaign?.days_remaining}
                ${this.campaign?.days_remaining === 1
                  ? 'Day to go'
                  : 'Days to go'}</span
              >
            </div>

            <div class="is-flex is-align-items-center">
              <span class="icon-wrapper"> ${target} </span>
              <span
                class="has-text-black ml-4 is-size-5 has-text-weight-bold titleFont"
                >${this.addCurrencySymbols(this.campaign?.funding_goal)}</span
              >
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private getCampaignMainImage() {
    if (this.campaign && this.campaign.files) {
      for (const key in this.campaign.files) {
        if (this.campaign.files[key].region_id === 3) {
          this.campaignMainImage =
            this.apiUrl +
            '/image/campaign_detail_large/' +
            this.campaign.files[key].path_external;
        }
      }
    }
  }

  // private embedListener() {
  //   const dropdown: any = this.shadowRoot?.querySelector('.dropdown');
  //   // dropdown.addEventListener('click', function (event: any) {
  //   //   event.stopPropagation();
  //   //   dropdown.classList.toggle('is-active');
  //   // });
  // }

  private embedUrl() {
    let embedPath: any = window.location.origin;
    return embedPath + '/embed/card-view/' + this.campaignId;
  }

  private returnString() {
    let fragment = document
      .createRange()
      .createContextualFragment(`${this.campaign?.description}`);
    return fragment;
  }
}
