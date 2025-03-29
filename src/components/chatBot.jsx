import React, { useState } from 'react'
import axios from 'axios'
import { FaRobot, FaTimesCircle, FaPaperPlane } from 'react-icons/fa'

const ChatBot = () => {
    const [question, setQuestion] = useState('')
    const [GeneratedAnswer, setGeneratedAnswer] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const apiKey = import.meta.env.VITE_GEMENI_API_KEY;

    const toggleChat = () => {
        setIsOpen(!isOpen)
    }

    const generateAnswer = async () => {
        if (!question.trim()) return;
        
        setIsLoading(true)
        try {
            const response = await axios({
                url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
                method: "post",
                data: {
                    "contents": [{
                        "parts": [{ "text": question }]
                    }]
                }
            })
            setGeneratedAnswer(response['data']['candidates'][0]['content']['parts'][0]['text'])
            setQuestion('')
        } catch (error) {
            console.error("Error generating answer:", error)
            setGeneratedAnswer("Sorry, I couldn't generate an answer. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            {/* Chat bubble button */}
            <button 
                onClick={toggleChat} 
                className={`fixed bottom-8 right-8 bg-purple-600 text-white rounded-full p-4 shadow-lg hover:bg-purple-700 transition-all z-50 ${isOpen ? 'scale-0' : 'scale-100'}`}
                aria-label="Open chat"
            >
                <FaRobot size={24} />
            </button>

            {/* Chat Modal */}
            <div className={`fixed bottom-0 right-0 w-96 bg-white rounded-t-xl shadow-xl transition-all duration-300 z-50 transform ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
                {/* Header */}
                <div className="bg-purple-600 text-white px-4 py-3 rounded-t-xl flex justify-between items-center">
                    <h3 className="font-medium text-lg">Chat with Gemini</h3>
                    <button 
                        onClick={toggleChat}
                        className="hover:bg-purple-700 p-1 rounded-full"
                        aria-label="Close chat"
                    >
                        <FaTimesCircle size={20} />
                    </button>
                </div>

                {/* Chat content */}
                <div className="p-4 h-80 overflow-auto bg-gray-50">
                    {GeneratedAnswer && (
                        <div className="bg-white p-3 rounded-lg shadow-sm mb-4 max-w-[90%] text-sm">
                            <pre className="whitespace-pre-wrap font-sans">{GeneratedAnswer}</pre>
                        </div>
                    )}
                </div>

                {/* Input area */}
                <div className="p-4 bg-white border-t border-gray-200">
                    <div className="flex items-center gap-2">
                        <textarea 
                            value={question} 
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="Ask something..."
                            className="flex-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-300 focus:border-purple-500 focus:outline-none resize-none"
                            rows={2}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    generateAnswer();
                                }
                            }}
                        ></textarea>
                        <button 
                            onClick={generateAnswer} 
                            disabled={isLoading}
                            className="bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 disabled:bg-purple-400 transition-colors"
                        >
                            {isLoading ? (
                                <div className="h-5 w-5 border-t-2 border-r-2 border-white rounded-full animate-spin"></div>
                            ) : (
                                <FaPaperPlane />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatBot
