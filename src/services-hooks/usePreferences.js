import { useCallback, useReducer, useMemo } from "react";


const preferencesReducer = (state, action) => {
  switch (action.type) {
    case "update":
      return {
        ...state,
        [action.name]: action.value,
      };
    case "add_new":
      return state[action.name] = action.value
    case "reset":
      return initialState;
    default:
      return state;
  }
};

const usePreferences = (initialState = null) => {
  const [preferences, dispatch] = useReducer(
    preferencesReducer,
    initialState
  );

  const reset = useCallback(() => {
    dispatch({ type: "reset" });
  }, []);

  const update = useCallback((name, value) => {
    dispatch({ type: "update", name, value });
  }, []);

  const addNew = useCallback((name, value) => {
    dispatch({ type: "add_new", name, value });
  }, []);

  return useMemo(
    () => ({
      preferences,
      reset,
      update,
      addNew,
    }),
    [preferences, reset, update, addNew]
  );
};

export default usePreferences;
