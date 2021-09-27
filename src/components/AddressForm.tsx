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
      <div id="street-extra" className="d-flex mb-3">
        <div id="street" className="form-floating">
          <input 
            id={props.streetId} 
            type="text" 
            className="form-control" 
            placeholder="Street Address or P.O. Box" 
            value={props.street} 
            onChange={(e)=>props.setStreet(e.target.value)} 
            required
          />
          <label htmlFor={props.streetId}>Street Address or P.O. box</label>
          <div className="invalid-feedback">
            Please provide a street address.
          </div>
        </div>
        <div id="extra" className="form-floating">
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
      <div id="city-state-zip" className="d-flex">
        <div id="city" className="form-floating">
          <input 
            id={props.cityId} 
            type="text" 
            className="form-control" 
            placeholder="City" 
            value={props.city}
            onChange={(e)=>props.setCity(e.target.value)}
            required
          />
          <label htmlFor={props.cityId} className="form-label">City</label>
          <div className="invalid-feedback">
            Please provide a city.
          </div>
        </div>
        <div id="state" className="form-floating">
          <select id={props.stateId} className="form-select" value={props.state} onChange={(e)=>props.setState(e.target.value)} required>
            <option selected disabled value="">Select state...</option>
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="DC">District Of Columbia</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
          </select>
          <label htmlFor={props.stateId} className="form-label">State</label>
          <div className="invalid-feedback">
            Please select a state.
          </div>
        </div>
        <div id="zipcode" className="form-floating">
          <input 
            id={props.zipcodeId} 
            type="text" 
            className="form-control" 
            placeholder="Zipcode" 
            value={props.zipcode} 
            onChange={(e)=>props.setZipcode(e.target.value)}
            required
          />
          <label htmlFor={props.zipcodeId} className="form-label">Zip Code</label>
          <div className="invalid-feedback">
            Please provide a zipcode.
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddressForm;
