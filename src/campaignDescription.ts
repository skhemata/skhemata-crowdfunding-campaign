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
import { Bulma } from '@skhemata/skhemata-css';
import { CardReward } from './components/CardReward';
import { GlobalStyles } from './styles/global';

export class campaignDescription extends SkhemataBase {
  static get styles() {
    return <CSSResult[]>[
      ...super.styles,
      Bulma,
      GlobalStyles,
      css`
        .campaign-description h2,
        .campaign-description h2 span,
        .campaign-description h3,
        .campaign-description h3 span,
        .campaign-description h4,
        .campaign-description h4 span,
        .campaign-description h5,
        .campaign-description h5 span {
          margin-bottom: 1rem;
          margin-top: 1.5rem;
          color: hsl(0, 0%, 4%) !important;
          font-size: 1.5rem;
        }

        .campaign-description p,
        .campaign-description p span,
        .campaign-description li,
        .campaign-description li span {
          font-style: normal;
          font-weight: 400;
          font-size: 1.25rem;
          line-height: 150%;
        }

        .campaign-description p {
          margin-bottom: 1rem;
        }

        .campaign-description ul,
        .campaign-description ol {
          padding-left: 2rem;
        }

        .campaign-description h1,
        .campaign-description h2,
        .campaign-description h3,
        .campaign-description h4,
        .campaign-description h5,
        .campaign-description h6 {
          text-transform: capitalize;
        }
      `,
    ];
  }

  static get scopedElements() {
    return {
      'card-reward-component': CardReward,
    };
  }

  //   @property({ type: String, attribute: 'api_url' }) apiUrl?: number;

  //   @property({ type: String, attribute: 'loc_path' }) locPath?: number;

  //   @property({ type: String, attribute: 'campaign_id' }) campaignId?: number;

  @property({ type: Object, attribute: 'campaign' }) campaign?: any;

  async firstUpdated() {
    // fetch('https://coral.thrinacia.com/api/service/restv1/locale/currency', {
    //   credentials: 'include',
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log('currencies: ', data);
    //     this.currencies = data;
    //   })
    //   .catch(e => console.log(e));
  }

  render() {
    return html`
      <div class="columns">
        <div class="left-info column">
          <div class="campaign-description">
            <!-- <div>About this campaign</div> -->
            <div>${this.returnString()}</div>
          </div>
        </div>
      </div>
    `;
  }

  // private getCampaignMainImage() {
  //   if (this.campaign && this.campaign.files) {
  //     for (const key in this.campaign.files) {
  //       if (this.campaign.files[key].region_id === 3) {
  //         this.campaignMainImage =
  //           this.apiUrl +
  //           '/image/campaign_detail_large/' +
  //           this.campaign.files[key].path_external;
  //       }
  //     }
  //   }
  // }

  // private embedListener() {
  //   const dropdown: any = this.shadowRoot?.querySelector('.dropdown');
  //   dropdown.addEventListener('click', function (event: any) {
  //     event.stopPropagation();
  //     dropdown.classList.toggle('is-active');
  //   });
  // }

  // private embedUrl() {
  //   let embedPath: any = window.location.origin;
  //   return embedPath + '/embed/card-view/' + this.campaignId;
  // }

  private returnString() {
    let fragment = document
      .createRange()
      .createContextualFragment(`${this.campaign?.description}`);
    return fragment;
  }
}
