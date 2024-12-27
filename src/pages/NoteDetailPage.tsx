import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Note {
  id: string;
  title: string;
  content: string;
}

const NoteDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the note ID from the URL
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          alert('Please log in first');
          return;
        }

        // Fetch the specific note by ID
        const response = await axios.get(`http://localhost:5000/api/notes/${id}`, {
          headers: { Authorization: token },
        });

        setNote(response.data);
        setLoading(false);
      } catch (error) {
        alert('Error fetching note: ' + (error instanceof Error ? error.message : 'Unknown error'));
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">Note Details</h1>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="bg-white p-8 rounded shadow-md border">
            <h2 className="text-2xl font-bold text-gray-800">{note?.title}</h2>
            <p className="text-gray-600 mt-4">{note?.content}</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default NoteDetailPage;
