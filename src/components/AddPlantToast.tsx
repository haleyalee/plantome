import React, {useState} from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';


function AddPlantToast():JSX.Element {

  const [show, setShow] = useState(true);
  // const showToast = () => {
  //   console.log("Showing toast")
  //   setShow(!show);
  // }

  return (
    <div>
      {/* Success message */}
      <ToastContainer position={"bottom-end"} style={{height:"100vh", width:"100wh"}}>
      <Toast show={show} onClose={()=>setShow(false)} delay={3000} autohide>
        <Toast.Header>
          <img src="" className="rounded mr-2" alt="" />
          <strong className="mr-auto">Success!</strong>
        </Toast.Header>
        <Toast.Body>
          You&apos;ve added the plant into your cart.
        </Toast.Body>
      </Toast>
      </ToastContainer>
    </div>
  )
}

export default AddPlantToast;
