import React from 'react';
import Home from './pages/home/Home';
import TopBar from './components/topbar/TopBar';
import Single from './pages/single/Single';
import Write from './pages/write/Write';
import Setting from './pages/setting/Setting';

function App() {
  return (
    <>
      <TopBar />
      <Setting />
      {/* <Write /> */}
      {/* <Single /> */}
      {/* <Home /> */}
    </>
  );
}

export default App;
