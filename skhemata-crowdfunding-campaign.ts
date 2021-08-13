import { SkhemataCrowdfundingCampaign } from './src/SkhemataCrowdfundingCampaign.js';
import { campaignInfo } from './src/campaignInfo.js';
import { campaignFaq } from './src/campaignFaq.js';
import { campaignBackers } from './src/campaignBackers.js';

window.customElements.define(
  'skhemata-crowdfunding-campaign',
  SkhemataCrowdfundingCampaign
);
window.customElements.define(
  'campaign-info',
  campaignInfo
);
window.customElements.define(
  'campaign-faq',
  campaignFaq
);
window.customElements.define(
  'campaign-backers',
  campaignBackers
);
