import { useState } from "react";
import DisplayTable from "./components/DisplayTable";
import Form from "./components/Form";

const App = () => {
  const [response, setResponse] = useState({ success: "" });
  const [displayFields, setDisplayFields] = useState([]);

  return (
    <>
      <Form setDisplayFields={setDisplayFields} setResponse={setResponse} />
      {response.success && (
        <DisplayTable displayFields={displayFields} data={response.data} />
      )}
    </>
  );
};

export default App;
