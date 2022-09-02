import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import type { EventStoreDispatch, EventStoreState } from './eventStore';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useEventStoreDispatch = () => useDispatch<EventStoreDispatch>();
export const useEventStoreSelector: TypedUseSelectorHook<EventStoreState> = useSelector;
