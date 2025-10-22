import { useState } from 'react';
import eventImage1 from './assets/WhatsApp Image 2025-09-15 at 13.33.45.jpeg';
import mainVideo from './assets/MAIN_VIDEO.mp4';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  venue: string;
  speaker?: string;
  posterUrl: string;
  category: string;
  startDateTime: string;
  endDateTime: string;
}

function App() {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const today = new Date();
  const [calendarMonthIdx, setCalendarMonthIdx] = useState(today.getMonth());
  const [calendarYear, setCalendarYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(new Date(calendarYear, calendarMonthIdx, today.getDate()));
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  const events: Event[] = [
{
    id: 1,
    title: "Resume Building Workshop",
    date: "August 24, 2025",
    time: "3:00 PM to 4:00 PM",
    venue: "Virtual",
    speaker: "Arjun Bhatnagar & Sudhanshu Ranjan",
    posterUrl: "placeholder_R",
    category: "Workshop",
    startDateTime: "2025-08-24T15:00:00",
    endDateTime: "2025-08-24T16:00:00",
  },
  {
    id: 2,
    title: "Data Dialouges Unplugged Chap 1",
    date: "August 28, 2025",
    time: "5:00 PM to 7:00 PM",
    venue: "Virtual",
    speaker: "Kireeti Kesavamurthy",
    posterUrl: "placeholder_D",
    category: "Speaker Session",
    startDateTime: "2025-08-28T17:00:00",
    endDateTime: "2025-08-28T19:00:00",
  },
  {
    id: 3,
    title: "Mind, Market & Ministries",
    date: "September 27, 2025",
    time: "11:30 AM to 1:30 PM",
    venue: "NAB 6163",
    speaker: "Kunal Rahar",
    posterUrl: "placeholder_M",
    category: "Seminar",
    startDateTime: "2025-09-27T11:30:00",
    endDateTime: "2025-09-27T13:30:00",
  },
  {
    id: 4,
    title: "Study Circle (Product Management)",
    date: "October 12, 2025",
    time: "5:00 PM to 7:00 PM",
    venue: "Virtual",
    speaker: "Students",
    posterUrl: "placeholder_S",
    category: "Study Circle",
    startDateTime: "2025-10-12T17:00:00",
    endDateTime: "2025-10-12T19:00:00",
  },
  
  // Multi-Day Events (BOSM 2025: Sept 17 - Sept 21)
  {
    id: 5,
    title: "BOSM 2025",
    date: "September 17 - 21, 2025",
    time: "All Day",
    venue: "TBD",
    speaker: undefined,
    posterUrl: "placeholder_B",
    category: "Festival",
    startDateTime: "2025-09-17", // Date only format
    endDateTime: "2025-09-22",   // Exclusive end date
  },

  // Multi-Day Events (Oct 31 - Nov 2)
  {
    id: 6,
    title: "Interface",
    date: "October 31 - November 2, 2025",
    time: "All Day",
    venue: "TBD",
    speaker: undefined,
    posterUrl: "placeholder_I",
    category: "Festival",
    startDateTime: "2025-10-31",
    endDateTime: "2025-11-03",
  },
  {
    id: 7,
    title: "Inkspire",
    date: "October 31 - November 2, 2025",
    time: "All Day",
    venue: "TBD",
    speaker: "Alumini Relations Club",
    posterUrl: "placeholder_In",
    category: "Competition",
    startDateTime: "2025-10-31",
    endDateTime: "2025-11-03",
  },
  {
    id: 8,
    title: "Enigmatic Enclave",
    date: "October 31 - November 2, 2025",
    time: "All Day",
    venue: "TBD",
    speaker: "Media Relations Club",
    posterUrl: "placeholder_E",
    category: "Competition",
    startDateTime: "2025-10-31",
    endDateTime: "2025-11-03",
  },
  {
    id: 9,
    title: "Stock Storm Exchange",
    date: "October 31 - November 2, 2025",
    time: "All Day",
    venue: "TBD",
    speaker: "Finance Club",
    posterUrl: "placeholder_St",
    category: "Competition",
    startDateTime: "2025-10-31",
    endDateTime: "2025-11-03",
  },
  {
    id: 10,
    title: "HR Imperium",
    date: "October 31 - November 2, 2025",
    time: "All Day",
    venue: "TBD",
    speaker: "HR & Sponsorship Club",
    posterUrl: "placeholder_H",
    category: "Competition",
    startDateTime: "2025-10-31",
    endDateTime: "2025-11-03",
  },
  {
    id: 11,
    title: "Cash or Clash",
    date: "October 31 - November 2, 2025",
    time: "All Day",
    venue: "TBD",
    speaker: "Industry Linkage Club",
    posterUrl: "placeholder_C",
    category: "Competition",
    startDateTime: "2025-10-31",
    endDateTime: "2025-11-03",
  },
  {
    id: 12,
    title: "InnoMun",
    date: "October 31 - November 2, 2025",
    time: "All Day",
    venue: "TBD",
    speaker: "Marketing Club",
    posterUrl: "placeholder_InM",
    category: "Competition",
    startDateTime: "2025-10-31",
    endDateTime: "2025-11-03",
  },
  {
    id: 13,
    title: "Moneyball",
    date: "October 31 - November 2, 2025",
    time: "All Day",
    venue: "TBD",
    speaker: "Operations Club",
    posterUrl: "placeholder_M",
    category: "Competition",
    startDateTime: "2025-10-31",
    endDateTime: "2025-11-03",
  },
  {
    id: 14,
    title: "The Product Paradox",
    date: "October 31 - November 2, 2025",
    time: "All Day",
    venue: "TBD",
    speaker: "Product Management Club",
    posterUrl: "placeholder_P",
    category: "Competition",
    startDateTime: "2025-10-31",
    endDateTime: "2025-11-03",
  },
  {
    id: 15,
    title: "Innovision",
    date: "October 31 - November 2, 2025",
    time: "All Day",
    venue: "TBD",
    speaker: "E-Cell",
    posterUrl: "placeholder_Inv",
    category: "Competition",
    startDateTime: "2025-10-31",
    endDateTime: "2025-11-03",
  },
];

  function getDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate();
  }
  function getFirstDayOfMonth(year: number, month: number) {
    return new Date(year, month, 1).getDay();
  }
  const daysInMonth = getDaysInMonth(calendarYear, calendarMonthIdx);
  const firstDay = getFirstDayOfMonth(calendarYear, calendarMonthIdx);
  const calendarDays: Array<Date | null> = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarDays.push(new Date(calendarYear, calendarMonthIdx, d));

  function generateGoogleCalendarUrl(event: Event) {
    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.startDateTime}/${event.endDateTime}&details=${encodeURIComponent(event.speaker || '')}&location=${encodeURIComponent(event.venue)}&sf=true&output=xml`;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 to-blue-800 text-white overflow-hidden">
        <video
          src={mainVideo}
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          className="w-full h-[60vh] object-cover"
        />
      </div>
      <div className="w-full flex flex-col items-center justify-center py-8">
        <h1 className="text-4xl font-bold mb-2 text-gray-900 tracking-tight">Department of Management</h1>
        <h2 className="text-xl font-medium mb-2 text-blue-900">Academic Calendar</h2>
        <p className="text-base text-gray-700 max-w-2xl text-center">
          Stay updated with upcoming events, workshops, and seminars from the Department of Management.
        </p>
      </div>
      {/* Minimal Calendar and Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex gap-12">
        {/* Calendar Section (left) */}
        <div className="w-full max-w-md">
          <div className="flex items-center justify-between mb-2">
            <button
              className="px-2 py-1 text-sm text-blue-900 hover:bg-blue-100 rounded"
              onClick={() => {
                if (calendarMonthIdx === 0) {
                  setCalendarMonthIdx(11);
                  setCalendarYear(calendarYear - 1);
                } else {
                  setCalendarMonthIdx(calendarMonthIdx - 1);
                }
                setSelectedDate(new Date(calendarYear, calendarMonthIdx === 0 ? 11 : calendarMonthIdx - 1, 1));
              }}
            >&lt;</button>
            <span className="font-semibold text-lg text-gray-900">{months[calendarMonthIdx]} {calendarYear}</span>
            <button
              className="px-2 py-1 text-sm text-blue-900 hover:bg-blue-100 rounded"
              onClick={() => {
                if (calendarMonthIdx === 11) {
                  setCalendarMonthIdx(0);
                  setCalendarYear(calendarYear + 1);
                } else {
                  setCalendarMonthIdx(calendarMonthIdx + 1);
                }
                setSelectedDate(new Date(calendarYear, calendarMonthIdx === 11 ? 0 : calendarMonthIdx + 1, 1));
              }}
            >&gt;</button>
          </div>
          <div className="grid grid-cols-7 gap-2 bg-white rounded-lg shadow p-4">
            {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(day => (
              <div key={day} className="text-xs font-semibold text-gray-500 text-center mb-2">{day}</div>
            ))}
            {calendarDays.map((date, idx) => {
              if (!date) return <div key={idx}></div>;
              // Find events for this date (robust day extraction)
              const eventsForDate = events.filter(ev => {
                const match = ev.date.match(/(\d+)/);
                if (!match) return false;
                const day = Number(match[1]);
                const [ , monthStr, yearStr ] = ev.date.split(' ');
                const mIdx = months.indexOf(monthStr);
                const evDate = new Date(Number(yearStr), mIdx, day);
                return evDate.toDateString() === date.toDateString();
              });
              const isEvent = eventsForDate.length > 0;
              return (
                <button
                  key={idx}
                  className={`h-16 w-full rounded-lg border flex flex-col items-start justify-start p-1 text-sm font-medium transition
                    ${isEvent ? "bg-blue-100 border-blue-400 text-blue-900" : "bg-white border-gray-200 text-gray-700"}`}
                  onClick={() => setSelectedDate(date)}
                >
                  <span className="font-bold">{date.getDate()}</span>
                  {isEvent && (
                    <span className="flex gap-1 mt-2">
                      {eventsForDate.slice(0,3).map(ev => (
                        <span key={ev.id} className="inline-block w-2 h-2 rounded-full bg-blue-900"></span>
                      ))}
                      {eventsForDate.length > 3 && (
                        <span className="text-[10px] text-blue-900 ml-1">+{eventsForDate.length - 3}</span>
                      )}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
        {/* Events for selected date (right) */}
        <div className="w-full flex-1">
          <h3 className="text-xl font-semibold mb-4 text-blue-900">
            Events on {selectedDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </h3>
          <div className="space-y-3">
            {(() => {
              const eventsForSelected = events.filter(ev => {
                const match = ev.date.match(/(\d+)/);
                if (!match) return false;
                const day = Number(match[1]);
                const [ , monthStr, yearStr ] = ev.date.split(' ');
                const mIdx = months.indexOf(monthStr);
                const evDate = new Date(Number(yearStr), mIdx, day);
                return evDate.toDateString() === selectedDate.toDateString();
              });
              if (eventsForSelected.length === 0) {
                return <div className="text-gray-500">No events for this date.</div>;
              }
              return (
                <>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {eventsForSelected.map(ev => (
                      <button
                        key={ev.id}
                        className={`px-3 py-1 rounded-full border text-sm font-medium transition-colors
                          ${selectedEventId === ev.id ? "bg-blue-900 text-white border-blue-900" : "bg-blue-50 text-blue-900 border-blue-200"}`}
                        onClick={() => setSelectedEventId(ev.id)}
                      >
                        {ev.title.length > 18 ? ev.title.slice(0, 15) + "..." : ev.title}
                      </button>
                    ))}
                  </div>
                  {/* Event details for selected tab */}
                  {(() => {
                    const event = eventsForSelected.find(ev => ev.id === selectedEventId) || eventsForSelected[0];
                    return (
                      <div className="bg-white rounded-lg shadow p-6 border border-blue-100">
                        <h4 className="text-2xl font-bold mb-2 text-blue-900">{event.title}</h4>
                        <img src={event.posterUrl} alt={event.title} className="w-full h-48 object-cover rounded mb-4" />
                        <div className="mb-2 text-gray-700"><strong>Date:</strong> {event.date}</div>
                        <div className="mb-2 text-gray-700"><strong>Time:</strong> {event.time}</div>
                        <div className="mb-2 text-gray-700"><strong>Venue:</strong> {event.venue}</div>
                        {event.speaker && <div className="mb-2 text-gray-700"><strong>Speaker:</strong> {event.speaker}</div>}
                        <div className="mb-2 text-gray-700"><strong>Category:</strong> {event.category}</div>
                        <button
                          className="mt-4 bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 flex items-center"
                          onClick={() => window.open(generateGoogleCalendarUrl(event), '_blank')}
                        >
                          Add to Calendar
                        </button>
                      </div>
                    );
                  })()}
                </>
              );
            })()}
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-blue-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-sm opacity-75">
              © 2025 Birla Institute of Technology and Science, Pilani. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
