import { BLOG_FETCHED, SINGLE_BLOG_FETCHED } from "../actions/type";

const initialState = {blog : [], single_blog :[]};


export default function(state = initialState, action){
    const {type, payload} = action;

    switch (type) {
        case BLOG_FETCHED:
        return{
            ...state,
            single_blog : [],
            blog : payload
        }
        case SINGLE_BLOG_FETCHED:
        return{
            ...state,
            single_blog : payload
        }
        default:
            return state;
    }
}