/* eslint-disable no-self-compare */
/* eslint-disable no-constant-condition */
/* eslint-disable no-else-return */
/* eslint-disable array-callback-return */
/* eslint-disable lit/binding-positions */
/* eslint-disable lit-a11y/click-events-have-key-events */
/* eslint-disable lit-a11y/anchor-is-valid */
/* eslint-disable arrow-body-style */
/* eslint-disable prefer-const */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */
import {
  html,
  css,
  SkhemataBase,
  property,
  CSSResult,
} from '@skhemata/skhemata-base';
import { Bulma } from '@skhemata/skhemata-css';
import { GlobalStyles } from './styles/global';

export class campaignBackers extends SkhemataBase {
  static get styles() {
    return <CSSResult[]>[
      ...super.styles,
      Bulma,
      GlobalStyles,
      css`
        .campaign-backers-container {
          border-radius: 9px;
          border: 1px solid #e6e6e6;
        }

        .campaign-backers-container img {
          border: 1px solid #363636;
        }
      `,
    ];
  }

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

  @property({ type: String, attribute: 'api_url' }) apiUrl?: number;

  @property({ type: String, attribute: 'loc_path' }) locPath?: number;

  @property({ type: String, attribute: 'campaign_id' }) campaignId?: number;

  @property({ type: Number }) activePage = 1;

  @property({ type: Number }) totalPages = 1;

  @property({ type: Array }) backers = [];

  @property({ type: String }) campaignBackers: any;

  async firstUpdated() {
    await super.firstUpdated();
    
    this.getBackers();
  }

  updated() {}

  addCurrencySymbols = (amount: string) => {
    return `${new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'CAD',
    }).format(parseFloat(amount))}`;
  };

  pageClick = (page: number) => {
    this.activePage = page;
    this.getBackers();
  };

  // createPaginationLinks = () => {
  //   let links = '';

  //   if (this.shadowRoot) {
  //     const paginationList = this.shadowRoot.getElementById(
  //       'pagination-list'
  //     ) as HTMLElement;
  //     const pageNumbers = [...Array(this.totalPages).keys()].map(
  //       (n: number) => n + 1
  //     );

  //     pageNumbers.forEach((pageNumber, index) => {
  //       if (index === 0 || index === pageNumbers.length - 1) {
  //         links += `<li><a class="pagination-link" href="#">${pageNumber}</a></li>`;
  //       } else if (pageNumber === this.activePage) {
  //         links += `<li><a class="pagination-link is-current" href="#">${pageNumber}</a></li>`;
  //       } else if (
  //         pageNumber === this.activePage - 1 ||
  //         pageNumber === this.activePage + 1
  //       ) {
  //         links += `<li><a class="pagination-link" href="#">${pageNumber}</a></li>`;
  //       } else if (
  //         pageNumber === this.activePage - 2 ||
  //         pageNumber === this.activePage + 2
  //       ) {
  //         links += `<li><span class="pagination-ellipsis">&hellip;</span></li>`;
  //       }
  //     });

  //     paginationList.innerHTML = links;
  //   }
  // };

  createPaginationLinks() {
    console.log('PAGINATION:', this.totalPages, this.backers.length);

    const pageNumbers = [...Array(this.totalPages).keys()].map(
      (n: number) => n + 1
    );

    return pageNumbers.map((pageNumber: any, index: number) => {
      if (index === 0 || index === pageNumbers.length - 1) {
        return html`<li>
          <a
            class="pagination-link"
            @click="${() => this.pageClick(pageNumber)}"
            >${pageNumber}</a
          >
        </li>`;
      } else if (pageNumber === this.activePage) {
        return html`<li>
          <a
            class="pagination-link is-current"
            @click="${() => this.pageClick(pageNumber)}"
            >${pageNumber}</a
          >
        </li>`;
      } else if (
        pageNumber === this.activePage - 1 ||
        pageNumber === this.activePage + 1
      ) {
        return html`<li>
          <a
            class="pagination-link"
            @click="${() => this.pageClick(pageNumber)}"
            >${pageNumber}</a
          >
        </li>`;
      } else if (
        pageNumber === this.activePage - 2 ||
        pageNumber === this.activePage + 2
      ) {
        return html`<li><span class="pagination-ellipsis">&hellip;</span></li>`;
      }
    });
  }

  prevPage = () => {
    if (this.activePage > 1) {
      this.activePage -= 1;
      this.pageClick(this.activePage);
    }
  }

  nextPage = () => {
    if (this.activePage < this.totalPages) {
      this.activePage += 1;
      this.pageClick(this.activePage);
    }
  }

  render() {
    return html`
      <div class="">
        ${this.backers?.length > 0
          ? this.backers.map(
              (backer: any) => html`
                <div class="p-4 mb-4 campaign-backers-container">
                  <div class="columns is-vcentered">
                    <div
                      class="column is-one-third is-flex is-align-items-center is-flex-gap-4"
                    >
                      <figure class="image is-64x64">
                        <img
                          class="is-rounded backer-avatar"
                          alt="backer avatar"
                          src="https://via.placeholder.com/300"
                        />
                      </figure>
                      <h4 class="titleFont is-size-6 has-text-weight-bold">
                        ${backer.first_name} ${backer.last_name}
                      </h4>
                    </div>
                    <div class="column">
                      <h4 class="titleFont is-size-6 has-text-weight-bold">
                        ${this.addCurrencySymbols(backer.total_amount)}
                      </h4>
                    </div>
                    <div class="column has-text-right">
                      <div>
                        <p class="is-size-7">
                          Backed ${backer.total_backed}
                          ${backer.total_backed === 1
                            ? 'campaign'
                            : 'campaigns'}
                        </p>
                      </div>
                      <div
                        class="is-flex is-align-items-center is-flex-gap-4 is-justify-content-flex-end"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8 16C3.58125 16 0 12.4187 0 8C0 3.58125 3.58125 0 8 0C12.4187 0 16 3.58125 16 8C16 12.4187 12.4187 16 8 16ZM7.25 3.75V8C7.25 8.25 7.375 8.48438 7.58437 8.625L10.5844 10.625C10.9281 10.8562 11.3938 10.7625 11.625 10.4156C11.8562 10.0687 11.7625 9.60625 11.4156 9.375L8.75 7.6V3.75C8.75 3.33437 8.41562 3 8 3C7.58437 3 7.25 3.33437 7.25 3.75Z"
                            fill="#EDEDED"
                          />
                        </svg>

                        <p class="is-size-7">15hrs</p>
                      </div>
                    </div>
                  </div>
                </div>
              `
            )
          : html`<h4>No backers</h4>`}

        
        ${this.totalPages > 1
          ? html`
              <nav
                class="pagination is-centered is-small"
                role="navigation"
                aria-label="pagination"
              >
                <a class="pagination-previous" @click="${this.prevPage}">Previous</a>
                <a class="pagination-next" @click="${this.nextPage}">Next page</a>
                <ul class="pagination-list" id="pagination-list">
                  ${this.createPaginationLinks()}
                  <!-- ${[...Array(this.totalPages).keys()]
                    .map(n => n + 1)
                    .map(page => {
                      return html`
                        <li>
                          <a
                            @click="${() => this.pageClick(page)}"
                            class="pagination-link"
                            aria-label="Goto page ${page}"
                            >${page}</a
                          >
                        </li>
                      `;
                    })} -->
                </ul>
              </nav>
            `
          : ''}
      </div>
    `;
  }

  private getBackers() {
    fetch(
      `${this.apiUrl}${this.locPath}campaign/${this.campaignId}/backer?page=${this.activePage}&page_entries=10`
    )
      .then(response => {
        if (!response.ok) {
          return;
        }

        console.log('headers: ', [...(response.headers as unknown as [])]);
        const headersNew = [...(response.headers as unknown as [])];

        this.totalPages = Number(headersNew[5][1]);

        return response.json();
      })
      .then(data => {
        this.backers = data;
        console.log('backers: ', this.backers);
        
        // this.backersMarkup();
      })
      .catch(() => {
        console.log('error');
      });
  }

//   private backersMarkup() {
//     if (this.backers) {
//       console.log(this.backers);
//       for (let key in this.backers) {
//         this.campaignBackers = html`<div class="faq-title">
//           ${this.backers[key].first_name} ${this.backers[key].last_name}
//           ${this.backers[key].total_amount} Backed
//           ${this.backers[key].total_backed}
//           ${this.backers[key].total_backed === 1 ? 'Campaign' : 'Campaigns'}
//         </div> `;
//       }
//     }
//   }
}