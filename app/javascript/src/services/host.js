import axios from 'axios';

const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

export const apiClient = axios.create({
  baseURL: '',
  headers: {
    'X-CSRF-Token': csrfToken,
    'Content-Type': 'application/json',
  },
});
