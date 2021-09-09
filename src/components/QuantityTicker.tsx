import React, { useState } from 'react'

function QuantityTicker():JSX.Element {

  const [count, setCount] = useState(1);

  const handleMinus = () => {
    if (count-1 >= 0)
      setCount(count-1);
  }

  const handlePlus = () => {
    setCount(count+1);
  }

  return (
    <div className="d-flex">
      <p className="pe-2">Qty</p>
      <span>
        <button className="btn btn-outline-secondary p-0 px-1 text-center" onClick={handleMinus}>-</button>
        <a> {count} </a>
        <button className="btn btn-outline-secondary p-0 px-1" onClick={handlePlus}>+</button>
      </span>
    </div>
  )
}

export default QuantityTicker
