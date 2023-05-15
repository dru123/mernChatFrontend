import React, { useEffect, useState } from 'react'

function Chat() {
    const [webSocket, setWebSocket] = useState(null);
    const [onlinePeople, setOnlinePeople] = useState({});

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:4000');
        setWebSocket(ws);
        ws.addEventListener('message', handlerMessage)
    }, []);

    function handlerMessage(e) {
        const messageData = JSON.parse(e.data);
        const people = {};
        if ('online' in messageData) {
            messageData.online.forEach(data => {
                people[data.userId] = data.username;
            });
        }
        setOnlinePeople(people);
    }
    return (
        <div className='flex h-screen'>
            <div className='bg-blue-100 w-1/3 p-2'>
                <div className='text-blue-500 font-bold flex'> Mern Chat</div>
                {
                    onlinePeople && Object.keys(onlinePeople).map(userId=>
                        (<div key={userId} className='py-2 border-b border-gray-100'> {onlinePeople[userId]}</div> )
                    )
                }
            </div>
            <div className='flex flex-col bg-blue-300 w-2/3 p-2'>
                <div className='flex-grow'>messages with selected person</div>
                <div className='flex gap-2'>
                    <input type="text" placeholder='Type your message here' className='bg-white border p-2 flex-grow rounded-sm'></input>
                    <button className='bg-blue-500 p-2 text-white rounded-sm'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>

                    </button>
                </div>
            </div>
        </div>
    )
}

export default Chat