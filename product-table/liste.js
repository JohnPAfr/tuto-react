const PRODUCTS = [
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

function FilterTable({searchValue, checked, handleSearch, handleCheck}) {
    return <div className="col-md-6">
        <input type="text" 
        className="form-control mb-3" 
        placeholder="Search.." 
        value={searchValue} 
        onChange={handleSearch}/>
        <div className="form-group">
            <input type="checkbox" 
            checked={checked} 
            onChange={handleCheck}
            name="stock" id="stock" className="mr-3"/>
            <label htmlFor="check">In stock only</label>
        </div>
    </div>;
}

function ProductCategoryRow({category, products}) {
    return <React.Fragment>
        <tr>
            <th>
                {category}
            </th>
        </tr>
        {products}
    </React.Fragment>;
}

function ProductRow({name, price, stocked}) {
    let className = (stocked) ? '' : 'text-danger';
    return <tr>
        <td className={className}>{name}</td>
        <td>{price}</td>
    </tr>;
}

function ProductTable({products, check}) {
    let categories = [];
    let list = products.map(p => {
        if (!categories.includes(p.category)) categories.push(p.category);
        return <ProductRow category={p.category} name={p.name} key={p.name} price={p.price} stocked={p.stocked} />;
    });
    list = (check) ? list.filter(item => item.props.stocked) : list
    return <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Price</th>
            </tr>
        </thead>
        <tbody>
        {
            categories.map(c => <ProductCategoryRow category={c} key={c} 
                products={list.filter(item => {
                    return item.props.category === c
                })} />)
        }
        </tbody>
    </table>;
}

class FilterableProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            check: false,
        };

        this.handleCheck = this.handleCheck.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleCheck(e) {
        this.setState({
            check: e.target.checked
        });
    }
    handleSearch(e) {
        this.setState({
            search: e.target.value
        });
    }
    render() {
        return <React.Fragment>
            <div>
                {JSON.stringify(this.state)}
            </div>
            <FilterTable
            searchValue={this.state.search}
            handleCheck={this.handleCheck} 
            handleSearch={this.handleSearch}/>
            <ProductTable products={PRODUCTS} check={this.state.check}/>
        </React.Fragment>;
    }
}

ReactDOM.render(<FilterableProductTable products={PRODUCTS}/>, document.getElementById('app'));