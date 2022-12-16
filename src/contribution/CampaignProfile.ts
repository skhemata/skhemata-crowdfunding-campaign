/* eslint-disable lit-a11y/anchor-is-valid */
/* eslint-disable lit-a11y/click-events-have-key-events */
/* eslint-disable import/no-extraneous-dependencies */
import { CSSResult, html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { Bulma } from '@skhemata/skhemata-css';
import { Menu } from '../components/Menu';

export class CampaignProfile extends LitElement {
  static styles = <CSSResult[]>[
    Bulma,
    css`
      /* .cardReward {
        max-width: 300px;
        margin: 0 auto;
      } */

      .cardReward header {
        cursor: pointer;
      }

      img {
        max-width: 100%;
        height: auto;
      }

      .image-box {
        width: 200px;
        height: 200px;
        overflow: hidden;
        border-radius: 50%;
        border: 1px solid #e6e6e6;
      }

      .campaign-info {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
      }

      h1 {
        font-size: 2rem;
        font-weight: 700;
        line-height: 1.33em;
        text-transform: none;
        color: rgba(0, 0, 0, 0.8);
        text-transform: capitalize;
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

  //   async firstUpdated() {}

  handleRewardOpen = () => {
    this.openStatus = !this.openStatus;
  };

  render() {
    console.log(this.campaign);

    return html`
      <div class="campaign-info-container">
        <div class="campaign-info">
          <div class="image-box">
            <img
              src="${`https://coral.thrinacia.com/api/image/campaign_detail_large/${this.campaign?.files[0].path_external}`}"
              alt=""
            />
          </div>
          <div>
            <h1>${this.campaign?.name}</h1>
            <span
              >by
              <b
                >${this.campaign?.managers[0].first_name}
                ${this.campaign?.managers[0].last_name}</b
              >
            </span>
          </div>
          <div class="campaign-info-menuWrapper">
            <menu-component></menu-component>
          </div>
        </div>
      </div>
    `;
  }
}
