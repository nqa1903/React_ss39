import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';

// Hook dispatch có type
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
// Hook selector có type
export const useAppSelector = useSelector.withTypes<RootState>();
