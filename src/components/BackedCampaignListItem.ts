/* eslint-disable no-nested-ternary */
/* eslint-disable lit-a11y/anchor-is-valid */
/* eslint-disable lit-a11y/click-events-have-key-events */
/* eslint-disable import/no-extraneous-dependencies */
import { CSSResult, html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { Bulma } from '@skhemata/skhemata-css';
import { GlobalStyles } from '../styles/global';

export class BackedCampaignListItem extends LitElement {
  static styles = <CSSResult[]>[Bulma, GlobalStyles, css``];

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

  @property({ type: Array }) pledges?: any;

  @property({ type: Number }) activePledgePage = 0;

  @property({ type: String, attribute: 'api_full' }) apiFull?: string;

  @property({ type: Boolean }) openStatus: boolean | undefined;

  //   async firstUpdated() {}
  addCurrencySymbols = (amount: string) =>
    // const currencySymbol = this.currencySymbols[this.campaign?.currencies[0].code_iso4217_alpha];
    // const currencyName = this.campaign?.currencies[0].code_iso4217_alpha;
    `${new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'CAD',
    }).format(parseFloat(amount))}`;


    // show pledges
  showPledges = async () => {
    this.openStatus = !this.openStatus;

    const response = await fetch(
      `${this.apiFull}campaign/${this.campaign?.id}/pledge`,
      {
        credentials: 'include',
      }
    );
    const pledges = await response.json();

    const newPledges = this.chunkArray(pledges, 10)
    this.pledges = newPledges;
    console.log('New Pledges: ', newPledges);

  };

  chunkArray = (arr: any[], chunkSize: number) => {
    const result: any = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  }

  pledgePageClick = (index: number) => {
    this.activePledgePage = index
    this.requestUpdate();
  }

  render() {
    return html`
      <div class="is-flex is-flex-direction-column">
        <div class="has-text-centered mb-4">
          <h3 class="titleFont is-size-4">${this.campaign.name}</h3>
        </div>

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

        <div>
          <a class="" @click="${this.showPledges}">Contributions</a>

          <div>
            ${this.openStatus
              ? this.pledges?.length > 0
                ? html`
                    <table class="table is-striped is-fullwidth">
                      <thead class="has-background-dark">
                        <tr>
                          <th class="has-text-white has-text-weight-semibold">
                            ID
                          </th>
                          <th class="has-text-white has-text-weight-semibold">
                            Date
                          </th>
                          <th class="has-text-white has-text-weight-semibold">
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        ${this.pledges[this.activePledgePage].length > 0
                          ? this.pledges[this.activePledgePage].map(
                              (pledge: any) => html`
                                <tr>
                                  <td>${pledge.id}</td>
                                  <td>
                                    ${new Date(pledge.created).toDateString()}
                                  </td>
                                  <td>
                                    ${this.addCurrencySymbols(pledge.amount)}
                                  </td>
                                </tr>
                              `
                            )
                          : null}
                      </tbody>
                    </table>

                    ${
                      this.pledges.length > 1 ? html`
                        <nav
                          class="pagination is-centered is-small"
                          role="navigation"
                          aria-label="pagination"
                        >
                          <ul class="pagination-list" id="pagination-list">
                            ${
                              this.pledges.map((pledge: any, index: number) => html`
                                <li><a
                              class="pagination-link ${this.activePledgePage === index ? 'has-background-success has-text-white' : ''} "
                              @click="${() => this.pledgePageClick(index)}"
                              >${index + 1}</a
                            >
                          </li>
                              
                              `)
                            }
                          
                          </ul>
                        </nav>
                      ` : null
                    }
                    
                  `
                : html`no pledges`
              : null}
          </div>
        </div>
      </div>
    `;
  }
}
