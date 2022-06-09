import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider, createStoreHook, createDispatchHook, createSelectorHook, ReactReduxContextValue } from 'react-redux';
import './styles/index.scss';
import './i18n';
import { eventStore } from './MapCore/Events/Event/eventStore';
import { appStore } from './app/store';

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const AppStoreContext = React.createContext(
  {} as ReactReduxContextValue
);
export const useAppStore = createStoreHook(AppStoreContext);
export const useAppDispatch = createDispatchHook(AppStoreContext);
export const useAppSelector = createSelectorHook(AppStoreContext);

const EventStoreContext = React.createContext(
  {} as ReactReduxContextValue
);
export const useEventStore = createStoreHook(EventStoreContext);
export const useEventDispatch = createDispatchHook(EventStoreContext);
export const useEventSelector = createSelectorHook(EventStoreContext);

root.render(
  <React.StrictMode>
    <Provider store={appStore} context={AppStoreContext} >
      <Provider store={eventStore} context={EventStoreContext}>
        <App />
      </Provider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
