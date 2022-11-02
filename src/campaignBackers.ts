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

export class campaignBackers extends SkhemataBase {
  static get styles() {
    return <CSSResult[]>[...super.styles, css``];
  }

  @property({ type: String, attribute: 'api_url' }) apiUrl?: number;

  @property({ type: String, attribute: 'loc_path' }) locPath?: number;

  @property({ type: String, attribute: 'campaign_id' }) campaignId?: number;

  @property({ type: Object }) backers?: any;

  @property({ type: String }) campaignBackers?: any;

  async firstUpdated() {
    this.getBackers();
  }

  updated() {}

  render() {
    return html`
      <div class="columns">
        <div class="backers-container column">${this.campaignBackers}</div>
      </div>
    `;
  }

  private getBackers() {
    fetch(`${this.apiUrl}${this.locPath}campaign/${this.campaignId}/backer`)
      .then(response => {
        if (!response.ok) {
          return;
        }
        return response.json();
      })
      .then(data => {
        this.backers = data;
        this.backersMarkup();
      })
      .catch(() => {
        console.log('error');
      });
  }

  private backersMarkup() {
    if (this.backers) {
      console.log(this.backers);
      for (let key in this.backers) {
        this.campaignBackers = html`<div class="faq-title">
          ${this.backers[key].first_name} ${this.backers[key].last_name}
          ${this.backers[key].total_amount} Backed
          ${this.backers[key].total_backed}
          ${this.backers[key].total_backed === 1 ? 'Campaign' : 'Campaigns'}
        </div> `;
      }
    }
  }
}
