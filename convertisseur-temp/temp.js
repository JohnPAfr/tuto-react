function Field({name, value = 0, onChange, children}) {
    return <div className="form-group">
        <label htmlFor={name}>{children}</label>
        <input 
            type="text"
            name={name}
            id={name}
            value={value}
            onChange={onChange} />
    </div>
}

class Temp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            celsius: 0,
            fahrenheit: 0,
            boil: false
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        const t = e.target.value;
        const name = e.target.name;
        let c = 0
        let f = 0

        console.log(t, name)

        if(name === "celsius") {
            c = t
            f = c * 9 / 5 + 32
        } else {
            f = t
            c = f * 5 / 9 - 32
        }

        this.setState({
            celsius: c,
            fahrenheit: f,
            boil: c >= 100
        })
    }

    render() {
        const {boil} = this.state
        return <div>
            <Field name="celsius" value={this.state.celsius} onChange={this.handleChange}>Celsius</Field>
            <Field name="fahrenheit" value={this.state.fahrenheit} onChange={this.handleChange}>Fahrenheit</Field>

            { (boil) ? <div>L'eau bout</div> : <div>L'eau ne bout pas</div>}
        </div>
    }
}

ReactDOM.render(<Temp/>, document.getElementById('app'))