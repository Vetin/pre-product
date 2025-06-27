import axios from 'axios';

export const downloadValidatedFile = async (
  url: string,
  validation: { maxLength: number; contentTypes: string[] },
) => {
  const { maxLength } = validation;
  const response = await axios.get(url, {
    responseType: 'arraybuffer',
    maxContentLength: maxLength,
  });

  if (
    validation.contentTypes.length > 0 &&
    !validation.contentTypes.includes(response.headers['content-type'])
  ) {
    throw new Error('Invalid file type');
  }

  return response.data;
};
