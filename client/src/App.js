import React from 'react';
import Home from './pages/home/Home';
import TopBar from './components/topbar/TopBar';
import Single from './pages/single/Single';
import Write from './pages/write/Write';

function App() {
  return (
    <>
      <TopBar />
      <Write />
      {/* <Single /> */}
      {/* <Home /> */}
    </>
  );
}

export default App;
