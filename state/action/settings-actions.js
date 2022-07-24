import * as SettingsStates from "./../type/settings-states";
import { getSettings } from "../../api-services/settings-services";
export const fetchSettingsRequest = () => {
  return {
    type: SettingsStates.FETCH_SETTINGS_REQUEST,
  };
};
export const fetchSettingsSuccess = (data) => {
  return {
    type: SettingsStates.FETCH_SETTINGS_SUCCESS,
    payload: data,
  };
};
export const fetchSettingsError = (error) => {
  return {
    type: SettingsStates.FETCH_SETTINGS_ERROR,
    payload: error,
  };
};

//////////////////
export const getSettingsApi = () => {
  return (dispatch) => {
    dispatch(fetchSettingsRequest());
    try {
      getSettings().then((res) => {
        dispatch(fetchSettingsSuccess(res.data.data));
      });
    } catch (error) {
      dispatch(fetchSettingsError(error));
    }
  };
};
