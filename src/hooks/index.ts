import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { AppDispatch, State } from '../types/state.ts';
import { useDispatch } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
