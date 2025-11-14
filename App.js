


const parent = React.createElement(
    "div",
    { id: "parent" },
    React.createElement(
        "div",
        { id: "child" },
        [
            React.createElement("h1", {}, "I'm the karan baira"),
            React.createElement("h2", {}, "I'm the karan baira")
        ]
    ),
    React.createElement(
        "div",
        { id: "child" },
        [
            React.createElement("h1", {}, "I'm the karan baira"),
            React.createElement("h2", {}, "I'm the karan baira")
        ]
    )
);

console.log(parent);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(parent);
