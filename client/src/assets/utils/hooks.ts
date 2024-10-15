import { createDiscreteApi, type ConfigProviderProps } from 'naive-ui'

export function useDiscrete() {
	return createDiscreteApi(['message', 'dialog', 'loadingBar'], {})
}
