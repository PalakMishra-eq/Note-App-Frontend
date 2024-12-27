import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Note {
  id: string;
  title: string;
  content: string;
}

const AllNotesPage: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          alert('Please log in first');
          return;
        }

        // Fetch all notes
        const response = await axios.get('http://localhost:5000/api/notes/all', {
          headers: { Authorization: token },
        });

        setNotes(response.data); // Assuming response.data contains the notes
        setLoading(false);
      } catch (error) {
        alert('Error fetching notes: ' + (error instanceof Error ? error.message : 'Unknown error'));
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">All Notes</h1>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Notes List */}
        <div className="space-y-4">
          {loading ? (
            <p>Loading...</p>
          ) : (
            notes.map((note) => (
              <div
                key={note.id}
                className="bg-white p-4 rounded shadow hover:shadow-lg transition"
              >
                <Link to={`/note/${note.id}`}>
                  <h2 className="text-lg font-bold text-gray-800">{note.title}</h2>
                  <p className="text-gray-600 mt-2">{note.content.slice(0, 150)}...</p>
                </Link>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default AllNotesPage;
