import React from 'react'

import Notes from './Notes';

const Home = (props) => {

  const {setProgress, showToast} = props;
  return (
    <Notes setProgress={setProgress} showToast={showToast}/>
  )
}

export default Home

