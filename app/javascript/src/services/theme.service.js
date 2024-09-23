import { apiClient } from './host';

class ThemeService {
  #prefix = 'themes/';

  async getAll() {
    return apiClient.get(this.#prefix);
  }

  async getById(id) {
    return apiClient.get(`${this.#prefix}${id}`);
  }
}

export default new ThemeService();
