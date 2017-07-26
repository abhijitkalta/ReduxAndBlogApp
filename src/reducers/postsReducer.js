import {FETCH_POSTS, FETCH_POST, DELETE_POST} from '../actions/index';

const INITIAL_STATE = { all: [], post: null};

export default function(state = INITIAL_STATE, action){
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state, all: action.payload.data
      }
      break;
      case FETCH_POST:
        return {
          ...state, post: action.payload.data
        }
        break;
      case DELETE_POST:
        return state;
        break;
    default:
      return state;
  }
};
