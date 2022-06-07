import React from "react";
import "./App.css";
import { Button, CssBaseline } from "@mui/material";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import Appbar from "./components/appbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import List from "./components/list";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProTable from "./components/Pro";
import Form from "./components/Form";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  const [count, setCount] = React.useState(0);
  const addUgur = async () => {
    const docData = {
     
      rowData: {
        a: 5,
        b: {
          nested: "foo",
        },
      },
    };
    // @ts-ignore
    await setDoc(doc(db, "data", "one"), docData);
  };
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <BrowserRouter>
          <Appbar />
          <Routes>
            <Route path="list" element={<List />} />
            <Route path="add" element={<Form />} />
            <Route path="pro" element={<ProTable />} />
            
          </Routes>
        </BrowserRouter>
       
      </ThemeProvider>
    </div>
  );
}



export default App;
