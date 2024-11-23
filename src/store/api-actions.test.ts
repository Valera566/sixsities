import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api.ts';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { AppThunkDispatch,extractActionsTypes } from '../mocks/mocks.ts';
import { State } from '../types/state.ts';
import {
  checkAuthAction,
  getFavoritesOffersAction,
  getOfferByIdAction,
  getOffersActions,
  getOffersNearbyAction,
  getReviewsByIdAction,
  loginAction,
  logoutAction,
  postFavoriteAction,
  postReviewAction,
} from './api-actions.ts';
import { APIRoute } from '../const.ts';
import {redirectToRoute} from './action.ts';
import {AuthData} from '../types/auth-data.ts';
import * as tokenStorage from '../services/token.ts';


describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({});
  });

  describe('getOffersActions', () => {
    it('should dispatch "getOffersActions.pending" and "getOffersActions.fulfilled" with thunk getOffersActions succeeded', async () => {
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(200);

      await store.dispatch(getOffersActions() as any);
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getOffersActions.pending.type,
        getOffersActions.fulfilled.type,
      ]);
    });

    it('should dispatch "getOffersActions.pending" and "getOffersActions.rejected" with thunk getOffersActions rejected', async () => {
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(400);

      await store.dispatch(getOffersActions() as any);
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getOffersActions.pending.type,
        getOffersActions.rejected.type,
      ]);
    });
  });

  describe('getOfferByIdAction', () => {
    const hotelId = '1';

    it('should dispatch "getOfferByIdAction.pending" and "getOfferByIdAction.fulfilled" with thunk getOfferByIdAction succeeded', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${hotelId}`).reply(200);

      await store.dispatch(getOfferByIdAction(hotelId) as any);
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getOfferByIdAction.pending.type,
        getOfferByIdAction.fulfilled.type,
      ]);
    });

    it('should dispatch "getOfferByIdAction.pending" and "getOfferByIdAction.rejected" with thunk getOfferByIdAction rejected', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${hotelId}`).reply(400);

      await store.dispatch(getOfferByIdAction(hotelId) as any);
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getOfferByIdAction.pending.type,
        getOfferByIdAction.rejected.type,
      ]);
    });

  });

  describe('getOffersNearbyAction', () => {
    const hotelId = '1';

    it('should dispatch "getOffersNearbyAction.pending" and "getOffersNearbyAction.fulfilled" with thunk getOffersNearbyAction succeeded', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${hotelId}/nearby`).reply(200);

      await store.dispatch(getOffersNearbyAction(hotelId) as any);
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getOffersNearbyAction.pending.type,
        getOffersNearbyAction.fulfilled.type,
      ]);
    });

    it('should dispatch "getOffersNearbyAction.pending" and "getOffersNearbyAction.rejected" with thunk getOffersNearbyAction rejected', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${hotelId}/nearby`).reply(400);

      await store.dispatch(getOffersNearbyAction(hotelId) as any);
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getOffersNearbyAction.pending.type,
        getOffersNearbyAction.rejected.type,
      ]);
    });

  });

  describe('getReviewsByIdAction', () => {
    const hotelId = '1';

    it('should dispatch "getReviewsByIdAction.pending" and "getReviewsByIdAction.fulfilled" with thunk getReviewsByIdAction succeeded', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Reviews}/${hotelId}`).reply(200);

      await store.dispatch(getReviewsByIdAction(hotelId) as any);
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getReviewsByIdAction.pending.type,
        getReviewsByIdAction.fulfilled.type,
      ]);
    });

    it('should dispatch "getReviewsByIdAction.pending" and "getReviewsByIdAction.rejected" with thunk getReviewsByIdAction rejected', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Reviews}/${hotelId}`).reply(400);

      await store.dispatch(getReviewsByIdAction(hotelId) as any);
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getReviewsByIdAction.pending.type,
        getReviewsByIdAction.rejected.type,
      ]);
    });
  });

  describe('postReviewAction', () => {
    const hotelId = '1';

    const newReview = {
      comment: 'comment',
      rating: 3,
      hotelId: '1'
    };

    it('should dispatch "postReviewAction.pending" and "postReviewAction.fulfilled" with thunk postReviewAction succeeded', async () => {
      mockAxiosAdapter.onPost(`${APIRoute.Reviews}/${hotelId}`).reply(200, [
        { id: '1', comment: 'Test comment', rating: 5 },
      ]);

      await store.dispatch(postReviewAction(newReview) as any);
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        postReviewAction.pending.type,
        postReviewAction.fulfilled.type,
      ]);
    });

    it('should dispatch "postReviewAction.pending" and "postReviewAction.rejected" with thunk postReviewAction rejected', async () => {
      mockAxiosAdapter.onPost(`${APIRoute.Reviews}/${hotelId}`).reply(400, [
        { id: '1', comment: 'Test comment', rating: 5 },
      ]);

      await store.dispatch(postReviewAction(newReview) as any);
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        postReviewAction.pending.type,
        postReviewAction.rejected.type,
      ]);
    });
  });

  describe('getFavoritesOffersAction', () => {
    it('should dispatch "getFavoritesOffersAction.pending" and "getFavoritesOffersAction.fulfilled" with thunk "getFavoritesOffersAction"', async () => {
      mockAxiosAdapter.onGet(APIRoute.Favorites).reply(200);

      await store.dispatch(getFavoritesOffersAction() as any);
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getFavoritesOffersAction.pending.type,
        getFavoritesOffersAction.fulfilled.type,
      ]);
    });
  });

  it('should dispatch "getFavoritesOffersAction.pending" and "getFavoritesOffersAction.rejected" when server response 400', async() => {
    mockAxiosAdapter.onGet(APIRoute.Favorites).reply(400);

    await store.dispatch(getFavoritesOffersAction() as any);
    const actions = extractActionsTypes(store.getActions());

    expect(actions).toEqual([
      getFavoritesOffersAction.pending.type,
      getFavoritesOffersAction.rejected.type,
    ]);
  });

  describe('postFavoriteAction', () => {
    const id = 1;
    const status = 1;

    const newFavorite = {
      id: 1,
      status: 1,
    };

    it('should dispatch "postFavoriteAction.pending" and "postFavoriteAction.fulfilled" with thunk postFavoriteAction succeeded', async () => {
      mockAxiosAdapter.onPost(`${APIRoute.Favorites}/${id}/${status}`).reply(200, [
        { id: 1, status: 1 },
      ]);

      await store.dispatch(postFavoriteAction(newFavorite) as any);
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        postFavoriteAction.pending.type,
        postFavoriteAction.fulfilled.type,
      ]);
    });

    it('should dispatch "postFavoriteAction.pending" and "postFavoriteAction.rejected" with thunk postFavoriteAction rejected', async () => {
      mockAxiosAdapter.onPost(`${APIRoute.Favorites}/${id}/${status}`).reply(400, [
        { error: 'Bad Request' },
      ]);

      await store.dispatch(postFavoriteAction(newFavorite) as any);
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        postFavoriteAction.pending.type,
        postFavoriteAction.rejected.type,
      ]);
    });
  });

  describe('loginAction', () => {
    it('should dispatch "loginAction.pending", "redirectToRoute", "loginAction.fulfilled" when server response 200', async() => {
      const fakeUser = { login: 'test@test.ru', password: '123456' };
      const fakeServerReplay = { token: 'secret', avatarUrl: 'https://example.com/avatar.png' };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReplay);

      await store.dispatch(loginAction(fakeUser) as any);
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        redirectToRoute.type,
        loginAction.fulfilled.type,
      ]);
    });

    it('should call "saveToken" once with the received token', async () => {
      const fakeUser: AuthData = { login: 'test@test.ru', password: '123456' };
      const fakeServerReplay = { token: 'secret' , avatarUrl: 'https://example.com/avatar.png'};
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReplay);
      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(loginAction(fakeUser) as any);

      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith(fakeServerReplay.token);
    });
  });

  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending", "logoutAction.fulfilled" when server response 204', async() => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);

      await store.dispatch(logoutAction() as any);
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.fulfilled.type,
      ]);
    });

    it('should one call "dropToken" with "logoutAction"', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);
      const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');

      await store.dispatch(logoutAction() as any);

      expect(mockDropToken).toBeCalledTimes(1);
    });
  });


  describe('checkAuthAction', () => {
    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.fulfilled" with thunk "checkAuthAction', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200, {
        email: 'example@example.com',
        avatarUrl: 'https://example.com/avatar.png',
      });

      await store.dispatch(checkAuthAction() as any);
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type,
      ]);
    });
  });

  it('should dispatch "checkAuthAction.pending" and "checkAuthAction.rejected" when server response 400', async() => {
    mockAxiosAdapter.onGet(APIRoute.Login).reply(400);

    await store.dispatch(checkAuthAction() as any);
    const actions = extractActionsTypes(store.getActions());

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.rejected.type,
    ]);
  });


});
