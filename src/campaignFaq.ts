/* eslint-disable prefer-template */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable prefer-const */
/* eslint-disable no-restricted-syntax */
import {
  html,
  css,
  SkhemataBase,
  property,
  CSSResult,
} from '@skhemata/skhemata-base';

export class campaignFaq extends SkhemataBase {
  static get styles() {
    return <CSSResult[]>[
      ...super.styles,
      css`
        .faq-question {
          background-color: #eee;
          color: #444;
          cursor: pointer;
          padding: 15px;
          width: 100%;
          text-align: left;
          border: none;
          outline: none;
          transition: 0.3s;
          border-radius: 5px;
          margin-top: 5px;
        }
        .faq-answer {
          padding: 0 15px;
          background-color: #fff;
          max-height: 0px;
          overflow: hidden;
          transition: max-height 0.3s ease-out;
        }
      `,
    ];
  }

  @property({ type: Object, attribute: 'campaign' }) campaign?: any;

  @property({ type: String }) campaignFaq?: any;

  async firstUpdated() {
    this.faqQuestionListener();
  }

  updated() {
    if (this.campaignFaq === undefined) {
      this.getFaq();
    }
  }

  render() {
    return html`
      <div class="columns">
        <div class="faq-container column">${this.campaignFaq}</div>
      </div>
    `;
  }

  private getFaq() {
    if (this.campaign && this.campaign.faqs) {
      for (let key in this.campaign.faqs) {
        if (this.campaign.faqs && this.campaign.faqs[key].disabled === false) {
          this.campaignFaq = html`<div class="faq-title">
            <div class="faq-name">${this.campaign.faqs[key].name}</div>
            <div class="faq-description">
              ${this.campaign.faqs[key].description}
            </div>
          </div>`;
          for (let index in this.campaign.faqs[key].faq_pairs) {
            if (
              this.campaign.faqs[key].faq_pairs &&
              this.campaign.faqs[key].faq_pairs[index].disabled === false
            ) {
              this.campaignFaq = html`${this.campaignFaq}
                <div class="faq-pair">
                  <div class="faq-question">
                    ${this.campaign.faqs[key].faq_pairs[index].question}
                  </div>
                  <div class="faq-answer">
                    ${this.campaign.faqs[key].faq_pairs[index].answer}
                  </div>
                </div>`;
            }
          }
          this.campaignFaq = html`<div class="faq-group">
            ${this.campaignFaq}
          </div>`;
        }
      }
      this.campaignFaq = html`<div class="faq-container">
        ${this.campaignFaq}
      </div>`;
    }
  }

  private faqQuestionListener() {
    const faqPair: any = this.shadowRoot?.querySelector('.faq-container');
    if (faqPair) {
      faqPair.addEventListener('click', function (event: any) {
        let question: any = event.target;
        if (question.classList.contains('faq-question')) {
          let answer = question.nextElementSibling;
          question.classList.toggle('active');
          if (answer.style.maxHeight) {
            answer.style.maxHeight = null;
          } else {
            answer.style.maxHeight = answer.scrollHeight + 'px';
          }
        }
      });
    }
  }
}
