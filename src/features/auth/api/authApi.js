import axios from 'axios';

const client = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

export const authApi = {
  async register(credentials) {
    const { data } = await client.post('/auth/register', credentials);
    return data.user;
  },
  async login(credentials) {
    const { data } = await client.post('/auth/login', credentials);
    return data.user;
  },
  async logout() {
    await client.post('/auth/logout');
  },
  async getCurrentUser() {
    const { data } = await client.get('/auth/me');
    return data.user;
  },
};

export function getApiError(error) {
  return error.response?.data?.message || 'We could not complete your request. Please try again.';
}
