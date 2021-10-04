import React from 'react';
import {v4 as uuidv4} from 'uuid';

// import styles
import '../styles/Admin.css';

// import entities
import Plant from '../entities/plant';

// import components
import PlantForm from './PlantForm';

function AddPlant():JSX.Element {

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
  };

  return (
    <div className="container py-5">
      <PlantForm title={"Add New"} plant={{id:uuidv4()}} submitForm={postPlant} />
    </div>
  )
}

export default AddPlant
