import axios from 'axios';
import { useState } from 'react';

const CreateNotePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // Get the auth token from localStorage or another storage mechanism
        const token = localStorage.getItem('authToken');
    
        // Make the POST request to your backend
        const response = await axios.post(
          'http://localhost:5000/api/notes/create', // Your backend endpoint
          { title, content }, // The data to send
          {
            headers: {
              Authorization: `${token}`, // Include the auth token
            },
          }
        );
    
        // Handle success
        if (response.status === 201) {
          alert('Note created successfully!');
          setTitle('');
          setContent('');
        }
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message); // Now `error.message` is accessible
        } else {
          alert('An unknown error occurred');
        }
      }
      
    };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create a New Note</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Input */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter the note title"
              className="w-full px-4 py-2 border rounded text-gray-700 focus:outline-none focus:ring focus:border-blue-500 "
              required
            />
          </div>

          {/* Content Input */}
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter the note content"
              rows="5"
              className="w-full px-4 py-2 border rounded text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Create Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNotePage;
