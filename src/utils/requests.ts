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
