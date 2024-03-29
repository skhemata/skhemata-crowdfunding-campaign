/* eslint-disable lit/binding-positions */
/* eslint-disable lit-a11y/click-events-have-key-events */
/* eslint-disable lit/attribute-value-entities */
/* eslint-disable no-undef */
/* eslint-disable no-var */
/* eslint-disable class-methods-use-this */
/* eslint-disable prefer-const */
/* eslint-disable consistent-return */
/* eslint-disable lit-a11y/anchor-is-valid */
import {
  html,
  css,
  SkhemataBase,
  property,
  CSSResult,
} from '@skhemata/skhemata-base';
import { Bulma } from '@skhemata/skhemata-css';
// import Stripe from 'stripe';
import { campaignInfo } from './campaignInfo';
import { campaignDescription } from './campaignDescription';
import { campaignFaq } from './campaignFaq';
import { campaignBackers } from './campaignBackers';
import { CampaignContribution } from './CampaignContribution';
import { CardReward } from './components/CardReward';
import { Menu } from './components/Menu';
import { GlobalStyles } from './styles/global';
import { CampaignCreator } from './components/CampaignCreator';
import { CampaignReward } from './components/CampaignReward';
import { CampaignProfile } from './CampaignProfile';

export class SkhemataCrowdfundingCampaign extends SkhemataBase {
  static get styles() {
    return <CSSResult[]>[
      ...super.styles,
      Bulma,
      GlobalStyles,
      css`
        #tab-content div {
          display: none;
        }
        #tab-content div.is-active {
          display: block;
        }

        .tabs li.is-active a {
          border-bottom-color: hsl(141, 71%, 48%);
          color: hsl(141, 71%, 48%);
        }

        .contribute-share-container .button,
        .contribute-share-container-mobile .button {
          border-radius: 7.5px !important;
        }

        .contribute-share-container-mobile .button,
        .contribute-share-container-mobile > div {
          width: 100%;
        }

        .campaign-details-container {
          grid-gap: 1.75rem;
        }

        .campaign-reward-button {
          /* padding: 0.5rem 0.75rem; */
          min-height: 2.5rem;
          position: relative;
        }

        .campaign-reward-button span {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          margin: 0;
          position: absolute;
          // display in the middle of the button
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);

        }


        .campaign-details-container > .column:first-of-type {
          order: 1;
        }

        .campaign-container {
          position: relative;
        }

        .mobile-menu {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          background-color: #fff;
          z-index: 100;
          display: none;
        }

        .mobile-menu-container {
          height: 100vh;
        }

        .mobile-menu.is-active {
          display: block;
        }

        .mobile-menu-btn {
          display: block;
          position: absolute;
          top: 0;
          right: 1rem;
        }

        .mobile-menu-close {
          position: absolute;
          top: 0.5rem;
          right: 1.5rem;
        }

        .tabs {
          display: none;
        }

        .rewards-section {
          max-height: 1000px;
          padding: 0.85rem 1rem 0 1rem;
          overflow-y: auto;
        }

        .rewards-section::-webkit-scrollbar {
          width: 0.25rem;
        }

        ::-webkit-scrollbar-track {
          box-shadow: inset 0 0 5px hsl(0, 0%, 48%);
          border-radius: 6px;
        }

        .rewards-section::-webkit-scrollbar-thumb {
          background: hsl(0, 0%, 4%);
          border-radius: 6px;
        }

        @media screen and (min-width: 768px) {
          .mobile-menu-btn {
            display: none;
          }

          .tabs {
            display: block;
          }
        }
      `,
    ];
  }

  static get scopedElements() {
    return {
      'campaign-info': campaignInfo,
      'campaign-faq': campaignFaq,
      'campaign-backers': campaignBackers,
      'campaign-contribution': CampaignContribution,
      'menu-component': Menu,
      'campaign-description': campaignDescription,
      'card-reward-component': CardReward,
      'campaign-creator-component': CampaignCreator,
      'campaign-reward-component': CampaignReward,
      'campaign-profile-component': CampaignProfile,
    };
  }

  @property({ type: String, attribute: 'api_url' }) apiUrl?: string;

  @property({ type: String, attribute: 'loc_path' }) locPath?: string;

  @property({ type: String }) apiFull?: string;

  @property({ type: String, attribute: 'campaign_id' }) campaignId?: number;

  @property({ type: String, attribute: 'currentPage' }) currentPage?: string;

  @property({ type: String }) clickedReward?: string;

  @property({ type: Number }) clickedRewardAmount?: number;

  @property({ type: Object }) campaign?: any;

  @property({ type: Boolean }) authState = false;

  @property({ type: Object })
  stripeInfoPublishableKey = '';

  /**
   * Implement firstUpdated to perform one-time work after
   * the element’s template has been created.
   */
  async firstUpdated() {
    await super.firstUpdated();
    this.getCampaign();
    // this.tabEvent();

    if (this.apiUrl && this.locPath) {
      this.apiFull = this.apiUrl + this.locPath;
    } else {
      this.apiFull = '';
    }
  }

  handleContribute = () => {
    this.currentPage = 'contribution';
  };

  handleProfile = () => {
    this.currentPage = 'profile';
  };

  handleBack = () => {
    this.currentPage = '';
  };

  handleAuthStateChange = () => {
    const authToken = window.localStorage.getItem('skhemataToken');

    if (authToken !== null) {
      this.authState = true;
      this.getStripeKeys();
    } else {
      this.authState = false;
    }
    this.requestUpdate();
  };

  getStripeKeys = async () => {
    const authToken = window.localStorage.getItem('skhemataToken');

    // StripeInfo
    if (this.authState) {
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
        console.log('stripe keys: ', data);

        // this.stripeInfo.secret_key = data.secret_key;
        this.stripeInfoPublishableKey = data.publishable_key;
        // this.stripeInfoPublishableKey =
        // 'pk_test_51M4V5zELRum7QsqGfXlrGy4uBhrQb6r3xRAQRh3CGQlWvUzM5qS9IWRHbrqQKixpLNVLeGxsHldTix1eE6ELuYkt00oHL38JH4';
        // this.stripeInfo.country_id = data.country_id;
      } catch (error) {
        console.log(error);
      }
    }
  };

  mobileMenuToggle = () => {
    if (this.shadowRoot) {
      const mobileMenu = this.shadowRoot.querySelector('.mobile-menu');
      mobileMenu?.classList.toggle('is-active');
    }
  };

  handleRewardClick = (reward: string, amount: number) => {
    this.clickedReward = reward;
    this.clickedRewardAmount = amount;
    this.handleContribute();
  };
  
  tabClickEvent = (e: any) => {
    let selected: any = e.target;
      if (selected && selected.getAttribute('data-tab')) {
        this.updateActiveTab(selected, 'tabs');
        this.updateActiveTab(selected, 'tabs2');
      }
      
      console.log(e.target.parentElement.parentElement.id)
      if(e.target.parentElement.parentElement.id === 'tabs2') {
        this.mobileMenuToggle();
      }
    // this.shadowRoot?.getElementById('tabs')?.addEventListener('click', e => {
    //   let selected: any = e.target;
    //   if (selected && selected.getAttribute('data-tab')) {
    //     this.updateActiveTab(selected, 'tabs');
    //   }
    // });
  }

  render() {
    if (this.currentPage === 'contribution') {
      return html`<campaign-contribution
        .chosenReward="${this.clickedReward}"
        .contributionAmount="${this.clickedRewardAmount}"
        .currentPage="${this.currentPage}"
        .handleBack="${this.handleBack}"
        .campaign="${this.campaign}"
        .campaignId="${this.campaignId}"
        .apiFull="${this.apiFull}"
        .apiUrl="${this.apiUrl}"
        .authState="${this.authState}"
        .stripeInfoPublishableKey="${this.stripeInfoPublishableKey}"
        .handleAuthStateChange="${this.handleAuthStateChange}"
        .getStripeKeys="${this.getStripeKeys}"
      ></campaign-contribution>`;
    }

    if (this.currentPage === 'profile') {
      return html`<campaign-profile-component
        .apiFull="${this.apiFull}"
        .apiUrl="${this.apiUrl}"
        .campaignId="${this.campaignId}"
        .campaign="${this.campaign}"
        .authState="${this.authState}"
        .handleBack="${this.handleBack}"
        .handleAuthStateChange="${this.handleAuthStateChange}"
      ></campaign-profile-component>`;
    }

    return html` <div class="container pt-6 p-4 campaign-container">
      <div class="mobile-menu-btn">
        <a @click="${this.mobileMenuToggle}">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<mask id="mask0_211_8890" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36">
<rect width="36" height="36" fill="#D9D9D9"/>
</mask>
<g mask="url(#mask0_211_8890)">
<path d="M4.5 27V24.4872H31.5V27H4.5ZM4.5 19.2375V16.7625H31.5V19.2375H4.5ZM4.5 11.5128V9H31.5V11.5128H4.5Z" fill="#4D4D4D"/>
</g>
</svg>
        </a> 
      </div>

      <div class="headerContainer">
        <!-- <div></div> -->
        <div class="headerWrapper">
          <div class="header has-text-centered mb-3">
            <h1 class="is-size-2 titleFont pb-5">${this.campaign?.name}</h1>
            <h2 class="is-size-4">${this.campaign?.blurb}</h2>
          </div>
          <!-- <div>
            by
            <b
              >${this.campaign?.managers[0].first_name}
              ${this.campaign?.managers[0].last_name}</b
            >
          </div> -->
        </div>
        <div class="is-flex is-justify-content-space-between is-align-items-center mb-5">
          <div class="is-flex is-align-items-center">
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
            <div class="is-flex is-align-items-center is-flex-gap-5">
              ${this.campaign?.categories.map(
                (category: { name: string }) =>
                  html`<span>${category.name}</span>`
              )}
              </div>
            </div>
              <div class="has-text-right ">
                <menu-component
                  .authState="${this.authState}"
                  .handleAuthStateChange="${this.handleAuthStateChange}"
                  .apiFull="${this.apiFull}"
                  .handleProfile="${this.handleProfile}"
                ></menu-component>
              </div>
            </div>
          </div>
          <div>
            <campaign-info
              .apiUrl=${this.apiUrl}
              .locPath=${this.locPath}
              .campaignId=${this.campaignId}
              .campaign=${this.campaign}
              .currentPage=${this.currentPage}
              .handleContribute=${this.handleContribute}
            ></campaign-info>
          </div>

          <div class="columns campaign-details-container">
          <div class="column is-one-third">
              <div class="columns is-flex contribute-share-container px-4 is-flex-gap-4">
                  <button
                    class="column button is-success is-small is-responsive is-flex-grow-1 campaign-reward-button"
                    @click="${() => this.handleRewardClick('standard', 1)}"
                  >
                    <span class="is-size-5">Contribute</span>
                  </button>

                  <button
                    class="column button is-dark is-small is-responsive is-flex-grow-1 campaign-reward-button"
                  >
                    <span class="is-size-5">Share</span>
                  </button>
              </div>
              <div class="rewards-section mt-6">
                  <campaign-creator-component .campaign="${
                    this.campaign
                  }" .apiUrl="${this.apiUrl}"></campaign-creator-component>

                <div class="mt-6 is-flex is-flex-direction-column is-flex-gap-6">
                ${
                  this.campaign?.pledges && this.campaign?.pledges.length > 0
                    ? this.campaign.pledges.map(
                        (pledge: any) => html`
                          <campaign-reward-component
                            .handleRewardClick=${this.handleRewardClick}
                            .pledge=${pledge}
                            .handleContribute=${this.handleContribute}
                            .campaign=${this.campaign}
                          ></campaign-reward-component>
                          <!-- <card-reward-component
                            .pledge=${pledge}
                            .handleContribute=${this.handleContribute}
                            .campaign=${this.campaign}
                          ></card-reward-component> -->
                        `
                      )
                    : ''
                }
                </div>
              </div>
            </div>


            <div class="column">
              <div class="tabs">
                <ul id="tabs" @click="${this.tabClickEvent}">
                  <li class="is-active">
                    <a data-tab="campaign">Campaign</a>
                  </li>
                  <li><a data-tab="faq">FAQ</a></li>
                  <li><a data-tab="backers">Backers</a></li>
                  <li><a data-tab="updates">Updates</a></li>
                  <li><a data-tab="comments">Comments</a></li>
                </ul>
              </div>
              <div id="tab-content">
                <div class="is-active" data-content="campaign">
                  <campaign-description
                    .campaign="${this.campaign}"
                  ></campaign-description>
                </div>
                <div data-content="faq">
                  <campaign-faq .campaign=${this.campaign}></campaign-faq>
                </div>
                <div data-content="backers">
                  <campaign-backers
                    .apiUrl=${this.apiUrl}
                    .locPath=${this.locPath}
                    .campaignId=${this.campaignId}
                    .campaign=${this.campaign}
                  ></campaign-backers>
                </div>
                <div data-content="updates">Updates</div>
                <div data-content="comments">Comments</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>

      <div class="mobile-menu">
        <a class="mobile-menu-close" @click="${this.mobileMenuToggle}">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_211_8884" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36">
            <rect width="36" height="36" fill="#D9D9D9"/>
            </mask>
            <g mask="url(#mask0_211_8884)">
            <path d="M9.6 28.5L7.5 26.4L15.9 18L7.5 9.6L9.6 7.5L18 15.9L26.4 7.5L28.5 9.6L20.1 18L28.5 26.4L26.4 28.5L18 20.1L9.6 28.5Z" fill="#4D4D4D"/>
            </g>
          </svg>
        </a>
        <div class="mobile-menu-container is-flex is-flex-direction-column is-justify-content-center is-align-items-center is-flex-gap-4">
        <ul class="is-flex is-flex-direction-column is-flex-gap-4 mb-6" id="tabs2" @click="${this.tabClickEvent}">
            <li class="is-active">
              <a  class="titleFont has-text-success has-text-weight-bold is-size-4" data-tab="campaign">Campaign</a>
            </li>
            <li><a class="titleFont has-text-success has-text-weight-bold is-size-4"  data-tab="faq">FAQ</a></li>
            <li><a class="titleFont has-text-success has-text-weight-bold is-size-4"  data-tab="backers">Backers</a></li>
            <li><a class="titleFont has-text-success has-text-weight-bold is-size-4"  data-tab="updates">Updates</a></li>
            <li><a class="titleFont has-text-success has-text-weight-bold is-size-4"  data-tab="comments">Comments</a></li>
          </ul>
          <div class="is-flex is-flex-direction-column is-justify-content-center is-align-items-center is-flex-gap-4 contribute-share-container-mobile">
              <button
                class="button is-success is-small is-flex-grow-1 campaign-reward-button"
                @click="${this.handleContribute}"
              >
                <span class="is-size-5">Contribute</span>
              </button>

              <button
                class="button is-dark is-small is-flex-grow-1 campaign-reward-button"
              >
                <span class="is-size-5">Share</span>
              </button>
          </div>
        </div>
      </div>
    </div>`;
  }

  private getCampaign() {
    fetch(`${this.apiUrl}${this.locPath}campaign/${this.campaignId}`)
      .then(response => {
        if (!response.ok) {
          return;
        }
        return response.json();
      })
      .then(data => {
        this.campaign = data;
        console.log('campaign: ', data);
      })
      .catch(() => {
        console.log('error');
      });
  }

  

  private tabEvent() {
    this.shadowRoot?.getElementById('tabs')?.addEventListener('click', e => {
      let selected: any = e.target;
      if (selected && selected.getAttribute('data-tab')) {
        this.updateActiveTab(selected, 'tabs');
      }
    });

    this.shadowRoot?.getElementById('tabs2')?.addEventListener('click', e => {
      let selected: any = e.target;
      if (selected && selected.getAttribute('data-tab')) {
        this.updateActiveTab(selected, 'tabs2');
      }
    });
  }

  private updateActiveTab(selected: any, tabsName: string) {
    // Update active tab
    let tabs: any = this.shadowRoot?.getElementById(tabsName);
    for (let i = 0; i < tabs.children.length; i += 1) {
      if (
        tabs.children[i] &&
        tabs.children[i].classList.contains('is-active')
      ) {
        tabs.children[i].classList.remove('is-active');
      }
    }
    selected.parentElement.classList.add('is-active');

    // Update active tab content
    let tabContents: any = this.shadowRoot?.getElementById('tab-content');
    for (let i = 0; i < tabContents.children.length; i += 1) {
      if (
        tabContents.children[i] &&
        tabContents.children[i].classList.contains('is-active')
      ) {
        tabContents.children[i].classList.remove('is-active');
      }
      if (
        tabContents.children[i].getAttribute('data-content') ===
        selected.getAttribute('data-tab')
      ) {
        tabContents.children[i].classList.add('is-active');
      }
    }
  }

  private returnString(str: string) {
    var fragment = document.createRange().createContextualFragment(`${str}`);
    return fragment;
  }
}
