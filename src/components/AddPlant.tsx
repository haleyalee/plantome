import React, {useContext} from 'react';
import {v4 as uuidv4} from 'uuid';
import {withRouter} from 'react-router-dom';

// import styles
import '../styles/Admin.css';

// import entities
import Plant from '../entities/plant';
import AppContext from '../contexts';

// import components
import PlantForm from './PlantForm';

// eslint-disable-next-line
function AddPlant(props:any):JSX.Element {

  const {plants, setPlants} = useContext(AppContext);

  const postPlant = (plant: Plant)  => {
    fetch('https://szhy1liq97.execute-api.us-east-2.amazonaws.com/Prod/plant', {
      method: 'POST',
      body: JSON.stringify(plant),
      headers: {
          'Content-Type': 'application/json'
      }
    })
    .then(() => console.log("Successfully posted plant"))
    .catch(error => console.log(`Failed to post plant: ${error}`))

    const newPlants = [...plants, plant];
    setPlants(newPlants);
    props.history.push('/plants');
  };

  return (
    <div className="container py-5">
      <PlantForm title={"Add New"} plant={{id:uuidv4()}} submitForm={postPlant} />
    </div>
  )
}

export default withRouter(AddPlant);
