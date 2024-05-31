import type { App, Component, Plugin } from 'vue';

export type SFCWithInstall<T> = T & Plugin;

export function withInstall<T extends Component>(component: T) {
  (component as SFCWithInstall<T>).install = (app:App) => {
    app.component(component.name!, component);
  }

  return component as SFCWithInstall<T>;
}

export function useGlobalComps<T extends Component>(
  app: App,
  components: Record<string, SFCWithInstall<T>>
) {
  Object.keys(components).forEach((key) => {
    app.use(components[key]);
  });
}
