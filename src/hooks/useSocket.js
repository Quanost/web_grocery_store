// import { useEffect, useState } from 'react';
// import io from 'socket.io-client';

// const useSocket = (getApiFunction) => {
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     const socketInstance = io.connect(process.env.REACT_APP_SOCKET_URL);
//     setSocket(socketInstance);

//     return () => {
//       socketInstance.disconnect();
//     };
//   }, []);

//   useEffect(() => {
//     if (!socket || !getApiFunction) return;

//     const handleServerMsg = async (data) => {
//       await getApiFunction(); // Gọi hàm getApiFunction để re-fetch API
//     };

//     socket.on('serverMsg', handleServerMsg);

//     return () => {
//       socket.off('serverMsg', handleServerMsg);
//     };
//   }, [socket, getApiFunction]);

//   const sendMessage = (message, room) => {
//     if (socket) {
//       socket.emit('clientMsg', { message, room });
//     }
//   };

//   return { sendMessage };
// };

// export default useSocket;