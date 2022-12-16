/* eslint-disable lit-a11y/anchor-is-valid */
/* eslint-disable lit-a11y/click-events-have-key-events */
/* eslint-disable import/no-extraneous-dependencies */
import {
    html,
    css,
    SkhemataBase,
    property,
    CSSResult,
} from '@skhemata/skhemata-base';

import { Bulma } from '@skhemata/skhemata-css';
  
export class CardInfo extends SkhemataBase {
  static styles = <CSSResult[]>[
    Bulma,
    css`
        .cardInformaionWrapper {
            margin-top: 3rem;
        }

        .trible-box-wrapper {
            display: grid;
            grid-template-columns: 2fr 1fr 1fr;
            gap: 1rem;
        }
    
    `,
  ];

  static get scopedElements() {
    return {
        // 'menu-component': Menu,
    };
  }


  @property({ type: Object }) campaign?: any;

  @property({ type: String, attribute: 'nameOnCard' }) nameOnCard?: string;

  @property({ type: String, attribute: 'nameOnCardError' }) nameOnCardError?: string;

  //   async firstUpdated() {}

  handleNameOnCardChange = (e: any) => {
    this.nameOnCard = e.target.value;
  }

  render() {


    return html`
        <div class="field cardInformaionWrapper">
            
            <h3 class="title">Card Information</h3>

            <div class="reward-section-box">
                <div class="control">
                    <input
                    class="input ${this.nameOnCardError ? "is-danger" : ""}"
                    type="text"
                    placeholder="Name on Card"
                    @change="${this.handleNameOnCardChange}"
                    />
                    ${this.nameOnCardError ? html`<p class="help is-danger">${this.nameOnCardError}</p>` : html``}
                </div>

                <div class="control trible-box-wrapper">
                    <input
                        class="input"
                        type="text"
                        placeholder="Credit Card Number"
                    />
                    <input
                        class="input"
                        type="text"
                        placeholder="MM/YY"
                    />
                    <input
                        class="input"
                        type="text"
                        placeholder="CVC"
                    />
                </div>
            </div>
        </div>
    `;
  }
}
