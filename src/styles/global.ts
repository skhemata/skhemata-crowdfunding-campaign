import { css } from 'lit';

export const GlobalStyles = css`
  /* @import url('https://fonts.googleapis.com/css2?family=Montserrat&family=Nunito:wght@600;700&display=swap'); */

  /* *,
  *::before,
  *::after {
    box-sizing: border-box;
  } */

  * {
    font-family: 'Montserrat', sans-serif;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
  }

  .titleFont,
  .campaign-description h2,
  .campaign-description h2 span,
  .campaign-description h3,
  .campaign-description h3 span,
  .campaign-description h4,
  .campaign-description h4 span,
  .campaign-description h5,
  .campaign-description h5 span {
    font-family: 'Nunito', sans-serif;
    font-weight: 600;
    font-style: normal;
    line-height: 112.5%;
  }

  .btnRadius {
    border-radius: 7.5px;
  }

  .is-flex-gap-0 {
    gap: 0;
  }
  .is-flex-gap-1 {
    gap: 0.25rem;
  }
  .is-flex-gap-2 {
    gap: 0.5rem;
  }
  .is-flex-gap-3 {
    gap: 0.75rem;
  }
  .is-flex-gap-4 {
    gap: 1rem;
  }
  .is-flex-gap-5 {
    gap: 1.5rem;
  }
  .is-flex-gap-6 {
    gap: 3rem;
  }
`;
