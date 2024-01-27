import { applyMiddleware } from 'redux';
import log from './log';
import thunk from 'redux-thunk';

export default applyMiddleware(log, thunk);
