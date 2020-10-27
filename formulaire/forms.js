function Field ({ value, onChange, name, children }) {
        return <div className='form-group'>
            <label htmlFor={name}>{children}</label>
            <input 
                type='text' 
                value={value} 
                onChange={onChange} 
                id={name} 
                name={name} 
                className="form-control"/>
        </div>
}

function Checkbox ({ value, onChange, name, children }) {
    return <div className='form-check'>
        <input 
            type='checkbox' 
            checked={value} 
            onChange={onChange} 
            id={name} 
            name={name} 
            className="form-check-input"/>
        <label htmlFor={name} className='form-check-label'>{children}</label>
    </div>
}


class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            nom: '',
            prenom: '',
            check: false
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        /* this.setState({
            nom: "opt1"
        }) */

        // CAS MULTIPLE
        /* this.setState({
            nom: [...e.target.selectedOptions].map(o => o.value)
        }) */
        let name = e.target.name
        let type = e.target.type
        let value = type === 'checkbox' ? e.target.checked : e.target.value
        this.setState({
            [name]: value
        })
    }

    render() {
        return <div>
            <div>
                {JSON.stringify(this.state)}
            </div>

            <Field name="nom" value={this.state.nom} onChange={this.handleChange}>Nom</Field>
            <Field name="prenom" value={this.state.prenom} onChange={this.handleChange}>Prénom</Field>
            <Checkbox name="check" checked={this.state.check} onChange={this.handleChange}>Newsletter</Checkbox>
            {/* <div>
                <label htmlFor="nom">Nom</label>
                <input 
                    type="text" id="nom" 
                    name="nom" 
                    value={this.state.nom} 
                    onChange={this.handleChange}
                />
            </div>
            <div>
                <label htmlFor="prenom">Prénom</label>
                <input 
                    type="text" id="prenom" 
                    name="prenom" 
                    value={this.state.prenom} 
                    onChange={this.handleChange}
                />
            </div>
            <div>
                <label htmlFor="check">S'abonner à la newsletter</label>
                <input 
                    type="checkbox" id="check" checked={this.state.checked}
                    name="check" 
                    onChange={this.handleChange}
                />
            </div> */}




            {/* <input 
                type="checkbox" 
                checked={this.state.checked}
                onChange={this.handleChange}
            /> */}
            {/* <input 
                type="text" id="nom" 
                name="nom" 
                value={this.state.nom} 
                onChange={this.handleChange}
            />
            <textarea 
                type="text" id="nom" 
                name="nom" 
                value={this.state.nom} 
                onChange={this.handleChange}></textarea> */}

            {/* <select value={this.state.nom} onChange={this.handleChange} multiple>
                <option value='opt1'>Option 1</option>
                <option value='opt2'>Option 2</option>
                <option value='opt3'>Option 3</option>
            </select> */}
        </div>
    }
}

ReactDOM.render(<Home/>, document.getElementById('app'));