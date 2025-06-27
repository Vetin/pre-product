export async function callElevenLabsAPI(
    file: File | undefined,
    cloudStorageUrl: string | undefined,
    format: string
  ): Promise<any> {
    const formData = new FormData();
    formData.append('model_id', 'scribe_v1');
  
    if (file) {
      formData.append('file', file);
    }
    if (cloudStorageUrl) {
      formData.append('cloud_storage_url', cloudStorageUrl);
    }
  
    formData.append('additional_formats', JSON.stringify([{ format }]));
    formData.append('timestamps_granularity', 'word');
    formData.append('diarize', 'true');
  
    const response = await fetch('https://api.elevenlabs.io/v1/speech-to-text', {
      method: 'POST',
      headers: {
        'Xi-Api-Key': import.meta.env.ELEVENLABS_API_KEY!,
        'Api-Key': 'xi-api-key',
      },
      body: formData,
    });
  
    if (!response.ok) {
      throw new Error(`ElevenLabs API error: ${response.status}`);
    }
  
    return await response.json();
  }