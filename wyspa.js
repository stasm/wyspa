const t = document.createElement("template");

export default
function key(strings, ...values) {
    return strings.flatMap(str => [str].concat(values.shift()));
}

export
function render(component, reducer) {
    let state;
    let prev = [];

    function withState(part) {
        if (typeof part === "function") {
            return part(state).map(withState);
        }
        return part;
    }

    function paint(island) {
        t.innerHTML = island.flat(Infinity).join("");
        document.getElementById(t.content.children[0].id).replaceWith(t.content);
    }

    function* diff(prev, curr) {
        let queue = [];
        let length = Math.max(prev.length, curr.length);
        for (let i = 0; i < length; i++) {
            if (prev[i] instanceof Array && curr[i] instanceof Array) {
                queue.push([prev[i], curr[i]]);
            } else if (prev[i] !== curr[i]) {
                yield curr;
            }
        }
        for (let pair of queue) {
            yield * diff(...pair);
        }
    }

    function dispatch(action, ...args) {
        state = reducer(state, action, args);
        let tree = component(state).map(withState);
        for (let part of diff(prev, tree)) {
            paint(part);
        }
        prev = tree;
        return cleanUp => cleanUp(state);
    }

    dispatch();
    return dispatch;
}
