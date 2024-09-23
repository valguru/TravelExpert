import { apiClient } from './host';

class ValueService {
  #prefix = 'values/';

  async getAll() {
    return apiClient.get(this.#prefix);
  }

  async getById(id) {
    return apiClient.get(`${this.#prefix}${id}`);
  }

  async getByImageAndUser(image_id, user_id) {
    return apiClient.get(`${this.#prefix}?image_id=${image_id}&user_id=${user_id}`);
  }

  async getByImage(image_id) {
    return apiClient.get(`${this.#prefix}?image_id=${image_id}`);
  }

  async getByUser(user_id) {
    return apiClient.get(`${this.#prefix}?user_id=${user_id}`);
  }

  async create(userId, imageId, value) {
    const data = {
      user_id: userId,
      image_id: imageId,
      value: value,
    };
    return apiClient.post(`${this.#prefix}`, { value: data });
  }

  async update(valueId, userId, imageId, value) {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
    const data = {
      user_id: userId,
      image_id: imageId,
      value: value,
    };
    const res = await fetch(`values/${valueId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken,
      },
      body: JSON.stringify({ value: data }),
    });
    return res.json();
  }
}

export default new ValueService();
