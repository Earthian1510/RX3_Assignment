import React from "react";
import Header from "./components/Header";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'


function App() {
  return (
    <main>
      <Header />
      <div className="container">
        <h1 ms-auto>Welcome to the school</h1>
      </div>
    </main>
  );
}

export default App;
