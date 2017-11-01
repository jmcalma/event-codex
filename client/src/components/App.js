import React from  "react";
import { BrowserRouter, Route} from "react-router-dom";
import Header from "./Header";
import Home from "./Home";

// const Landing = () => <h2>Landing</h2>;

const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <div>
          <Header />
          {/* <Route exact path="/" component={Landing} /> */}
          <Home />
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App;
