import { useState } from 'react';

const platformsList = ['Facebook', 'Threads', 'TikTok', 'Instagram', 'X', 'Reddit'];

function App() {
  const [message, setMessage] = useState('');
  const [selected, setSelected] = useState([]);
  const [status, setStatus] = useState('');

  const togglePlatform = (platform) => {
    setSelected(prev =>
      prev.includes(platform) ? prev.filter(p => p !== platform) : [...prev, platform]
    );
  };

  const handleBlast = async () => {
    const res = await fetch('https://social-blast-backend.onrender.com/blast', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, platforms: selected }),
    });
    const data = await res.json();
    setStatus(`✅ Blasted to: ${data.platforms.join(', ')}`);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl space-y-4">
      <h1 className="text-2xl font-bold text-center">🚀 Social Blast</h1>
      <textarea
        className="w-full p-3 border rounded resize-none"
        rows="4"
        placeholder="Write your post..."
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <div className="flex flex-wrap gap-2">
        {platformsList.map(p => (
          <button
            key={p}
            onClick={() => togglePlatform(p)}
            className={`px-4 py-2 rounded-full border ${
              selected.includes(p) ? 'bg-purple-500 text-white' : 'bg-gray-100'
            }`}
          >
            {p}
          </button>
        ))}
      </div>
      <button
        onClick={handleBlast}
        className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded"
      >
        Blast It!
      </button>
      {status && <p className="text-green-600 font-semibold">{status}</p>}
    </div>
  );
}

export default App;
