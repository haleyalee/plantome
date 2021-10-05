import React, { useContext, useState, useEffect} from 'react';
import { useParams, withRouter } from 'react-router-dom';

import AppContext from '../contexts';
import Plant from '../entities/plant';

import PlantForm from './PlantForm';
import NotFound from './NotFound';

// eslint-disable-next-line
function EditPlant(props:any):JSX.Element {

  // eslint-disable-next-line
  const {id} = useParams<any>();
  const {plants} = useContext(AppContext);
  const [plant, setPlant] = useState<Plant>();

  useEffect(() => {
    setPlant(plants.find(plnt=>plnt.id==id))
  }, [id, plants, setPlant])
  
  const editPlant = (plant:Plant) => {
    fetch('https://szhy1liq97.execute-api.us-east-2.amazonaws.com/Prod/plant', {
      method: 'POST',
      body: JSON.stringify(plant),
      headers: {
          'Content-Type': 'application/json'
      }
    })
    .then(() => console.log("Successfully edited plant"))
    .catch(error => console.log(`Failed to edit plant: ${error}`))

    props.history.push('/plants');
  };

  const deletePlant = () => {
    console.log(`${id}`)
    fetch(`https://szhy1liq97.execute-api.us-east-2.amazonaws.com/Prod/plant/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(() => console.log("Succesfully deleted plant"))
    .catch(error => console.log(`Failed to delete plant: ${error}`))

    props.history.push('/plants');
  };

  return (
    <div className="container">
      { (plant) 
        ?
        <div className="py-5">
          <PlantForm title="Edit" plant={plant} submitForm={editPlant} />
          <div className="d-flex flex-row-reverse mt-5">
            <button className="btn btn-outline-danger" onClick={deletePlant}>Delete Plant</button>
          </div>
        </div>
        :
        <NotFound />
      }
    </div>
  )
}

export default withRouter(EditPlant);
