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

  @property({ type: String, attribute: 'api_full' }) apiFull?: string;

  @property({ type: Boolean }) authState = false;

  @property({ type: Function })
  handleAuthStateChange!: () => void;

//   async firstUpdated() {}




 // logout
 handleLogout = () => {
  const url = `${this.apiFull}logout`;
  
    fetch(url, {
      method: 'POST',
      // credentials: 'include',
      // mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        console.log(response);
        window.localStorage.removeItem('skhemataToken');
        this.handleAuthStateChange();
        this.requestUpdate();
        // window.location.reload();
      })
      .catch(e => console.log(e));
  };

  render() {
    console.log('Manu api full: ', this.apiFull);
    
    return html`
      <div class="dropdown is-hoverable menuDropdown">
        <div class="dropdown-trigger">
            <button class="button" aria-haspopup="true" aria-controls="dropdown-menu4">
                <span>Settings</span>
                <span class="icon is-small">
                <svg
                    viewbox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style="width: 12px; height: 12px"
                >
                    <path
                    d="M9.08329 0.666626C8.74996 0.333293 8.24996 0.333293 7.91663 0.666626L4.99996 3.58329L2.08329 0.666626C1.74996 0.333293 1.24996 0.333293 0.916626 0.666626C0.583293 0.999959 0.583293 1.49996 0.916626 1.83329L4.41663 5.33329C4.58329 5.49996 4.74996 5.58329 4.99996 5.58329C5.24996 5.58329 5.41663 5.49996 5.58329 5.33329L9.08329 1.83329C9.41663 1.49996 9.41663 0.999959 9.08329 0.666626Z"
                    fill="currentColor"
                    ></path>
                </svg>
                </span>
            </button>
        </div>
        <div class="dropdown-menu" id="dropdown-menu4" role="menu">
            <div class="dropdown-content">
            <div class="dropdown-item">
                <a href="#">Profile</a>
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
