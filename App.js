import key from "./wyspa.js";

function Thing({value, index}) {
    return () => key`
        <li id="thing-${index}">
            ${value}
        </li>
    `;
}

function CurrentValue(value) {
    return () => key`<li id="current-value">
        [Preview: ${value}]
    </li>`;
}

function List(things, current) {
    return () => key`<ul id="list">
        ${things.map((value, index) => Thing({value, index}))}
        ${CurrentValue(current)}
    </ul>`;
}

function CharCounter() {
    return state => key`<div id="counter">
        (length: ${state.value.length})
    </div>`;
}

function EntryForm() {
    return () => key`<div id="entry-form">
        <input type="text" placeholder="Type here"
            oninput='dispatch("CHANGE_VALUE", this.value);'>
        <button onclick='dispatch("ADD_THING")(() => {
            let input = this.previousElementSibling;
            input.value = "";
            input.focus();
        });'>Add</button>
        ${CharCounter()}
    </div>`;
}

export default
function App() {
    return state => key`<div id="root">
        <h1>Things</h1>
        ${List(state.things, state.value)}
        <hr>
        ${EntryForm()}
    </div>`;
}
