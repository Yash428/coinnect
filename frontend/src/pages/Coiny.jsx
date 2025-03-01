import React from "react";

const Coiny = () => {
    return (
        <div className="bg-gray-100 text-gray-900 font-sans flex justify-center items-center h-screen w-screen flex-col">
            <div className="flex items-center text-5xl font-bold text-center">
                <span className="text-yellow-500">Coin</span>
                <span className="text-green-600">nect</span>
            </div>
            <div className="w-screen h-[calc(100vh-80px)] border-2 border-green-600 rounded-lg overflow-hidden shadow-md mt-5 flex flex-col bg-white">
                <div className="bg-green-600 text-white text-center py-4 text-lg font-bold">
                    COINY
                </div>
                <div className="w-full h-full overflow-hidden">
                    <iframe 
                        src="https://udify.app/chatbot/Ahhmq0BgYnWXc0G3"
                        allow="microphone"
                        className="w-full h-full border-none block">
                    </iframe>
                </div>
            </div>
        </div>
    );
};

export default Coiny;
