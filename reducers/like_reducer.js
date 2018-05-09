import _ from 'lodash';
import {
    LIKE_JOB
} from '../actions/types';

const INITIAL_STATE

export default function(state, action) {
    switch(action.type) {
        case LIKE_JOB:
            return _.uniqBy([
                action.payload, ...state
            ], 'jobkey')
        default:
            return state;
    }
}