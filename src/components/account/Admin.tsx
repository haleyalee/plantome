import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import AppContext from '../../contexts';

import '../../styles/Admin.css';

// eslint-disable-next-line
function Admin(props:any):JSX.Element {

  const { plants } = useContext(AppContext);

  return (
    <div className="container py-5">
      <div id="admin-dashboard">
        <div id="add" className="d-flex flex-row justify-content-between pb-3">
          <h2>Admin Dashboard</h2>
          <button className="btn btn-primary btn-lg" onClick={()=>props.history.push('/admin/add-plant')}>&#43; Add New Plant</button>
        </div>
        <div id="edit">
          <h3 className="pb-3">Edit Plants</h3>
          <Grid container spacing={4} id="plant-grid">
            {plants.map( (plant) => 
              <Grid key={plant.id} item xs={12} sm={6} md={4} lg={3}>
                <div className="plant-card card text-center">
                  <img className="card-img-top" src={plant.image} alt={plant.name} width="200px" height="250px"/>
                  <div className="card-body">
                    <p className="card-title">{plant.name}</p>
                    <p className="card-text">${plant.price.toFixed(2)}</p>
                  </div>
                  <div>
                    <button id="editBtn" className="btn btn-outline-secondary mb-3" onClick={()=>props.history.push(`/admin/edit-plant/${plant.id}`)}>Edit Plant</button>   
                  </div>
                </div>
              </Grid>
            )}
          </Grid>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Admin);
