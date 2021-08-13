import {
  html,
  css,
  SkhemataBase,
  property,
  CSSResult,
} from '@skhemata/skhemata-base';
import { campaignInfo } from './campaignInfo';
import { campaignFaq } from './campaignFaq';
import { campaignBackers } from './campaignBackers';

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
        .header {
          font-size: 2rem;
          font-weight: 700;
          line-height: 1.33em;
          text-transform: none;
          color: rgba(0,0,0,.8);
        }
      `
    ];
  }

  static get scopedElements() {
    return {
      'campaign-info': campaignInfo,
      'campaign-faq': campaignFaq,
      'campaign-backers': campaignBackers,
    };
  }
  @property({ type: String, attribute: 'api_url' }) apiUrl?: string;
  @property({ type: String, attribute: 'loc_path' }) locPath?: string;
  @property({ type: String, attribute: 'campaign_id' }) campaignId?: number;

  @property({ type: Object}) campaign?: any;

  /**
   * Implement firstUpdated to perform one-time work after
   * the element’s template has been created.
   */
  async firstUpdated() {
    await super.firstUpdated();
    this.getCampaign();
    this.tabEvent();
  }

  render() {
    return html`<div class="container">
      <div class="header"> ${this.campaign?.name} </div>
      <div> ${this.returnString(this.campaign?.description)} </div>
      <div> 
        <span class="icon">
          <i class="fas fa-tags"></i>
        </span>
        ${this.campaign?.categories.map(
          (category: any) =>
            html`${category.name}` 
        )}
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
            <campaign-info .apiUrl=${this.apiUrl} .locPath=${this.locPath} .campaignId=${this.campaignId} .campaign=${this.campaign}></campaign-info>
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
    fetch(
      `${this.apiUrl}${this.locPath}campaign/${this.campaignId}`
    )
    .then(response => {
      if(!response.ok){
        return;
      }
      return response.json();
    })
    .then(data => {
      this.campaign = data;
    }).catch(() => {
      console.log('error');
    });
  }

  private tabEvent() {
    this.shadowRoot?.getElementById("tabs")?.addEventListener('click', (e) => {
      let selected:any = e.target;
      if(selected && selected.getAttribute("data-tab")) {
        this.updateActiveTab(selected);
      }
    })
  }

  private updateActiveTab(selected:any) {
    // Update active tab
    let tabs:any = this.shadowRoot?.getElementById("tabs");
    for (let i = 0; i < tabs.children.length; i+=1) {
      if(tabs.children[i] && tabs.children[i].classList.contains("is-active")) {
        tabs.children[i].classList.remove("is-active");
      }
    }
    selected.parentElement.classList.add("is-active");

    // Update active tab content
    let tabContents:any = this.shadowRoot?.getElementById("tab-content");
    for (let i = 0; i < tabContents.children.length; i+=1) {
      if(tabContents.children[i] && tabContents.children[i].classList.contains("is-active")) {
        tabContents.children[i].classList.remove("is-active");
      }
      if(tabContents.children[i].getAttribute("data-content") === selected.getAttribute("data-tab")) {
        tabContents.children[i].classList.add("is-active");
      }
    }
  }

  private returnString(str:string) {
    var fragment = document.createRange().createContextualFragment(`${ str }`);
    return fragment;
  }
}
