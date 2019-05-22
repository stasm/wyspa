import {render} from "./wyspa.js";
import logger from "./logger.js";
import App from "./App.js";

let init = {
    things: [
        "Hello, world!",
    ],
    value: "",
}

function reducer(state = init, action, args) {
    switch (action) {
        case "CHANGE_VALUE": {
            let [value] = args;
            return {
                ...state,
                value,
            }
        }
        case "ADD_THING": {
            return {
                ...state,
                things: state.things.concat(state.value),
                value: ""
            }
        }
        default:
            return state;
    }
}

window.dispatch = render(App(), logger(reducer));
