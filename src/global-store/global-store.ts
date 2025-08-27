import { create } from 'zustand';
import type { GlobalState } from '@blue-prints/global-state';
import type { GlobalStateActions } from '@blue-prints/global-state-actions';

const initialState: GlobalState = {
	isPlaying: false,
	currentAudioTime: -1,
};

export const useGlobalStore = create<GlobalState & GlobalStateActions>(
	(set) => ({
		...initialState,
		updateGlobalState: (globalState: Partial<GlobalState>) =>
			set((state: GlobalState) => {
				return {
					...state,
					...globalState,
				} as GlobalState;
			}),
		resetGlobalState: () =>
			set(() => {
				return {
					isPlaying: false,
					currentAudioTime: 0,
				} as GlobalState;
			}),
	})
);
