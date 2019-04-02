/**
 * Counter Reducer
 */
import { Reducer, Action } from 'redux';
import { AppState } from './app.state';
import {
  INCREMENT,
  DECREMENT
} from './counter.actions';


const initialState: AppState = { counter: 0 };

// Create our reducer that will handle changes to the state
export const counterReducer: Reducer<AppState> =
  (state: AppState = initialState, action: Action): AppState => {
  //  alert("counterReducer 작동");
    switch (action.type) {
    case INCREMENT:
      return Object.assign({}, state, { counter: state.counter + 1 });
    case DECREMENT:
      return Object.assign({}, state, { counter: state.counter - 1 });
    default:
      return state;
    }
  };
