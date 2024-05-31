import React, { useState, useEffect } from 'react';
import { FaComments, FaTimes } from 'react-icons/fa';
import io from 'socket.io-client';

const socket = io(process.env.REACT_APP_SOCKET_URL);

const MessageForm = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [room, setRoom] = useState('defaultRoom');

    useEffect(() => {
        socket.on('receiveMessage', (data) => {
            console.log('nhận đƯợc', data);
            setMessages((prevMessages) => [...prevMessages, `${data.from}: ${data.message}`]);
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim() === '') return;

        socket.emit('sendMessage', { message, room: 'room', from: 'user' });
        setMessage('');
    };

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            {!isOpen && (
                <div
                    className="fixed bottom-0 right-0 m-4 p-2 bg-blue-500 text-white rounded-full cursor-pointer"
                    onClick={toggleChat}
                >
                    <FaComments size={24} />
                </div>
            )}

            {isOpen && (
                <div className="fixed bottom-0 right-0 m-4 p-4 bg-white rounded-lg shadow-lg w-80">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-lg font-bold">Gửi câu hỏi tư vấn</h2>
                        <FaTimes
                            className="cursor-pointer"
                            size={24}
                            onClick={toggleChat}
                        />
                    </div>
                    <textarea
                        className="resize-none p-2 border rounded mb-4 w-full h-32"
                        value={messages.join('\n')}
                        readOnly
                    />
                    <form onSubmit={handleSubmit} className="flex gap-5">
                        <textarea
                            className="resize-none p-2 border rounded mb-2 w-full"
                            rows="1"
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
            )}
        </div>
    );
};

export default MessageForm;