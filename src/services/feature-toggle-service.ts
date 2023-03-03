export type AppFeatureToggle = {
  CH1025: boolean
}

export type IFeatureToggleService = {
  setFeatureToggle: (appFeatureToggle: AppFeatureToggle) => Promise<void>
}

export const FeatureToggleService = (): IFeatureToggleService => ({
  setFeatureToggle: async (appFeatureToggle: AppFeatureToggle) => {}
})