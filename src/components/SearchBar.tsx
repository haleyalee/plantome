import React, {useState, useEffect, useContext} from 'react'

// import entities
import Plant from '../entities/plant';
// import search from '../images/icons/search.svg';

// import context
import AppContext from '../contexts';

type Props = {
  search: (results:Plant[])=>void
}

function SearchBar(props:Props):JSX.Element {

  const { plants, setPlants } = useContext(AppContext);

  useEffect(() => {
    fetch('https://ui3lck4yg1.execute-api.us-east-2.amazonaws.com/Prod/plants')
    .then( response => response.json())
    .then( plnts => plnts.map( ( plant:Plant, index:number) => { plant._id = index+1; return plant}))
    .then( plnts => setPlants(plnts))
    .catch( error => console.log(error));
  }, [setPlants])

  const [searchFilter, setSearchFilter] = useState('');

  const handleChange = (e:React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setSearchFilter(target.value);
  }

  const filterPlants = () => {
    const filtered = plants.filter( plant => plant.name.toLowerCase().includes(searchFilter.toLowerCase()) );
    props.search(filtered);
  }

  const handleSubmit = (e:React.SyntheticEvent) => {
    e.preventDefault();
    filterPlants();
    setSearchFilter('');
  }

  const handleEnter = (e:React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          {/* <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              <img src={search} alt="Search" width="24px" height="24px"/>
            </span>
          </div> */}
          <input 
            id="searchField"
            type="text" 
            className="form-control" 
            placeholder="Search" 
            aria-label="search" 
            value={searchFilter}
            onChange={handleChange}
            onKeyPress={handleEnter}
            />
            <div className="input-group-append">
              <input type="submit" className="btn btn-secondary" value="Submit" />
            </div>
        </div>
      </form>
    </div>
  )
}

export default SearchBar;
