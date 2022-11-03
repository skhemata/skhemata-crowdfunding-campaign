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
import { CardReward } from './components/CardReward';

export class campaignInfo extends SkhemataBase {
  static get styles() {
    return <CSSResult[]>[
      ...super.styles,
      css`
        .raise-mode {
          border-radius: 5px;
          padding: 5px;
          line-height: 2.5;
        }
        .campaign-info-highlight {
          font-size: 32px;
          font-weight: 700;
          display: block;
        }
        .right-info {
          text-align: center;
        }
        .right-info > div {
          margin-bottom: 30px;
        }
        .start-end-time {
          border-radius: 5px;
        }

        .rewards-section {
          display: flex;
          flex-direction: column;
          gap: 20px;
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

  @property({ type: String, attribute: 'currentPage' }) currentPage?: string;

  @property({ type: Array, attribute: 'activeRewards' })
  activeRewards: number[] = [];

  @property({ type: Function })
  handleContribute!: () => void;

  @property({ type: String }) campaignMainImage?: any;

  async firstUpdated() {
    this.embedListener();
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

  render() {
    return html`
      <div class="columns">
        <div class="left-info column">
          <img alt="main campaign" src=${this.campaignMainImage} />

          <div class="dropdown">
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
          </div>

          <div>About this campaign</div>
          <div>${this.returnString()}</div>
        </div>
        <div class="right-info column">
          <div>
            <span class="raise-mode has-text-white-ter has-background-black"
              >Raise mode</span
            >
            ${this.campaign?.raise_mode_id === 1
              ? 'All or Nothing'
              : 'Keep it All'}
          </div>
          <div>
            <span class="campaign-info-highlight has-text-info"
              >${this.campaign?.total_backers}</span
            >
            ${this.campaign?.total_backers === 1 ? 'Backer' : 'Backers'}
          </div>
          <div>
            <span class="campaign-info-highlight has-text-info"
              >${this.campaign?.funded_amount}</span
            >
          </div>
          <div>
            <span class="campaign-info-highlight has-text-info"
              >${this.campaign?.funded_percentage}%</span
            >
            of ${this.campaign?.funding_goal}
          </div>
          <div>
            <span class="campaign-info-highlight has-text-info"
              >${this.campaign?.days_remaining}
              ${this.campaign?.days_remaining === 1
                ? 'Day to go'
                : 'Days to go'}</span
            >
          </div>
          <div class="start-end-time has-background-grey-lighter">
            <div>${this.campaign?.starts_date_time}</div>
            <div>${this.campaign?.ends_date_time}</div>
          </div>

          <div>
            <button class="button" @click="${this.handleContribute}">
              Contribute
            </button>
          </div>

          <div class="rewards-section">
            ${this.campaign?.pledges && this.campaign?.pledges.length > 0
              ? this.campaign.pledges.map(
                  (pledge: any) => html`
                    <card-reward-component
                      .pledge=${pledge}
                    ></card-reward-component>
                  `
                )
              : ''}
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
    dropdown.addEventListener('click', function (event: any) {
      event.stopPropagation();
      dropdown.classList.toggle('is-active');
    });
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
