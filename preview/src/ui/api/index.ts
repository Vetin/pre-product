const BASE_URL = 'http://localhost:3000';

export const api = async (url: string, body: unknown) => {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
};
