import {postResuest, getResuest} from './ajaxRequest'

export function saveNew(menu) {

    return postResuest(`save`, {menu: menu});
}

export function udateMenu(menu, id) {

    return postResuest(`update`, {menu: menu, id:id});
}
