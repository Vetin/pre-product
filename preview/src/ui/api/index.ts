export const api = async (url: string, body: unknown) => {
  const response = await fetch(`http://localhost:3000${url}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
};
