import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';

export const elevenLabs = new ElevenLabsClient({
  apiKey: Bun.env.ELEVENLABS_API_KEY,
});
