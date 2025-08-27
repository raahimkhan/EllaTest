import type { AudioMetaData } from '@blue-prints/audio-meta-data';

/**
    - type guard to check if a given JSON object conforms to the AudioMetaData interface
    - ensures the root object is non null and of type 'object'
    - checks 'pause' exists and is a number
    - checks 'speakers' exists and is an array
    - for each speaker:
        - 'name' must be a string
        - 'phrases' must be an array
    - refer to @blue-prints/audio-meta-data.ts for more details
*/
export const isAudioMetaData = (json: any): json is AudioMetaData => {
	return (
		typeof json === 'object' &&
		json !== null &&
		typeof json.pause === 'number' &&
		Array.isArray(json.speakers) &&
		json.speakers.every(
			(speaker: any) =>
				typeof speaker.name === 'string' &&
				Array.isArray(speaker.phrases)
		)
	);
};
