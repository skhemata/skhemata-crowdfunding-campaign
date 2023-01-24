/* eslint-disable lit-a11y/anchor-is-valid */
/* eslint-disable lines-between-class-members */
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
import { Menu } from './components/Menu';
import { CampaignHeader } from './contribution/CampaignHeader';
import { GlobalStyles } from './styles/global';
import { campaignInfo } from './campaignInfo';
import {
  handWithADollarSign,
  groupOfPeople,
  calendar,
  target,
} from './utils/icons';
import { avatarPlaceholder } from './utils/placeholders';
import { BackedCampaignListItem } from './components/BackedCampaignListItem';

export class CampaignProfile extends SkhemataBase {
  static get styles() {
    return <CSSResult[]>[
      ...super.styles,
      Bulma,
      GlobalStyles,
      css`
        .campaign-creator-profile-container > .column:first-of-type {
          order: 1;
        }

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

        /* @media screen and (min-width: 768px) {} */
      `,
    ];
  }

  static get scopedElements() {
    return {
      'card-reward-component': CardReward,
      'campaign-header-component': CampaignHeader,
      'menu-component': Menu,
      'campaign-info-component': campaignInfo,
      'backed-campaign-list-item-component': BackedCampaignListItem,
    };
  }

  @property({ type: String, attribute: 'api_url' }) apiUrl?: number;

  @property({ type: String, attribute: 'api_full' }) apiFull?: string;

  @property({ type: String }) campaignMainImage?: string;

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

  @property({ type: Array }) backedCampaigns?: any;

  @property({ type: Array, attribute: 'currencies' }) currencies?: any;

  @property({ type: Object }) userProfile?: any;

  @property({ type: Boolean }) authState?: boolean;

  @property({ type: Function })
  handleAuthStateChange!: () => void;

  @property({ type: Function })
  handleBack!: () => void;

  async firstUpdated() {
    // this.embedListener();

    await this.loadUserProfile();
    await this.loadBackedCampaigns();
  }

  updated() {
    this.getCampaignMainImage();
  }

  loadUserProfile = async () => {
    const response = await fetch(`${this.apiFull}authenticate`, {
      credentials: 'include',
    });
    const data = await response.json();
    this.userProfile = data;
  };

  loadBackedCampaigns = async () => {
    const response = await fetch(
      `${this.apiFull}campaign/?filters={"backer":"${this.userProfile.id}"}`,
      {
        credentials: 'include',
      }
    );
    const data = await response.json();
    this.backedCampaigns = data;
  };

  addCurrencySymbols = (amount: string) =>
    // const currencySymbol = this.currencySymbols[this.campaign?.currencies[0].code_iso4217_alpha];
    // const currencyName = this.campaign?.currencies[0].code_iso4217_alpha;
    `${new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'CAD',
    }).format(parseFloat(amount))}`;

  render() {
    console.log('user: ', this.userProfile);
    console.log('backed campaigns: ', this.backedCampaigns);

    return html`
      <campaign-header-component
        .apiUrl="${this.apiUrl}"
        .campaign=${this.campaign}
      ></campaign-header-component>

      <div class="container mt-4">
        <div
          class="is-flex is-justify-content-space-between is-align-items-center my-6"
        >
          <div class="is-flex is-align-items-center is-flex-gap-5">
            <span>
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

        <div class="columns mb-6">
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
                Profile
              </h3>
            </div>
          </div>
        </div>

        <div class="columns campaign-creator-profile-container">
          <div
            class="column is-one-third is-flex is-justify-content-center is-align-items-center p-5"
          >
            <div class="has-background-white p-4">
              <!-- Progress -->
              <div class="mb-6">
                <div class="has-text-centered  mb-5">
                  <span
                    class="has-text-success is-size-3 has-text-weight-semibold titleFont"
                    >${this.addCurrencySymbols(
                      this.campaign?.funded_amount
                    )}</span
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
                      <span class="has-text-weight-semibold titleFont"
                        >Start</span
                      >
                      <span>${this.campaign?.starts_date_time}</span>
                    </div>

                    <div
                      class="is-flex is-flex-direction-column has-text-right is-size-7"
                    >
                      <span class="has-text-weight-semibold titleFont"
                        >End</span
                      >
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
                    >${this.addCurrencySymbols(
                      this.campaign?.funding_goal
                    )}</span
                  >
                </div>
              </div>
            </div>
          </div>

          <!-- User Profile -->
          <div class="column">
            <div
              class="is-flex is-justify-content-center is-align-items-center  is-flex-direction-column is-flex-gap-4"
            >
              <div>
                <figure class="image is-96x96">
                  <img
                    class="is-rounded"
                    alt="campaign creator avatar"
                    src="${this.campaign?.managers[0]?.person_files != null
                      ? `${this.apiUrl}/image/campaign_profile/${this.campaign?.managers[0].person_files[0].path_external}`
                      : avatarPlaceholder}"
                  />
                </figure>
                <h4 class="titleFont is-size-7">
                  ${this.campaign?.managers[0].first_name}
                  ${this.campaign?.managers[0].last_name}
                </h4>
              </div>

              <div class="raise-mode-container has-text-centered mb-5">
                <span class="has-text-white has-background-dark"
                  >Edit Profile</span
                >
                <span class="has-background-grey-lighter">
                  Change Password
                </span>
              </div>
            </div>

            <!-- List of Backed Campaigns -->

            <div class="mt-6">
              <h3 class="titleFont is-size-5">Backed Campaigns</h3>

              <div
                class="${this.backedCampaigns && this.backedCampaigns.length > 0
                  ? 'backedCampaigns-container'
                  : ''}"
              >
                ${this.backedCampaigns && this.backedCampaigns.length > 0
                  ? this.backedCampaigns.map(
                      (campaign: any, index: number) => html`
                        <backed-campaign-list-item-component
                          .campaign=${campaign}
                          .apiFull=${this.apiFull}
                        ></backed-campaign-list-item-component>
                        ${index < this.backedCampaigns.length - 1
                          ? html`<hr />`
                          : html``}
                      `
                    )
                  : html`
                      <div class="has-text-centered">
                        <span class="has-text-grey-lighter is-size-7"
                          >You have not backed any campaigns yet.</span
                        >
                      </div>
                    `}
              </div>
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
