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
    setPlant(plants.find(plnt=>plnt.id==parseInt(id)))
  }, [id, plants, setPlant])
  
  console.log(id);
  console.log(plant);

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
  }
  return (
    <div className="container">
      { (plant) 
        ?
        <div className="py-5">
          <PlantForm title="Edit" plant={plant} submitForm={editPlant} />
        </div>
        :
        <NotFound />
      }
    </div>
  )
}

export default withRouter(EditPlant);
