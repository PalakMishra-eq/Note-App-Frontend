// export default HomePage;
// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// const HomePage = () => {
//     const [notes, setNotes] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchNotes = async () => {
//           try {
//             const token = localStorage.getItem('authToken');
//             if (!token) {
//               alert('Please log in first');
//               return;
//             }
    
//             // Fetch the notes (up to the latest 3)
//             const response = await axios.get('http://localhost:5000/api/notes', {
//               headers: { Authorization: token },
//             });
    
//             setNotes(response.data); // Assuming response.data contains the notes
//             setLoading(false);
//           } catch (error) {
//             alert('Error fetching notes: ' + error.message);
//             setLoading(false);
//           }
//         };
    
//         fetchNotes();
//       }, []);
    
//       // Determine how many notes to show (up to 3)
//       const displayNotes = notes.length > 3 ? notes.slice(-3) : notes;

//   // Handle sign out
//   const handleSignOut = () => {
//     localStorage.removeItem('sessionToken');  // Clear the session token
//     window.location.href = '/login';  // Redirect to login page
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Header */}
//       <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
//         <h1 className="text-lg font-bold">NotesApp</h1>
//         <div className="space-x-4">
//           {/* Link to All Notes Page */}
//           <Link to="/all-notes">
//             <button className="px-4 py-2 bg-white text-blue-600 rounded hover:bg-gray-200 transition">
//               All Notes
//             </button>
//           </Link>
//           {/* Sign Out Button */}
//           <button
//             onClick={handleSignOut}
//             className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
//           >
//             Sign Out
//           </button>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="p-6">
//         {/* Link to Note Creation Page */}
//         <div className="text-center mb-6">
//           <Link to="/create-note">
//             <button className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
//               New Note
//             </button>
//           </Link>
//         </div>

//         {/* Notes Display */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {notes.map((note) => (
//             <div
//               key={note.id}
//               className="bg-white p-4 rounded shadow hover:shadow-lg transition"
//             >
//               <h2 className="text-lg font-bold text-gray-800">{note.title}</h2>
//               <p className="text-gray-600 mt-2">{note.description}</p>
//             </div>
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default HomePage;

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          alert('Please log in first');
          return;
        }

        // Fetch the notes (up to the latest 3)
        const response = await axios.get('http://localhost:5000/api/notes', {
          headers: { Authorization: token },
        });

        setNotes(response.data); // Assuming response.data contains the notes
        setLoading(false);
      } catch (error) {
        alert('Error fetching notes: ' + error.message);
        setLoading(false);
      }
    };

    fetchNotes();
    
  }, []);

  // Determine how many notes to show (up to 3)
  const displayNotes = notes.length > 3 ? notes.slice(-3) : notes;


  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">NotesApp</h1>
        <div className="space-x-4">
          <Link
            to="/create-note"
            className="px-4 py-2 bg-white text-blue-600 rounded hover:bg-gray-200 transition"
          >
            New Note
          </Link>
          <Link
            to="/all-notes"
            className="px-4 py-2 bg-white text-blue-600 rounded hover:bg-gray-200 transition"
          >
            All Notes
          </Link>
          <Link
            to="/"
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-gray-200 transition"
          >
            Sign Out
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Notes Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {loading ? (
            <p>Loading...</p>
          ) : (
            displayNotes.map((note) => (
              <div
                key={note.id}
                className="bg-white p-4 rounded shadow hover:shadow-lg transition"
              >
                <h2 className="text-lg font-bold text-gray-800">{note.title}</h2>
                <p className="text-gray-600 mt-2">
                  {note.content.slice(0, 150)} {/* Limit to first 150 characters */}
                </p>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
