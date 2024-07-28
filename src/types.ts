export interface Update {
  type: 'js-update' | 'css-update';
  path: string;
  acceptedPath: string;
  timestamp: number;
}

export interface HotModule {
  id: string;
  callbacks: HotCallback[];
}

export interface HotCallback {
  deps: string[];
  fn: (modules: object[]) => void;
}
