import { useGlobalStore } from '@global-store/global-store';

// this function will be used to toggle music player on/off and handle related logic
export const togglePlayPause = () => {
	const isPlaying = useGlobalStore.getState().isPlaying;
	const updateGlobalState = useGlobalStore.getState().updateGlobalState;
	updateGlobalState({ isPlaying: !isPlaying });
};
