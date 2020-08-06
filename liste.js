const PRODUCTS = [
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
  ];

  function ProductRow({product}) {
        const name = product.stocked ? product.name : <span className="text-danger">{product.name}</span>
        return <tr>
            <td>{name}</td>
            <td>{product.price}</td>
        </tr>
  }

  function ProductCategoryRow({category}) {
      return <tr>
          <th colSpan='2'>{category}</th>
      </tr>
  }
  function ProductTable({products, inStockOnly, filterText}) {
      const rows = []
      let lastCategory = null
      products.forEach(product => {
          if(inStockOnly && !product.stocked || product.name.indexOf(filterText) === -1)
            return
        if(product.category !== lastCategory) {
            lastCategory = product.category
            rows.push(<ProductCategoryRow category={lastCategory} key={product.category}/>)
        }
        rows.push(<ProductRow product={product} key={product.name}/>)
      })
    return <table className="table mt-5">
        <thead> 
            <tr>
                <th>Nom</th>
                <th>Prix</th>
            </tr>
        </thead>
        <tbody>
            {rows}
        </tbody>
    </table>
  }

  class SearchBar extends React.Component {

    constructor(props) {
        super(props)

        this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
        this.handleInStockOnlyChange = this.handleInStockOnlyChange.bind(this)
    }

    handleFilterTextChange(e) {
        this.props.onFilterTextChange(e.target.value)
    }

    handleInStockOnlyChange(e) {
        this.props.onInStockOnlyChange(e.target.checked)
    }

    render() {
        const {filterText, inStockOnly} = this.props
        return <div>
            <div className="form-group">
                <input type="text" value={filterText} onChange={this.handleFilterTextChange} className="form-control" placeholder="Rechercher"/>
            </div>
            <div className="form-check">
                <input type="checkbox" checked={inStockOnly} onChange={this.handleInStockOnlyChange} className="form-check-input" name="stock" id="stock"/>
                <label htmlFor="stock" className="form-check-label">Seulement en stock</label>
            </div>
        </div>
    }
  }

  class FilterableProductTable extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            filterText: '',
            inStockOnly: false
        }

        this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
        this.handleInStockOnlyChange = this.handleInStockOnlyChange.bind(this)

    }

    handleFilterTextChange(filterText) {
        this.setState({filterText})
    }
    handleInStockOnlyChange(inStockOnly) {
        this.setState({inStockOnly})

    }

    render() {
        const {products} = this.props
        return <React.Fragment>
            <SearchBar 
            filterText={this.state.filterText} 
            inStockOnly={this.state.inStockOnly}
            onFilterTextChange={this.handleFilterTextChange}
            onInStockOnlyChange={this.handleInStockOnlyChange}

            />
            <ProductTable 
            products={products}
            filterText={this.state.filterText} 
            inStockOnly={this.state.inStockOnly}
            />
        </React.Fragment>
    }
  }

 

  ReactDOM.render(<FilterableProductTable products={PRODUCTS}/>, document.getElementById('app'))