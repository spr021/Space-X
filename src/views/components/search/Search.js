import "./Search.scss"

function Search(props) {

  const search = (e) => {
    props.setSearch(e.target.value)
  }

  return (
    <div className="search">
      <label htmlFor="search">Search for Site Name</label>
      <input onChange={search} type="search" placeholder="Search..." />
    </div>
  )
}

export default Search;
