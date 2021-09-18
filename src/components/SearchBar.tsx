import React, {useState, useEffect, useContext} from 'react'
import {withRouter} from 'react-router-dom';

// import entities
import Plant from '../entities/plant';

// import context
import AppContext from '../contexts';

// type Props = {
//   search: (results:Plant[])=>void
// }

// eslint-disable-next-line
function SearchBar(props:any):JSX.Element {

  const { plants, setPlants } = useContext(AppContext);

  useEffect(() => {
    fetch('https://knyxsiqbhk.execute-api.us-east-2.amazonaws.com/Prod/plants')
    .then( response => response.json())
    .then( plnts => plnts.map( ( plant:Plant, index:number) => { plant._id = index+1; return plant}))
    .then( plnts => setPlants(plnts))
    .catch( error => console.log(error));
  }, [setPlants])

  const [searchFilter, setSearchFilter] = useState('');

  const handleChange = (e:React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setSearchFilter(target.value);
    // document.getElementById('searchField')?.reset();git 
  }

  const filterPlants = () => {
    const filtered = plants.filter( plant => plant.name.toLowerCase().includes(searchFilter.toLowerCase()) );
    props.search(filtered);
  }

  const handleEnter = (e:React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      filterPlants();
      if (props.closeDropdown) props.closeDropdown();
      props.history.push("/plants/search");
    }
  }

  return (
    <div>
      <input 
        id="searchField"
        type="text" 
        className="form-control" 
        placeholder="Search Plants" 
        aria-label="search" 
        onChange={handleChange}
        onKeyPress={handleEnter}
      />
    </div>
  )
}

export default withRouter(SearchBar);
