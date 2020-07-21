import React from "react";
import { ExclamationTriangleFill } from "react-bootstrap-icons";
import Alert from "react-bootstrap/Alert";

export default function ErrorAlert(props) {
  return (
    <>
      <Alert variant="danger">
        <ExclamationTriangleFill color="white" className="mr-3" size="40" />
        <em>
          <strong>{props.message}</strong>
        </em>
      </Alert>
    </>
  );
}
