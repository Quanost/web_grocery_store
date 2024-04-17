import React, {memo} from 'react';
import { HashLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div>
     <HashLoader color={'#469c4b'} />
    </div>
  )
}

export default memo(Loading)
