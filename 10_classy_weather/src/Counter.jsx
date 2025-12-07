import React from "react";

// example of class component
class Counter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {count: 5};
        this.hanndleDecrement = this.handleDecrement.bind(this);
        this.hanldeIncrement = this.hanldeIncrement.bind(this);
    }

    handleDecrement = () => {
        console.log(this);
        this.setState((curState) => {
            return {count: curState.count - 1}
        });
    }

    hanldeIncrement = () => {
        this.setState({count: this.state.count + 1});
    }

    render() {
        const date = new Date();
        date.setDate(date.getDate() + this.state.count);

        return <div>
            <button onClick={this.handleDecrement}>-</button>
            <span>{date.toDateString()} [{this.state.count}]</span>
            <button onClick={this.hanldeIncrement}>+</button>
        </div>
    }
}

export default Counter;