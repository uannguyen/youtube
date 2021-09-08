import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispash } from './store'

export const useAppDispatch = () => useDispatch<AppDispash>()
export const useAppSelector: TypedUseSelectorHook<RootState> =  useSelector