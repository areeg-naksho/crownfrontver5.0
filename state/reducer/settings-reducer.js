import * as SettingsStates from "./../type/settings-states";

const initialState = {
  data: [],
  error: "",
  currentState: "",
};
const settingsReducer = (state = initialState, action) => {
  //////////Git-Api//////////

  switch (action.type) {
    case SettingsStates.FETCH_SETTINGS_REQUEST:
      return {
        ...state,
        currentState: SettingsStates.FETCH_SETTINGS_REQUEST,
      };
    case SettingsStates.FETCH_SETTINGS_SUCCESS:
      return {
        ...state,
        currentState: SettingsStates.FETCH_SETTINGS_SUCCESS,
        error: "",
        data: action.payload,
      };
    case SettingsStates.FETCH_SETTINGS_ERROR:
      return {
        ...state,
        currentState: SettingsStates.FETCH_SETTINGS_ERROR,
        error: action.payload,
      };

    default:
      return state;
  }
};
export default settingsReducer;
