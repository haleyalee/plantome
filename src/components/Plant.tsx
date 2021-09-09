import React, {useState} from 'react'

type Props = {
  name: string,
  price: number,
  category: string[],
  quantity: number,
  image: string
}

// interface IPlant {
//   name: string;
//   price: number;
//   category: string[];
//   quantity: number;
//   image: string;
// }


// type Props = {
//   item: IPlant,
//   handleAddToCart: ()=>void;
//   handleRemoveFromCart: ()=>void;
// }

function Plant(props:Props):JSX.Element {

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    // <div className="col-sm-12 col-md-6 col-lg-3 py-sm-3">
      <div className="card text-center" >
        
        {/* Hover to show add to cart button */}
        { isHovering && 
        <div className="position-absolute hoverToAdd" onMouseLeave={handleMouseOut}>
          <button className="btn btn-secondary" style={{opacity: 1}}>Add to Cart</button>
        </div> }

        <div className="position-relative" onMouseOver={handleMouseOver}>
          <img className="card-img-top" src={props.image} alt={props.name} width="200px" height="250px"/>
          <div className="card-body">
            <p className="card-title">{props.name}</p>
            <p className="card-text">${props.price.toFixed(2)}</p>
          </div>
        </div>
        
      </div>
    // </div>
  )
}

export default Plant
