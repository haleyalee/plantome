import React from 'react';
import '../styles/Admin.css';
import Plant from '../entities/plant';

type Props = {
  title: string,
  name: string,
  setName: (name:string) => void,
  price: number,
  setPrice: (price:number) => void,
  category: string[],
  setCategory: (cats:string[]) => void,
  image: string,
  setImage: (image:string) => void,
  plant: any,
  submitForm: (plant:Plant) => void;
}

function PlantForm(props:Props):JSX.Element {

  // eslint-disable-next-line
  const handleCheckboxChange = (e:any) => {
    let newArray = [...props.category, e.target.id];
    if (props.category.includes(e.target.id)) {
      newArray = newArray.filter(cat => cat !== e.target.id);
    } 
    props.setCategory(newArray);
  };

  const handleSubmit = (e:React.SyntheticEvent) => {
    e.preventDefault();

    const plant = new Plant(
      props.plant.id,
      props.name,
      props.price,
      props.category,
      0,
      props.image
    )

    props.submitForm(plant);
    console.log("Posting new plant");
  }

  return (
    <div>
      <h2 className="pb-3">{props.title} Plant</h2>
      <form id="add-plant-form" onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Plant Name</label>
          <input 
            id="name" 
            type="text" 
            className="form-control" 
            placeholder="Name" 
            value={props.name} 
            onChange={(e)=>props.setName(e.target.value)} 
            required
          />
        </div>
        {/* Price */}
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Plant Price</label>
          <div className="input-group mb-3">
            <span className="input-group-text">$</span>
            <input 
              id="price" 
              type="number" 
              className="form-control" 
              placeholder="Price" 
              min="0"
              value={props.price}
              onChange={(e)=>props.setPrice(parseInt(e.target.value))} 
              required
            />
            {/* <input type="text" className="form-control" aria-label="Amount (to the nearest dollar)"> */}
            <span className="input-group-text">.00</span>
          </div>
        </div>  
        {/* Category */}
        <div className="mb-3">
          <label htmlFor="category" className="form-label" >Category(s)</label>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="Beginner" id="beginner" onChange={handleCheckboxChange}/>
            <label className="form-check-label" htmlFor="beginner">Beginner</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="Best Seller" id="best-seller" onChange={handleCheckboxChange} />
            <label className="form-check-label" htmlFor="best-seller">Best Seller</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="Low Maintenance" id="low-maintenance" onChange={handleCheckboxChange} />
            <label className="form-check-label" htmlFor="low-maintenance">Low Maintenance</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="Tropical" id="tropical" onChange={handleCheckboxChange}/>
            <label className="form-check-label" htmlFor="tropical">Tropical</label>
          </div>
        </div>
        {/* Image */}
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image Source</label>
          <input 
            id="image" 
            type="url" 
            className="form-control" 
            placeholder="URL" 
            value={props.image}
            onChange={(e)=>props.setImage(e.target.value)} 
            required
          />
        </div>

        <input type="submit" className="btn btn-primary mt-3" value={`${props.title} Plant`} />
      </form> 
    </div>
  )
}

export default PlantForm;
