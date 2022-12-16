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
// import Stripe from 'stripe';
import { campaignInfo } from './campaignInfo';
import { campaignFaq } from './campaignFaq';
import { campaignBackers } from './campaignBackers';
import { CampaignContribution } from './CampaignContribution';
import { Menu } from './components/Menu';

export class SkhemataCrowdfundingCampaign extends SkhemataBase {
  static get styles() {
    return <CSSResult[]>[
      ...super.styles,
      css`
        #tab-content div {
          display: none;
        }
        #tab-content div.is-active {
          display: block;
        }
        .header h1 {
          font-size: 2rem;
          font-weight: 700;
          line-height: 1.33em;
          text-transform: none;
          color: rgba(0, 0, 0, 0.8);
          text-transform: capitalize;
        }

        .headerContainer {
          display:grid;
          grid-template-columns: repeat(3, 1fr);
          margin-bottom: 1rem;
          text-align: center;
          align-items: center;
        }

        .headerWrapper {
          grid-column: 2 / 3;
        }

        .menuWrapper {
          grid-column: 3 / 4;
          /* text-align: right; */
          justify-self: flex-end;
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
    };
  }

  @property({ type: String, attribute: 'api_url' }) apiUrl?: string;

  @property({ type: String, attribute: 'loc_path' }) locPath?: string;

  @property({ type: String, attribute: 'api_full' }) apiFull?: string;

  @property({ type: String, attribute: 'campaign_id' }) campaignId?: number;

  @property({ type: String, attribute: 'currentPage' }) currentPage?: string;

  @property({ type: Object }) campaign?: any;

  /**
   * Implement firstUpdated to perform one-time work after
   * the element’s template has been created.
   */
  async firstUpdated() {
    await super.firstUpdated();
    this.getCampaign();
    this.tabEvent();

    if(this.apiUrl && this.locPath) {
      this.apiFull = this.apiUrl + this.locPath;
    } else {
      this.apiFull = '';
    }
  }

  handleContribute = () => {
    this.currentPage = 'contribution';
  };

  handleBack = () => {
    this.currentPage = '';
  };

  render() {  
    if (this.currentPage === 'contribution') {
      return html`<campaign-contribution
        .currentPage="${this.currentPage}"
        .handleBack="${this.handleBack}"
        .campaign="${this.campaign}"
        .apiFull = "${this.apiFull}"
      ></campaign-contribution>`;
    }

    return html`
    <div class="container">
      <div class="headerContainer">
        <!-- <div></div> -->
        <div class="headerWrapper">
          <div class="header"> 
            <h1>${this.campaign?.name}</h1>
          </div>
          <div>by <b>${this.campaign?.managers[0].first_name} ${this.campaign?.managers[0].last_name}</b>
          </div>
        </div>
        <div class="menuWrapper">
          <menu-component .apiFull="${this.apiFull}"></menu-component>
        </div>
      </div>
        <div class="tabs">
          <ul id="tabs">
            <li class="is-active"><a data-tab="campaign">Campaign</a></li>
            <li><a data-tab="faq">FAQ</a></li>
            <li><a data-tab="backers">Backers</a></li>
            <li><a data-tab="updates">Updates</a></li>
            <li><a data-tab="comments">Comments</a></li>
          </ul>
        </div>
        <div id="tab-content">
          <div class="is-active" data-content="campaign">
            <campaign-info .apiUrl=${this.apiUrl} .locPath=${this.locPath} .campaignId=${this.campaignId} .campaign=${this.campaign} .currentPage=${this.currentPage} .handleContribute=${this.handleContribute}></campaign-info>
          </div>
          <div data-content="faq">
            <campaign-faq .campaign=${this.campaign}></campaign-faq>
          </div>
          <div data-content="backers">
            <campaign-backers .apiUrl=${this.apiUrl} .locPath=${this.locPath} .campaignId=${this.campaignId} .campaign=${this.campaign}></campaign-backers>
          </div>
          <div data-content="updates">
            Updates
          </div>
          <div data-content="comments">
            Comments
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
        this.updateActiveTab(selected);
      }
    });
  }

  private updateActiveTab(selected: any) {
    // Update active tab
    let tabs: any = this.shadowRoot?.getElementById('tabs');
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
