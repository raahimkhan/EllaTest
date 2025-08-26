import type { GlobalState } from '@blue-prints/global-state';

export interface GlobalStateActions {
	updateGlobalState: (globalState: Partial<GlobalState>) => void;
	resetGlobalState: () => void;
}
