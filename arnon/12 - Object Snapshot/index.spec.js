import { createStore, combineReducers } from "redux";

const usersReducer = (state = [], action) => {
  // Implement this reducer to pass the tests below
  switch (action.type) {
    case "SAVE_USER":
      const userIndex = state.findIndex(
        (user) => user.handle === action.user.handle
      );
      if (userIndex >= 0) {
        state.splice(userIndex, 1, action.user);
        return state;
      }
      return state.concat(action.user);
    default:
      return state;
  }
};

const configureStore = (initialState = {}) => {
  return createStore(
    combineReducers({
      users: usersReducer,
    }),
    initialState
  );
};

describe("usersReducer", () => {
  it("should initialize as empty array", () => {
    const store = configureStore({});
    expect(store.getState()).toEqual({
      users: [],
    });
  });

  describe("SAVE_USER action", () => {
    // arrange
    const store = configureStore({});
    const addUserAction = (user) => ({
      type: "SAVE_USER",
      user,
    });

    it("should append to state array", () => {
      // act
      store.dispatch(
        addUserAction({
          name: "Kyle Welch",
          handle: "kwelch",
        })
      );

      // assert
      expect(store.getState()).toMatchSnapshot();

      // act
      store.dispatch(
        addUserAction({
          name: "Jane Smith",
          handle: "jsmith",
        })
      );

      // assert
      expect(store.getState()).toMatchSnapshot();
    });

    it("should update when handle matches", () => {
      // act
      store.dispatch(
        addUserAction({
          name: "Kyle Welch",
          handle: "kwelch",
          role: "Test Driven Developer",
        })
      );

      // assert
      expect(store.getState()).toMatchSnapshot();
    });
  });
});
