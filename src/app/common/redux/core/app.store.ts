import { InjectionToken } from '@angular/core';
import {
  createStore,
  Store,
  StoreEnhancer,
 } from 'redux';

import {
  counterReducer as reducer
} from './counter.reducer';
import { AppState } from './app.state';

export const AppStore = new InjectionToken('App.store');

const devtools: StoreEnhancer<AppState> =
  window['devToolsExtension'] ?
  window['devToolsExtension']() : f => f;

export function createAppStore(): Store<AppState> {
  alert("AppStore의createAppStore함수 작동");
  return createStore<AppState,null,null,null>(
    reducer
  );
}

export const appStoreProviders = [
   { provide: AppStore, useFactory: createAppStore }
];
