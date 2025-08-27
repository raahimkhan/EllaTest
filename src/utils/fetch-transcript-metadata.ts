import { isAudioMetaData } from '@utils/isAudioMetaData';

/*
    - this function is used to fetch transcript meta data
    - once fetched, it also verifies that it is in required format or not
*/
export const fetchTranscriptMetaData = async (url: string) => {
	try {
		const response = await fetch(url);
		const json = await response.json();
		if (isAudioMetaData(json)) {
			return json;
		} else {
			throw Object.assign(
				new Error(
					'Fetched transcript meta data is not in valid format!'
				),
				{
					statusCode: 400,
				}
			);
		}
	} catch (error) {
		throw error;
	}
};
