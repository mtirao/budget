/**
 * @format
 */

import { encode as base64Encode } from 'base-64';
import * as Keychain from 'react-native-keychain';

const LOGIN_URL = 'http://localhost:3001/api/wanaka/accounts/login';
const KEYCHAIN_SERVICE = 'com.budget.auth';

type LoginResponse = {
  accesstoken: string;
  refreshtoken: string;
  tokentype: string;
};

export async function login(email: string, password: string): Promise<void> {
  const response = await fetch(LOGIN_URL, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${base64Encode(`${email}:${password}`)}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Login failed with status ${response.status}`);
  }

  const { accesstoken, refreshtoken, tokentype }: LoginResponse =
    await response.json();

  await Keychain.setGenericPassword(
    tokentype,
    JSON.stringify({ accesstoken, refreshtoken }),
    { service: KEYCHAIN_SERVICE },
  );
}

export async function getAccessToken(): Promise<string | null> {
  const credentials = await Keychain.getGenericPassword({
    service: KEYCHAIN_SERVICE,
  });
  if (!credentials) {
    return null;
  }
  const { accesstoken } = JSON.parse(credentials.password);
  return accesstoken;
}

export async function logout(): Promise<void> {
  await Keychain.resetGenericPassword({ service: KEYCHAIN_SERVICE });
}
