import { Ticket, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function Events() {
  const [events, setEvents] = useState([
    { id: 1, title: 'Spring Hackathon', date: 'Fri, Apr 12', location: 'Main Auditorium', price: 0, booked: false },
    { id: 2, title: 'Campus Music Fest', date: 'Sat, Apr 20', location: 'Open Grounds', price: 300, booked: false },
    { id: 3, title: 'AI Tech Talk', date: 'Mon, Apr 22', location: 'CS Building, Room 101', price: 50, booked: false }
  ]);

  const handleBook = (id) => {
    setEvents(events.map(e => e.id === id ? { ...e, booked: true } : e));
  };

  return (
    <div className="flex flex-col gap-6 pt-4 pb-24 animate-in slide-in-from-right duration-300">
      <div className="glass-panel p-5 bg-orange-900/20 ring-1 ring-orange-500/50 flex items-center gap-4">
        <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center text-orange-400">
          <Ticket size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-400">Upcoming Events</h2>
          <p className="text-xs text-gray-400 mt-1">Book tickets with CampusTokens</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {events.map(event => (
          <div key={event.id} className="glass-panel p-5 overflow-hidden relative transition-all hover:scale-[1.02]">
            {event.booked && (
              <div className="absolute -right-8 -top-8 w-24 h-24 bg-green-500/20 rounded-full blur-xl"></div>
            )}
            
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-bold text-lg leading-tight">{event.title}</h4>
                <div className="flex flex-col gap-1 mt-2 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><Calendar size={12} className="text-orange-400" /> {event.date}</span>
                  <span className="flex items-center gap-1"><MapPin size={12} className="text-blue-400" /> {event.location}</span>
                </div>
              </div>
              <div className="font-extrabold text-xl text-orange-400">
                {event.price === 0 ? 'FREE' : `₹${event.price}`}
              </div>
            </div>
            
            <button 
              disabled={event.booked}
              onClick={() => handleBook(event.id)}
              className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all
                ${event.booked ? 'bg-green-600/20 text-green-400 ring-1 ring-green-500/50' : 'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500'}
              `}
            >
              {event.booked ? <><CheckCircle2 size={18} /> Ticket Purchased</> : 'Get Ticket'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
