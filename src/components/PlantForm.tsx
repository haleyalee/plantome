import React, {useState} from 'react';
import '../styles/Admin.css';
import Plant from '../entities/plant';

type Props = {
  title: string,
  // eslint-disable-next-line
  plant: any,
  submitForm: (plant:Plant) => void;
}

function PlantForm(props:Props):JSX.Element {

  const [name, setName] = useState(props.plant.name ? props.plant.name : '');
  const [price, setPrice] = useState(props.plant.price ? props.plant.price : 0);
  const [category, setCategory] = useState<string[]>(props.plant.category ? props.plant.category : []);
  const [image, setImage] = useState(props.plant.image ? props.plant.image : '');

  const [beginner, setBeginner] = useState(props.plant.category && props.plant.category.includes("Beginner") ? true : false);
  const [bestSeller, setBestSeller] = useState(props.plant.category && props.plant.category.includes("Best Seller") ? true : false);
  const [lowMaintenance, setLowMaintenance] = useState(props.plant.category && props.plant.category.includes("Low Maintenance") ? true : false);
  const [tropical, setTropical] = useState(props.plant.category && props.plant.category.includes("Tropical") ? true : false);

  // eslint-disable-next-line
  const handleCheckboxChange = (e:any) => {
    let newArray = [...category, e.target.value];
    if (category.includes(e.target.value)) {
      newArray = newArray.filter(cat => cat !== e.target.value);
    } 
    setCategory(newArray);
  };

  const handleSubmit = (e:React.SyntheticEvent) => {
    e.preventDefault();
    const plant = new Plant(
      props.plant.id,
      name,
      price,
      category,
      0,
      image
    )
    props.submitForm(plant);
    console.log("Posting new plant");
  }

  return (
    <div>
      <div className="d-flex flex-column flex-lg-row">
        <div id="addedit-plant">
          <h2 className="pb-3">{props.title} Plant</h2>
          <form id="plant-form" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Plant Name</label>
              <input 
                id="name" 
                type="text" 
                className="form-control" 
                placeholder="Name" 
                value={name} 
                onChange={(e)=>setName(e.target.value)} 
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
                  value={price}
                  onChange={(e)=>setPrice(parseInt(e.target.value))} 
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
                <input 
                  className="form-check-input" 
                  type="checkbox" 
                  value="Beginner" 
                  checked={beginner} 
                  id="beginner" 
                  onChange={(e)=> { setBeginner(!beginner); handleCheckboxChange(e) }}
                />
                <label className="form-check-label" htmlFor="beginner">Beginner</label>
              </div>
              <div className="form-check">
                <input 
                  className="form-check-input" 
                  type="checkbox" 
                  value="Best Seller" 
                  checked={bestSeller} 
                  id="best-seller" 
                  onChange={(e)=> { setBestSeller(!bestSeller); handleCheckboxChange(e) }} 
                />
                <label className="form-check-label" htmlFor="best-seller">Best Seller</label>
              </div>
              <div className="form-check">
                <input 
                  className="form-check-input" 
                  type="checkbox" 
                  value="Low Maintenance" 
                  checked={lowMaintenance} 
                  id="low-maintenance" 
                  onChange={(e)=>  { setLowMaintenance(!lowMaintenance); handleCheckboxChange(e) }} 
                />
                <label className="form-check-label" htmlFor="low-maintenance">Low Maintenance</label>
              </div>
              <div className="form-check">
                <input 
                  className="form-check-input" 
                  type="checkbox" 
                  value="Tropical" 
                  checked={tropical} 
                  id="tropical" 
                  onChange={(e)=> { setTropical(!tropical); handleCheckboxChange(e) }}
                />
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
                value={image}
                onChange={(e)=>setImage(e.target.value)} 
                required
              />
            </div>

            <input type="submit" className="btn btn-primary mt-3" value={`${props.title} Plant`} />
          </form> 
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

export default PlantForm;
