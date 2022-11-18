/* eslint-disable lit-a11y/anchor-is-valid */
/* eslint-disable lit-a11y/click-events-have-key-events */
/* eslint-disable import/no-extraneous-dependencies */
import { CSSResult, html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { Bulma } from '@skhemata/skhemata-css';

export class CardReward extends LitElement {
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
    `,
  ];

  @property({ type: Object }) pledge: any;

  @property({ type: Boolean })
  openStatus = false;

  @property({ type: Function })
  handleContribute!: () => void;

  //   async firstUpdated() {}

  handleRewardOpen = () => {
    this.openStatus = !this.openStatus;
  };

  render() {
    return html`
      <div class="card cardReward">
        <header class="card-header" @click="${this.handleRewardOpen}">
          <p class="card-header-title">
            ${this.pledge.name} - ${this.pledge.amount} CAD
          </p>
        </header>
        <div class="card-content ${this.openStatus ? '' : 'is-hidden'}">
          <div class="content">
            ${this.pledge.description}

            <br />
            <time datetime="2016-1-1">${this.pledge.created}</time>
          </div>
        </div>
        <footer class="card-footer ${this.openStatus ? '' : 'is-hidden'}">
          <a class="card-footer-item" @click="${this.handleContribute}"
            >Contribute</a
          >
        </footer>
      </div>
    `;
  }
}
