const http = require('http');

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({ status: res.statusCode, data: JSON.parse(data) });
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

describe('Pet API Contract Test', () => {
  it('should fetch a pet by ID', async () => {
    const stubUrl = process.env.STUB_URL || 'http://localhost:9000';
    try {
      const response = await makeRequest(`${stubUrl}/pets/1`);
      
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('id');
      expect(response.data).toHaveProperty('name');
      expect(response.data).toHaveProperty('type');
      expect(response.data).toHaveProperty('status');
    } catch (error) {
      console.error('Error details:', error);
      throw new Error(`API request failed: ${error.message}`);
    }
  }, 10000);
});