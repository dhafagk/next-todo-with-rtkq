import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import * as Configs from "../configs";

export const useAppDispatch: () => Configs.AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<Configs.RootState> =
  useSelector;
