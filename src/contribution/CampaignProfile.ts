/* eslint-disable no-restricted-syntax */
/* eslint-disable lit-a11y/anchor-is-valid */
/* eslint-disable lit-a11y/click-events-have-key-events */
/* eslint-disable import/no-extraneous-dependencies */
import { CSSResult, html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { Bulma } from '@skhemata/skhemata-css';
import { Menu } from '../components/Menu';
import { GlobalStyles } from '../styles/global';

export class CampaignProfile extends LitElement {
  static styles = <CSSResult[]>[
    Bulma,
    GlobalStyles,
    css`
      /* .cardReward {
        max-width: 300px;
        margin: 0 auto;
      } */

      .image-box img {
        border: 3px solid #f5f5f5;
      }
    `,
  ];

  static get scopedElements() {
    return {
      'menu-component': Menu,
    };
  }

  @property({ type: Boolean })
  openStatus = false;

  @property({ type: Object }) campaign?: any;

  @property({ type: String, attribute: 'api_url' }) apiUrl?: string;

  @property({ type: String }) campaignMainImage?: any;

  updated() {
    this.getCampaignMainImage();
  }

  //   async firstUpdated() {}

  handleRewardOpen = () => {
    this.openStatus = !this.openStatus;
  };

  private getCampaignMainImage() {
    if (this.campaign && this.campaign.files) {
      for (const key in this.campaign.files) {
        if (this.campaign.files[key].region_id === 3) {
          this.campaignMainImage = `${this.apiUrl}/image/campaign_detail_large/${this.campaign.files[key].path_external}`;
        }
      }
    }
  }

  render() {
    console.log(this.campaign);

    return html`
      <div class="campaign-info-container has-background-grey-dark py-6">
        <div
          class="campaign-info is-flex is-justify-content-center is-align-items-center"
        >
          <div class="image-box">
            <figure class="image is-96x96 is-flex">
              <img
                class="is-rounded"
                src="${this.campaignMainImage ||
                'https://via.placeholder.com/300'}"
                alt="campaign avatar"
              />
            </figure>
          </div>

          <div class="ml-4 has-text-white">
            <h1 class="is-size-3 titleFont pb-5">${this.campaign?.name}</h1>
            <h2 class="is-size-5">${this.campaign?.blurb}</h2>
          </div>
          <div class="campaign-info-menuWrapper">
            <menu-component></menu-component>
          </div>
        </div>
      </div>
    `;
  }
}
