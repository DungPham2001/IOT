import React, { useState, useEffect } from "react";
import { Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";
import "./App.css";

const App = () => {
  const [value, setValue] = useState({
    temperature: "",
    humidity: "",
    gas_sensor: "",
    status: "",
  });
  const [centeredModal, setCenteredModal] = useState(false);

  useEffect(() => {
    let interval = setInterval(() => {
      fetch("http://101.99.6.31:18866/api/v1/data?fbclid=IwAR0_IR1yfgkac-bEaxh5yaBulTse2q0MRoOS9Kcc9nANAHUskqXZptNt-Mc")
        .then((res) => res.json())
        .then(data => setValue({
          temperature : data.temperature,
          humidity : data.humidity,
          gas_sensor : data.gas,
          status : data.quatity
        }));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="vertically-centered-modal" style={{alignItems: 'center'}}>
      <Button
        className="btn-lg"
        variant="contained"
        onClick={() => setCenteredModal(!centeredModal)}
        style={{position: 'absolute', top: '50%', left: '40%', backgroundColor:'#E1467C'}}
      >
        Kiểm tra chất lượng không khí
      </Button>
      <Modal
        isOpen={centeredModal}
        toggle={() => setCenteredModal(!centeredModal)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader style={{justifyContent : 'center'}}>
          <h1 style={{color: '#da5290'}}>Chất lượng không khí</h1>
        </ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="d-flex justify-content-around mb-4 mt-4">
              <h3>Temperature: {value.temperature}</h3>
              <h3>Humidity: {value.humidity}</h3>
              <h3>Gas_sensor: {value.gas_sensor}</h3>
            </div>
            { value.status !== 0 ? <h3 className="text-danger text-center">chất lượng không khí kém</h3> : <h3 className="text-success text-center">chất lượng không khí tốt</h3>}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="primary"
            onClick={() => setCenteredModal(!centeredModal)}
            className="btn btn-info"
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default App;
