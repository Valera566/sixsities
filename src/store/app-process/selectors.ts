import { NameSpace, SortOption } from '../../const.ts';
import { City } from '../../types/offer.ts';
import { State } from '../../types/state.ts';

export const getCurrentCity = (state: State): City => state[NameSpace.App].city;

export const getSortType = (state: State): SortOption => state[NameSpace.App].sortType;
