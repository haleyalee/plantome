import React, { useState } from 'react';
import '../styles/Admin.css';
import Plant from '../entities/plant';
import PlantForm from './PlantForm';

function AddPlant():JSX.Element {

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState<string[]>([]);
  const [image, setImage] = useState('');

  const postPlant = (plant: Plant)  => {
    fetch('https://szhy1liq97.execute-api.us-east-2.amazonaws.com/Prod/plant', {
      method: 'POST',
      body: JSON.stringify(plant),
      headers: {
          'Content-Type': 'application/json'
      }
    }).catch(error => console.log(`Failed to post plant: ${error}`))
  };

  return (
    <div className="container py-5">
      <div className="d-flex flex-column flex-lg-row">
        <div id="add-plant" >
          <PlantForm
            title="Add New"
            name={name}
            setName={setName}
            price={price}
            setPrice={setPrice}
            category={category}
            setCategory={setCategory}
            image={image}
            setImage={setImage}
            plant={{}}
            submitForm={postPlant}
          />
        </div>
        <div id="plant-preview">
          <h4 className="pb-3">Plant Item Preview</h4>
          <div className="card d-flex text-center py-5">
            <div className="mx-auto" style={{ maxWidth: "80%"}}>
              <img className="card-img-top" src={image} alt={name}  width="200px" height="250px"/>
              <div className="card-body">
                <p className="card-title">{name}</p>
                <p className="card-text">${price.toFixed(2)}</p>
              </div>
              <button className="btn btn-outline-secondary">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddPlant
