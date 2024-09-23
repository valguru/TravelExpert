import { apiClient } from './host';

class ImageService {
  #prefix = 'images/';

  async getAll() {
    return apiClient.get(this.#prefix);
  }

  async getById(id) {
    return apiClient.get(`${this.#prefix}${id}`);
  }

  async getByThemeId(themeId) {
    return apiClient.get(`${this.#prefix}?theme_id=${themeId}`);
  }
}

export default new ImageService();
