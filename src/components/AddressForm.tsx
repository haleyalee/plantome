import React from 'react'

type Props = {
  streetId: string,
  street: string,
  setStreet: (street:string)=>void,
  extraId: string,
  extra: string,
  setExtra: (extra:string)=>void,
  cityId: string,
  city: string,
  setCity: (city:string)=>void,
  stateId: string,
  state: string,
  setState: (state:string)=>void,
  zipcodeId: string,
  zipcode: string,
  setZipcode: (zipcode:string)=>void
}

function AddressForm(props:Props):JSX.Element {
  return (
    <div>
      <div className="d-flex mb-3">
        <div className="form-floating w-75 me-3">
          <input 
            id={props.streetId} 
            type="text" 
            className="form-control" 
            placeholder="Street Address or P.O. Box" 
            value={props.street} 
            onChange={(e)=>props.setStreet(e.target.value)} 
          />
          <label htmlFor={props.streetId}>Street Address or P.O. box</label>
        </div>
        <div className="form-floating w-25">
          <input 
            id={props.extraId}
            type="text" 
            className="form-control" 
            placeholder="Apt., Suite, Unit, Building, etc." 
            value={props.extra} 
            onChange={(e)=>props.setExtra(e.target.value)}
          />
          <label htmlFor={props.extraId}>Other</label>
        </div>
      </div>
      <div className="d-flex">
        <div className="form-floating me-3 w-50">
          <input 
            id={props.cityId} 
            type="text" 
            className="form-control" 
            placeholder="City" 
            value={props.city}
            onChange={(e)=>props.setCity(e.target.value)}
          />
          <label htmlFor={props.cityId} className="form-label">City</label>
        </div>
        <div className="form-floating w-25 me-3">
          <select id={props.stateId} className="form-select" value={props.state} onChange={(e)=>props.setState(e.target.value)}>
            <option value="select">Select state...</option>
            <option value="Florida">Florida</option>
          </select>
          <label htmlFor={props.stateId} className="form-label">State</label>
        </div>
        <div className="form-floating w-25">
          <input 
            id={props.zipcodeId} 
            type="text" 
            className="form-control" 
            placeholder="Zipcode" 
            value={props.zipcode} 
            onChange={(e)=>props.setZipcode(e.target.value)}
          />
          <label htmlFor={props.zipcodeId} className="form-label">Zip Code</label>
        </div>
      </div>
    </div>
  )
}

export default AddressForm;
