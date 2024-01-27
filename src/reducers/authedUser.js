import { SetAuthedUser } from '../actions/authedUser';

export default function authedUser(state = null, action) {

  switch (action.type) {
    case SetAuthedUser: return action.id;
    default: return state;
  }
}