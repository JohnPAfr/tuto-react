function WelcomeFunc ({name, children}) {
    return <div>
        <h1>Bonjour {name}</h1>
        <p>{children}</p>
    </div>
}

class Welcome extends React.Component {

    /* constructor(props) {
        super(props)
    } */

    render() {
        return <div>
            <h1>Bonjour {this.props.name}</h1>
            <p>{this.props.children}</p>
        </div>
    }
}

class Clock extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            date: new Date()
        }
        this.timer = null
    }

    componentDidMount() {
        this.timer = window.setInterval(this.tick.bind(this), 1000)
    }
    componentwillUnmount() {
        window.clearInterval(this.timer)
    }

    tick() {
        this.setState({
            date: new Date()
        })
    }

    render() {
        return <div>
            Il est {this.state.date.toLocaleDateString()} {this.state.date.toLocaleTimeString()}
        </div>
    }
}

class Incrementer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            count: props.start,
            timer: null
        }
        this.toggle = this.toggle.bind(this)
        this.reset = this.reset.bind(this)
    }
    componentDidMount() {
        this.play()
    }
    componentwillUnmount() {
        window.clearInterval(this.state.timer)
    }

    increment() {
        this.setState((state, props) => ({count: state.count + props.step}))
    }

    play() {
        window.clearInterval(this.state.timer)
        this.setState({
            timer: window.setInterval(this.increment.bind(this), 1000)
        })
        
    }

    pause() {
        window.clearInterval(this.state.timer)
        this.setState({
            timer: null
        })
    }

    toggle() {
        return this.state.timer ? this.pause() : this.play()
    }

    label() {
        return this.state.timer ? 'Pause' : 'Play'
    }

    reset() {
        this.pause()
        this.play()
        this.setState((state, props) => ({count: props.start}))
    }

    render() {
        return <h2>
            Value: {this.state.count}  <br></br>
            <button onClick={this.toggle}>{this.label()}</button>
            <button onClick={this.reset}>Reset</button>
        </h2>
    }
}

Incrementer.defaultProps = {
    start: 0,
    step: 1
}

class ManualIncrementer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            n: 0
        }
    }

    increment(e) {
        e.preventDefault()
        this.setState((state, props) => ({n: state.n + 1}))
    }

    render() {
        return <div>
            Valeur: {this.state.n} <button onClick={this.increment.bind(this)}>Incrémenter</button>
        </div>
    }
}

class Field extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const {name, value, onChange, children} = this.props
        return <div className="form-group">
            <label htmlFor={name}>{children}</label>
            <input type="text" value={value} onChange={onChange} id={name} name={name} className="form-control"/>
        </div>
    }
}

function Checkbox ({name, value, onChange, children}) {
    return <div className="form-check">
        <input type="checkbox" checked={value} onChange={onChange} id={name} name={name} className="form-check-input"/>
        <label htmlFor={name} class="form-check-label">{children}</label>
    </div>
}


class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nom: '',
            prenom: '',
            newsletter: false
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        const name = e.target.name
        const type = e.target.type
        const value = type === 'checkbox' ? e.target.checked : e.target.value
        this.setState({
            [name]: value
        })
    }

    render() {
        return <div class="container">
            <Field name="nom" value={this.state.nom} onChange={this.handleChange}>Nom</Field>
            <Field name="prenom" value={this.state.prenom} onChange={this.handleChange}>Prénom</Field>
            <Checkbox name="newsletter" value={this.state.newsletter} onchange={this.handleChange}>S'abonner à la newsletter</Checkbox>
            {JSON.stringify(this.state)}
        </div>
    }
}

const scaleNames = {
    c: "Celsius",
    f: "Fahrenheit"
}

function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9
}

function toFahrenheit(celsius) {
    return celsius * 9 / 5 + 32
}

function tryConvert(temperature, convert) {
    const value = parseFloat(temperature)
    if(Number.isNaN(value))
        return ''

    return Math.round(convert(value) * 100 / 100).toString()
}

class BoilingVerdict extends React.Component {
    render() {
        if (this.props.celsius < 100)
            return <div className="alert alert-info">L'eau ne bout pas</div>
        return <div className="alert alert-success">L'eau bout</div>
    }
}

class TemperatureInput extends React.Component {
    constructor(props){
        super(props)

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.props.onTemperatureChange(e.target.value)
    }

    render() {
        const {temperature} = this.props
        const name = "scale" + this.props.scale
        const scaleName = scaleNames[this.props.scale]
        return <div className="form-group">
            <label htmlFor={name}>Température en {scaleName}</label>
            <input type="text" id={name}  className="form-control" value={temperature} onChange={this.handleChange}></input>
        </div>
    }
}

class Calculator extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            temperature: 20,
            scale: 'c'
        }

        this.handleCelsiusChange = this.handleCelsiusChange.bind(this)
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this)

    }

    handleCelsiusChange(temperature) {
        this.setState({
            temperature: temperature,
            scale: 'c'
        })
    }
    handleFahrenheitChange(temperature) {
        this.setState({
            temperature: temperature,
            scale: 'f'
        })
    }

    render() {
        const {temperature, scale} = this.state
        const celsius = scale === 'c' ? temperature : tryConvert(temperature, toCelsius)
        const fahrenheit = scale === 'f' ? temperature : tryConvert(temperature, toFahrenheit)
        return <div>
            <TemperatureInput scale="c" temperature={celsius} onTemperatureChange={this.handleCelsiusChange}/>
            <TemperatureInput scale="f" temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange}/>

            <BoilingVerdict celsius={celsius} />
        </div>
    }
}

class App extends React.Component {
    render() {
        return <div className="container mt-5">
            <Calculator />
        </div>
    }
}

ReactDOM.render(<App />, document.querySelector('#app'))