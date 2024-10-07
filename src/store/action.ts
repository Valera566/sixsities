import { createAction } from '@reduxjs/toolkit';
import { City } from '../types/offer.ts';

export const changeCity = createAction<{city:City}>('location/changeCity');
