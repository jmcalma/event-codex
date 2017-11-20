import React from  "react";
import Header from "./Header";
import Home from "./Home";
import Calendar from "./Calendar";
import Footer from "./Footer";

// const Landing = () => <h2>Landing</h2>;

const App = () => {
  return (
    <div className="container">
      <div>
        <Header />
        {/* <Route exact path="/" component={Landing} /> */}
        <Home />
        <div id="space"> </div>
        <Calendar />
        <Footer />
      </div>
    </div>
  )
}

export default App;
