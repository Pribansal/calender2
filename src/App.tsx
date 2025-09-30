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
      title: "Bridging the AI Gap: From Tools to Implementation",
      date: "16th September 2025",
      time: "6:00 PM to 7:00 PM",
      venue: "Virtual Webinar",
      speaker: "Mr. Ramesh Pattnaik, VP Sales & BD, PMI Pune Chapter",
      posterUrl: eventImage1,
      category: "Kaleidoscope Webinar Series",
      startDateTime: "20250916T180000Z",
      endDateTime: "20250916T190000Z"
    },
    {
      id: 8,
      title: "AI Ethics Panel Discussion",
      date: "16th September 2025",
      time: "8:00 PM to 9:00 PM",
      venue: "Main Auditorium",
      speaker: "Dr. Anita Rao, Ethics Expert",
      posterUrl: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Panel Discussion",
      startDateTime: "20250916T200000Z",
      endDateTime: "20250916T210000Z"
    },
    {
      id: 9,
      title: "AI Student Meetup",
      date: "16th September 2025",
      time: "4:00 PM to 5:00 PM",
      venue: "Cafeteria",
      speaker: "Student Organizers",
      posterUrl: "https://images.pexels.com/photos/1707828/pexels-photo-1707828.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Networking",
      startDateTime: "20250916T160000Z",
      endDateTime: "20250916T170000Z"
    },
    {
      id: 2,
      title: "Digital Marketing Trends 2025",
      date: "22nd September 2025",
      time: "3:00 PM to 4:30 PM",
      venue: "Auditorium Hall A",
      speaker: "Dr. Sarah Chen, Digital Marketing Expert",
      posterUrl: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Industry Connect Series",
      startDateTime: "20250922T150000Z",
      endDateTime: "20250922T163000Z"
    },
    {
      id: 3,
      title: "Sustainable Business Practices Workshop",
      date: "28th September 2025",
      time: "10:00 AM to 12:00 PM",
      venue: "Conference Room B",
      speaker: "Prof. Michael Rodriguez, Sustainability Expert",
      posterUrl: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Professional Development",
      startDateTime: "20250928T100000Z",
      endDateTime: "20250928T120000Z"
    },
    {
      id: 4,
      title: "Career Guidance Session",
      date: "30th September 2025",
      time: "2:00 PM to 4:00 PM",
      venue: "Main Auditorium",
      speaker: "Industry Panel of Experts",
      posterUrl: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Student Development",
      startDateTime: "20250930T140000Z",
      endDateTime: "20250930T160000Z"
    },
    // Custom demo events
    {
      id: 5,
      title: "Startup Pitch Night",
      date: "3rd October 2025",
      time: "7:00 PM to 9:00 PM",
      venue: "Innovation Lab",
      speaker: "Panel of Investors",
      posterUrl: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Entrepreneurship",
      startDateTime: "20251003T190000Z",
      endDateTime: "20251003T210000Z"
    },
    {
      id: 6,
      title: "Alumni Networking Mixer",
      date: "10th October 2025",
      time: "5:00 PM to 7:00 PM",
      venue: "Cafeteria",
      speaker: "Alumni Guests",
      posterUrl: "https://images.pexels.com/photos/1707828/pexels-photo-1707828.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Networking",
      startDateTime: "20251010T170000Z",
      endDateTime: "20251010T190000Z"
    },
    {
      id: 7,
      title: "Research Symposium",
      date: "15th October 2025",
      time: "9:00 AM to 5:00 PM",
      venue: "Main Hall",
      speaker: "Faculty & Students",
      posterUrl: "https://images.pexels.com/photos/256401/pexels-photo-256401.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Academics",
      startDateTime: "20251015T090000Z",
      endDateTime: "20251015T170000Z"
    }
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