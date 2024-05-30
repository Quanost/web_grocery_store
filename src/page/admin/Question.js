import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import io from 'socket.io-client';

const socket = io(process.env.REACT_APP_SOCKET_URL);

const Question = () => {
    const [users, setUser] = useState([
        { id: 1, name: 'User 1' },
        { id: 2, name: 'User 2' },
        { id: 3, name: 'User 3' },
    ]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // Lắng nghe sự kiện "serverMsg" để nhận tin nhắn từ người dùng
        socket.on('receiveMessage', (data) => {
            setUser((prevMessages) => [...prevMessages, { id: data.room, name: data.from + ': ' + data.room }]);
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, [socket]);

    const handleUserSelect = (user) => {
        setSelectedUser(user);
        setMessages([]);
        setMessage('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim() === '') return;
        socket.emit('sendMessage', { message, room: '', from: 'Manager' });
        setMessages([...messages, { id: userId, message }]);
        setMessage('');
    };

    const toggleChat = () => {
        setSelectedUser(null);
    };

    return (
        <div className='dark:bg-strokedark dark:text-white min-h-screen'>
            <h1 className='h-[75px] flex justify-between items-center text-2xl font-medium font-main px-4 border-b'>
                Tư vấn
            </h1>
            <div className="flex">
                <div className="w-1/4 h-screen bg-gray-100 p-4">
                    <h2 className="text-lg font-bold mb-4">Users</h2>
                    <ul>
                        {users.map((user) => (
                            <li
                                key={user.id}
                                className="p-2 mb-2 bg-white rounded cursor-pointer hover:bg-gray-200"
                                onClick={() => handleUserSelect(user)}
                            >
                                {user.name}
                            </li>
                        ))}
                    </ul>
                </div>

                {selectedUser ? (
                    <div className="w-3/4 p-4 flex flex-col">
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-lg font-bold">Chat with {selectedUser.name}</h2>
                            <FaTimes
                                className="cursor-pointer"
                                size={24}
                                onClick={toggleChat}
                            />
                        </div>
                        <div className="flex-grow overflow-y-scroll mb-4 p-2 border rounded bg-gray-50">
                            {messages.map((msg, index) => (
                                <div key={index} className="mb-2">
                                    <strong>{msg.id}: </strong> {msg.message}
                                </div>
                            ))}
                        </div>
                        <form onSubmit={handleSubmit} className="flex flex-col">
                            <textarea
                                className="resize-none p-2 border rounded mb-2 h-24"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Nhập tin nhắn..."
                            />
                            <button
                                type="submit"
                                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                            >
                                Gửi
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="w-3/4 h-screen flex items-center justify-center text-gray-500">
                        Chọn người dùng để bắt đầu trò chuyện
                    </div>
                )}
            </div>
        </div>
    );
};
export default Question