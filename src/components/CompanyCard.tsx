import React from 'react'

type Props = {
  feature: string;
}

function CompanyCard(props:Props):JSX.Element {
  return (
    <div className="col-sm-12 col-md-4 py-sm-3">
      <div className="company-card card w-md-25 w-sm-100 p-5" style={{minHeight: "186px"}}>
        <div className="card-body text-center d-flex align-items-center justify-content-center">
          <h5 className="pb-0">{props.feature}</h5>
        </div>
      </div>
    </div>
  )
}

export default CompanyCard
