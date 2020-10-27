class Incrementer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            step: (props.step) ? props.step : 1,
            count: (props.count) ? props.count : 0
        } 
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e) {
        e.preventDefault()
        this.setState((state, props) => {
            return {count: state.count + state.step}
        })
    }

    render() {
        return <div>
            { JSON.stringify(this.state) }
            <h1>Count: {this.state.count}</h1>
            <button onClick={this.handleClick}>+</button>
        </div>
    }
}

ReactDOM.render(<Incrementer step={3} count={10} />, document.getElementById('app'))