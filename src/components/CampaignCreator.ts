/* eslint-disable lit/binding-positions */
/* eslint-disable lit-a11y/anchor-is-valid */
/* eslint-disable lit-a11y/click-events-have-key-events */
/* eslint-disable import/no-extraneous-dependencies */
import { CSSResult, html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { Bulma } from '@skhemata/skhemata-css';
import { GlobalStyles } from '../styles/global';

export class CampaignCreator extends LitElement {
  static styles = <CSSResult[]>[
    Bulma,
    GlobalStyles,
    css`
      .campaign-creator-container {
        border-radius: 9px;
      }

      .campaign-creator-image-box {
        gap: 4px;
      }
    `,
  ];

  @property({ type: String, attribute: 'api_url' }) apiUrl?: string;

  @property({ type: Object }) campaign?: any;

  //   async firstUpdated() {}

  render() {
    // https://origin.thrinacia.com/api/image/campaign_profile
    // https://i.pravatar.cc/300

    // "${this.campaign?.managers[0]?.person_files[0]?.path_external
    //   ? `${this.apiUrl}/image/campaign_profile/${this.campaign?.managers[0].person_files[0].path_external}`
    //   : 'https://via.placeholder.com/300'}"
    console.log(this.apiUrl);

    return html`
      <div
        class="columns campaign-creator-container has-background-grey-lighter p-2"
      >
        <div
          class="column is-one-quarter campaign-creator-image-box is-flex is-flex-direction-column is-justify-content-center is-align-items-center"
        >
          <figure class="image is-96x96">
            <img
              class="is-rounded"
              alt="campaign creator avatar"
              src="https://via.placeholder.com/300"
            />
          </figure>
          <h4 class="titleFont is-size-7 has-text-centered">
            ${this.campaign?.managers[0].first_name}
            ${this.campaign?.managers[0].last_name}
          </h4>
        </div>
        <div class="column campaign-creator-info-box">
          <h3 class="titleFont is-size-6 mb-2">Campaign Creator</h3>
          <p class="is-size-7">${this.campaign?.managers[0].bio}</p>
        </div>
      </div>
    `;
  }
}
