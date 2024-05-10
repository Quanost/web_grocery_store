import React, { memo } from 'react';
import { HashLoader } from 'react-spinners';

const Loading = ({ show }) => {
  return show && (
    <div>
      <HashLoader color={'#469c4b'} />
    </div>
  )
}

export default memo(Loading)
