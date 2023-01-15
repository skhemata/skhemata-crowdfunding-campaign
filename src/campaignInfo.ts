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

export class campaignInfo extends SkhemataBase {
  static get styles() {
    return <CSSResult[]>[
      ...super.styles,
      Bulma,
      GlobalStyles,
      css`
        .campaign-image {
          /* max-height: 450px; */
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
    this.embedListener();

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
            src=${this.campaignMainImage}
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
              <span class="icon-wrapper">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 8.32386V8.76179C19.2667 8.81184 19.525 8.8744 19.7583 8.93696C20.2917 9.07877 20.6083 9.62931 20.4667 10.1632C20.325 10.697 19.775 11.014 19.2417 10.8722C18.7875 10.7512 18.3625 10.6678 17.9833 10.6637C17.6792 10.6595 17.3708 10.7346 17.175 10.8472C17.0875 10.9014 17.0458 10.9473 17.0292 10.9723C17.0167 10.9932 17 11.0223 17 11.0891C17 11.1016 17 11.1099 17 11.1141C17.0083 11.1224 17.0375 11.1642 17.1375 11.2225C17.3792 11.3685 17.7375 11.4811 18.2792 11.6438L18.3167 11.6563C18.7792 11.7939 19.3958 11.9816 19.8958 12.2944C20.4667 12.6531 20.9833 13.2495 20.9958 14.1671C21.0083 15.1055 20.5208 15.7895 19.8833 16.1899C19.6042 16.3609 19.3042 16.4819 18.9958 16.557V16.9991C18.9958 17.5538 18.55 18 17.9958 18C17.4417 18 16.9958 17.5538 16.9958 16.9991V16.5236C16.6 16.4277 16.2375 16.3025 15.9292 16.1983C15.8417 16.1691 15.7583 16.1399 15.6792 16.1149C15.1542 15.9397 14.8708 15.3725 15.0458 14.8469C15.2208 14.3214 15.7875 14.0378 16.3125 14.213C16.4208 14.2505 16.5208 14.2839 16.6167 14.3173C17.1833 14.5091 17.5917 14.6467 18.0292 14.6634C18.3625 14.6759 18.6583 14.5967 18.8292 14.4924C18.9083 14.4424 18.9458 14.4007 18.9625 14.3715C18.9792 14.3464 19 14.2964 18.9958 14.2005V14.1921C18.9958 14.1504 18.9958 14.1045 18.8292 14.0003C18.5917 13.8501 18.2333 13.7333 17.7 13.5707L17.6208 13.5457C17.1708 13.4122 16.5792 13.2329 16.1042 12.9451C15.5417 12.6072 15 12.0275 14.9958 11.1058C14.9917 10.1507 15.5333 9.49585 16.15 9.12882C16.4167 8.97033 16.7042 8.86189 16.9917 8.78682V8.32386C16.9917 7.76915 17.4375 7.32288 17.9917 7.32288C18.5458 7.32288 18.9917 7.76915 18.9917 8.32386H19ZM29.675 21.3492C30.2208 22.0916 30.0625 23.1343 29.3208 23.6806L24.0458 27.572C23.0708 28.2893 21.8958 28.6772 20.6833 28.6772H14H7.33333C6.59583 28.6772 6 28.0808 6 27.3426V24.6733C6 23.935 6.59583 23.3386 7.33333 23.3386H8.86667L10.7375 21.8371C11.6833 21.0781 12.8583 20.6693 14.0708 20.6693H17.3333H18H20.6667C21.4042 20.6693 22 21.2658 22 22.004C22 22.7422 21.4042 23.3386 20.6667 23.3386H18H17.3333C16.9667 23.3386 16.6667 23.6389 16.6667 24.0059C16.6667 24.373 16.9667 24.6733 17.3333 24.6733H22.3583L27.3458 20.9947C28.0875 20.4483 29.1292 20.6068 29.675 21.3492ZM14.0667 23.3386H14.0292C14.0417 23.3386 14.0542 23.3386 14.0667 23.3386Z"
                    fill="#48C78E"
                  />
                </svg>
              </span>
              <span
                class="has-text-black ml-4 is-size-5 has-text-weight-bold titleFont"
                >${this.campaign?.funded_percentage}%</span
              >
            </div>

            <div class="is-flex is-align-items-center">
              <span class="icon-wrapper">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24.6 14.4286C26.2575 14.4286 27.6 13.0967 27.6 11.4524C27.6 9.80804 26.2575 8.4762 24.6 8.4762C22.9425 8.4762 21.6 9.80804 21.6 11.4524C21.6 13.0967 22.9425 14.4286 24.6 14.4286ZM10.8 14.4286C12.4575 14.4286 13.8 13.0967 13.8 11.4524C13.8 9.80804 12.4575 8.4762 10.8 8.4762C9.1425 8.4762 7.8 9.80804 7.8 11.4524C7.8 13.0967 9.1425 14.4286 10.8 14.4286ZM30 19.5885C30 17.3973 28.2075 15.6191 25.9987 15.6191H24.3975C23.8012 15.6191 23.235 15.7493 22.725 15.9799C22.7737 16.2478 22.7962 16.5268 22.7962 16.8095C22.7962 18.2307 22.1662 19.5067 21.1725 20.381C21.18 20.381 21.1875 20.381 21.1987 20.381H29.2013C29.64 20.381 30 20.0238 30 19.5885ZM14.8012 20.381C14.8088 20.381 14.8162 20.381 14.8275 20.381C13.83 19.5067 13.2037 18.2307 13.2037 16.8095C13.2037 16.5268 13.23 16.2515 13.275 15.9799C12.765 15.7455 12.1987 15.6191 11.6025 15.6191H10.0012C7.7925 15.6191 6 17.3973 6 19.5885C6 20.0275 6.36 20.381 6.79875 20.381H14.8012ZM14.4 16.8095C14.4 18.7813 16.0125 20.381 18 20.381C19.9875 20.381 21.6 18.7813 21.6 16.8095C21.6 14.8378 19.9875 13.2381 18 13.2381C16.0125 13.2381 14.4 14.8378 14.4 16.8095ZM25.2 26.5305C25.2 23.7924 22.9613 21.5714 20.2013 21.5714H15.7987C13.0387 21.5714 10.8 23.7924 10.8 26.5305C10.8 27.0774 11.2463 27.5238 11.8013 27.5238H24.1988C24.75 27.5238 25.2 27.0811 25.2 26.5305Z"
                    fill="#48C78E"
                  />
                </svg>
              </span>
              <span
                class="has-text-black ml-4 is-size-5 has-text-weight-bold titleFont"
                >${this.campaign?.total_backers}
                ${this.campaign?.total_backers === 1
                  ? 'Backer'
                  : 'Backers'}</span
              >
            </div>

            <div class="is-flex is-align-items-center">
              <span class="icon-wrapper">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.534 6C14.3574 6 15.0227 6.67031 15.0227 7.5V9H20.9776V7.5C20.9776 6.67031 21.6429 6 22.4663 6C23.2898 6 23.955 6.67031 23.955 7.5V9H26.1881C27.421 9 28.4212 10.0078 28.4212 11.25V13.5H7.5791V11.25C7.5791 10.0078 8.57934 9 9.81218 9H12.0453V7.5C12.0453 6.67031 12.7105 6 13.534 6ZM7.5791 15H28.4212V27.75C28.4212 28.9922 27.421 30 26.1881 30H9.81218C8.57934 30 7.5791 28.9922 7.5791 27.75V15ZM10.5565 18.75V20.25C10.5565 20.6625 10.8915 21 11.3009 21H12.7896C13.199 21 13.534 20.6625 13.534 20.25V18.75C13.534 18.3375 13.199 18 12.7896 18H11.3009C10.8915 18 10.5565 18.3375 10.5565 18.75ZM16.5114 18.75V20.25C16.5114 20.6625 16.8464 21 17.2558 21H18.7445C19.1539 21 19.4889 20.6625 19.4889 20.25V18.75C19.4889 18.3375 19.1539 18 18.7445 18H17.2558C16.8464 18 16.5114 18.3375 16.5114 18.75ZM23.2107 18C22.8013 18 22.4663 18.3375 22.4663 18.75V20.25C22.4663 20.6625 22.8013 21 23.2107 21H24.6994C25.1088 21 25.4438 20.6625 25.4438 20.25V18.75C25.4438 18.3375 25.1088 18 24.6994 18H23.2107ZM10.5565 24.75V26.25C10.5565 26.6625 10.8915 27 11.3009 27H12.7896C13.199 27 13.534 26.6625 13.534 26.25V24.75C13.534 24.3375 13.199 24 12.7896 24H11.3009C10.8915 24 10.5565 24.3375 10.5565 24.75ZM17.2558 24C16.8464 24 16.5114 24.3375 16.5114 24.75V26.25C16.5114 26.6625 16.8464 27 17.2558 27H18.7445C19.1539 27 19.4889 26.6625 19.4889 26.25V24.75C19.4889 24.3375 19.1539 24 18.7445 24H17.2558ZM22.4663 24.75V26.25C22.4663 26.6625 22.8013 27 23.2107 27H24.6994C25.1088 27 25.4438 26.6625 25.4438 26.25V24.75C25.4438 24.3375 25.1088 24 24.6994 24H23.2107C22.8013 24 22.4663 24.3375 22.4663 24.75Z"
                    fill="#48C78E"
                  />
                </svg>
              </span>
              <span
                class="has-text-black ml-4 is-size-5 has-text-weight-bold titleFont"
                >${this.campaign?.days_remaining}
                ${this.campaign?.days_remaining === 1
                  ? 'Day to go'
                  : 'Days to go'}</span
              >
            </div>

            <div class="is-flex is-align-items-center">
              <span class="icon-wrapper">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_201_7805)">
                    <path
                      d="M27 18C27 13.0312 22.9688 9 18 9C13.0312 9 9 13.0312 9 18C9 22.9688 13.0312 27 18 27C22.9688 27 27 22.9688 27 18ZM30 18C30 24.6281 24.6281 30 18 30C11.3719 30 6 24.6281 6 18C6 11.3719 11.3719 6 18 6C24.6281 6 30 11.3719 30 18ZM18 21.75C20.0719 21.75 21.75 20.0719 21.75 18C21.75 15.9281 20.0719 14.25 18 14.25C15.9281 14.25 14.25 15.9281 14.25 18C14.25 20.0719 15.9281 21.75 18 21.75ZM18 24.75C14.2734 24.75 11.25 21.7266 11.25 18C11.25 14.2734 14.2734 11.25 18 11.25C21.7266 11.25 24.75 14.2734 24.75 18C24.75 21.7266 21.7266 24.75 18 24.75ZM19.5 18C19.5 18.8297 18.8297 19.5 18 19.5C17.1703 19.5 16.5 18.8297 16.5 18C16.5 17.1703 17.1703 16.5 18 16.5C18.8297 16.5 19.5 17.1703 19.5 18Z"
                      fill="#48C78E"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_201_7805">
                      <rect
                        width="24"
                        height="24"
                        fill="white"
                        transform="translate(6 6)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </span>
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

  private embedListener() {
    const dropdown: any = this.shadowRoot?.querySelector('.dropdown');
    // dropdown.addEventListener('click', function (event: any) {
    //   event.stopPropagation();
    //   dropdown.classList.toggle('is-active');
    // });
  }

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
