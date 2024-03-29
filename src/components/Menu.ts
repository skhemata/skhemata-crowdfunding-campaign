/* eslint-disable camelcase */
/* eslint-disable lit-a11y/anchor-is-valid */
/* eslint-disable lit-a11y/click-events-have-key-events */
/* eslint-disable import/no-extraneous-dependencies */
// import { CSSResult, html, css, LitElement } from 'lit';
import {
  html,
  css,
  SkhemataBase,
  property,
  CSSResult,
} from '@skhemata/skhemata-base';
import { Bulma } from '@skhemata/skhemata-css';
import { arrowDown } from '../utils/icons';

export class Menu extends SkhemataBase {
  static styles = <CSSResult[]>[
    Bulma,
    css`
      .menuDropdown .dropdown-trigger button,
      .menuDropdown .dropdown-trigger button:focus {
        background: none;
        border: none;
        padding: 0;
        text-align: left;
        outline: none;
      }
      .menuDropdown .dropdown-content {
        width: 60%;
        text-align: left;
      }
    `,
  ];

  @property({ type: String }) apiFull: string | undefined;

  @property({ type: Object }) userData = {
    email: '',
    first_name: '',
    last_name: '',
  };

  @property({ type: Boolean }) authState: boolean | undefined;

  @property({ type: Function })
  handleAuthStateChange!: () => void;

  @property({ type: Function })
  handleProfile!: () => void;

  async firstUpdated() {
    await super.firstUpdated();
    await this.loadUser();
  }

  loadUser = async () => {
    const url = `${this.apiFull}authenticate`;

    const res = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': `${window.localStorage.getItem('skhemataToken')}`,
      },
    });
    const data = await res.json();
    const { first_name, last_name, email } = data;

    this.userData = {
      first_name,
      last_name,
      email,
    };
  };

  // logout
  handleLogout = () => {
    const url = `${this.apiFull}logout`;

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        window.localStorage.removeItem('skhemataToken');
        this.handleAuthStateChange();
        this.requestUpdate();
      })
      .catch(e => console.log(e));
  };

  render() {
    return html`
      <div class="dropdown is-hoverable menuDropdown">
        <div class="dropdown-trigger">
          <button
            class="button"
            aria-haspopup="true"
            aria-controls="dropdown-menu4"
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 18.0002C21.7875 18.0002 24.8571 14.9412 24.8571 11.1668C24.8571 7.39248 21.7875 4.3335 18 4.3335C14.2125 4.3335 11.1429 7.39248 11.1429 11.1668C11.1429 14.9412 14.2125 18.0002 18 18.0002ZM15.5518 20.5627C10.275 20.5627 6 24.8228 6 30.0813C6 30.9568 6.7125 31.6668 7.59107 31.6668H28.4089C29.2875 31.6668 30 30.9568 30 30.0813C30 24.8228 25.725 20.5627 20.4482 20.5627H15.5518Z"
                fill="#48C78E"
              />
            </svg>
            <span>${this.userData.first_name || 'Profile'}</span>
            <span class="icon is-small"> ${arrowDown} </span>
          </button>
        </div>
        <div class="dropdown-menu" id="dropdown-menu4" role="menu">
          <div class="dropdown-content">
            <div class="dropdown-item">
              <a @click="${this.handleProfile}">Profile</a>
            </div>
            <div class="dropdown-item">
              <a @click="${this.handleLogout}">Log Out</a>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
