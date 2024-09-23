import axios from 'axios';
import { sha256 } from 'js-sha256';
import { apiClient } from './host';

class AuthService {
  #prefixLogin = 'auth/login';
  #prefixLogout = 'auth/logout';
  #prefixUser = 'users/';

  async signIn(data) {
    return apiClient.post(this.#prefixLogin, data);
  }

  async signUp(data) {
    return apiClient.post(this.#prefixUser, data);
  }

  async signOut() {
    const res = await fetch(this.#prefixLogout);
    if (!res.ok) throw new Error(`status: ${res.status}. Status text: ${res.statusText}`);
  }

  async getGravatar(email) {
    const hash = sha256(String(email).trim().toLowerCase());
    return axios.get(`https://gravatar.com/avatar/${hash}`, { responseType: 'blob' });
  }
}

export default new AuthService();
