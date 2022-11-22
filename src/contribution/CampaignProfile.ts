/* eslint-disable lit-a11y/anchor-is-valid */
/* eslint-disable lit-a11y/click-events-have-key-events */
/* eslint-disable import/no-extraneous-dependencies */
import { CSSResult, html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { Bulma } from '@skhemata/skhemata-css';

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
        width: 100%;
        height: auto;
      }

      .image-box {
        width: 200px;
        height: 200px;
      }
    `,
  ];

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
        campaign profile
        <div>
          <div class="image-box">
            <img
              src="${`https://coral.thrinacia.com/api/image/campaign_detail_large/${this.campaign?.files[0].path_external}`}"
              alt=""
            />
          </div>
          <div>
            <h1>${this.campaign?.name}</h1>
          </div>
        </div>
      </div>
    `;
  }
}
