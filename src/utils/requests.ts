/* eslint-disable no-console */
/* eslint-disable import/extensions */
const API_URL = 'https://coral.thrinacia.com/api/service/restv1';

export async function loginRequest(url: string, method: any, data: any) {
  let resp: any;

  try {
    resp = await fetch(API_URL + url, {
      method,
      body: JSON.stringify(data),
    });
    console.log('RESPONSE: ', resp);
  } catch (error) {
    console.log('ERROR: ', error);
  }

  return resp;
}

export async function sendRequest(url: string, method: any, data: any) {
  const authToken = window.localStorage.getItem('skhemataToken');

  let resp: any;

  try {
    resp = await fetch(API_URL + url, {
      method,
      headers: {
        'X-Auth-Token': authToken || '',
      },
      body: JSON.stringify(data),
    });
    console.log('RESPONSE: ', resp);
  } catch (error) {
    console.log('ERROR: ', error);
  }

  return resp;
}

// export async function getHeaders(url: string) {
//   const authToken = window.localStorage.getItem('skhemataToken');

//   let headers: any;

//   try {
//     const resp = await fetch(API_URL + url, {
//       headers: {
//         'X-Auth-Token': authToken || '',
//       },
//     });

//     // console.log('Resp: ', resp);

//     headers = [...resp.headers];
//   } catch (error) {
//     console.log(error);
//   }

//   return headers;
// }
