import createReducer from '../lib/createReducer';

import Immutable from 'immutable';

import * as types from '../constants/';


const initialState = Immutable.fromJS({
    setup: {
        default_locale:'EN',
        locales:[]
    },
    graphs:[],
    chartData:[]
});

export default createReducer(initialState, {
    [types.SETUP](state, { setupData }) {

        const datagraphs = Immutable.fromJS(setupData.graphs);
        const datachartData = Immutable.fromJS(setupData.chartData);

        state = state.setIn(['setup', 'default_locale'], setupData.default_locale);
        state = state.setIn(['setup', 'locales'], setupData.locales);
        state = state.set('graphs', datagraphs);
        state = state.set('chartData', datachartData);

        return state;
    },
    [types.SETMENU](state, { menu, edit }) {



        if(edit){
            const data = Immutable.fromJS(JSON.parse(menu.items));
            const slug = menu.slug;
            state = state.setIn(['menu', 'items'], data);
            state = state.setIn(['menu', 'slug'], slug);
            return state;
        } else {
            const data = Immutable.fromJS(menu);
            state = state.setIn(['menu', 'items'], data);
            return state;
        }

    },




});

