import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { OtherPage } from './OtherPage';
import { Fib } from './Fib';

function App() {
  return (
    <Router>
      <Route exact path="/" component={Fib}></Route>
      <Route exact path="/otherpage" component={OtherPage}></Route>
    </Router>
  );
}

export default App;
