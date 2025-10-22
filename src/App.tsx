import { useState, useMemo, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, MapPin, Clock, Mic, Tag, Link, Info } from 'lucide-react';

// --- Placeholder Constants ---
// Placeholder for the event poster image
const PLACEHOLDER_POSTER_URL = "https://placehold.co/400x300/1e3a8a/ffffff?text=Event+Poster";
// Placeholder for the main header image (replacing the inaccessible video)
const PLACEHOLDER_BANNER_URL = "https://placehold.co/1200x400/0c4a6e/e0f2f1?text=BITS+Pilani+Department+Calendar";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  venue: string;
  speaker?: string;
  description: string;
  posterUrl: string;
  category: string;
  startDateTime: string; // ISO 8601 string for calendar
  endDateTime: string;   // ISO 8601 string for calendar
}

// Function to generate the Google Calendar URL for adding an event
const generateGoogleCalendarUrl = (event: Event): string => {
  const startDate = new Date(event.startDateTime);
  const endDate = new Date(event.endDateTime);

  // Format dates for Google Calendar (YYYYMMDDTHHMMSSZ)
  const formatDate = (d: Date) => {
    // Note: Google Calendar expects the format without Z if it's local time,
    // but using UTC/Z is safer if the user's timezone is known.
    // For simplicity, we'll use a slightly simplified format without Z and let Google handle the local conversion.
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
  };

  const dates = `${formatDate(startDate)}/${formatDate(endDate)}`;
  const title = encodeURIComponent(event.title);
  const details = encodeURIComponent(event.description);
  const location = encodeURIComponent(event.venue);

  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
};

// Data extracted and structured from the provided CSV file
const INITIAL_EVENTS: Event[] = [
  {
    id: 1,
    title: "Bridging the AI Gap: From Tools to Implementation",
    date: "16th September 2025",
    time: "6:00 PM to 7:00 PM",
    venue: "Virtual Webinar",
    speaker: "Mr. Ramesh Pattnaik, VP Sales & BD, PMI Pune Chapter",
    description: "A deep dive into transitioning from theoretical AI tools to practical, real-world implementation.",
    posterUrl: PLACEHOLDER_POSTER_URL,
    category: "Webinar",
    startDateTime: "2025-09-16T18:00:00",
    endDateTime: "2025-09-16T19:00:00",
  },
  {
    id: 2,
    title: "Resume Building Workshop",
    date: "24th August 2025",
    time: "3:00 PM to 4:00 PM",
    venue: "Virtual",
    speaker: "Arjun Bhatnagar & Sudhanshu Ranjan",
    description: "Learn essential tips and tricks to craft a winning resume that stands out to recruiters.",
    posterUrl: PLACEHOLDER_POSTER_URL,
    category: "Workshop",
    startDateTime: "2025-08-24T15:00:00",
    endDateTime: "2025-08-24T16:00:00",
  },
  {
    id: 3,
    title: "Data Dialouges Unplugged Chap 1",
    date: "28th August 2025",
    time: "5:00 PM to 7:00 PM",
    venue: "Virtual",
    speaker: "Kireeti Kesavamurthy",
    description: "Chapter 1 of a series exploring real-world data challenges and solutions in an informal setting.",
    posterUrl: PLACEHOLDER_POSTER_URL,
    category: "Talk",
    startDateTime: "2025-08-28T17:00:00",
    endDateTime: "2025-08-28T19:00:00",
  },
  {
    id: 4,
    title: "BOSM 2025",
    date: "17th September to 21st September 2025",
    time: "All Day",
    venue: "BITS Pilani Campus",
    speaker: undefined,
    description: "The annual sports festival of BITS Pilani, featuring various indoor and outdoor sports competitions.",
    posterUrl: PLACEHOLDER_POSTER_URL,
    category: "Festival",
    startDateTime: "2025-09-17T00:00:00", // Start of the first day
    endDateTime: "2025-09-21T23:59:59", // End of the last day
  },
  {
    id: 5,
    title: "Mind, Market & Ministries",
    date: "27th September 2025",
    time: "11:30 AM to 1:30 PM",
    venue: "NAB 6163",
    speaker: "Kunal Rahar",
    description: "An insightful session discussing the intersection of human psychology, economic trends, and governance.",
    posterUrl: PLACEHOLDER_POSTER_URL,
    category: "Seminar",
    startDateTime: "2025-09-27T11:30:00",
    endDateTime: "2025-09-27T13:30:00",
  },
  {
    id: 6,
    title: "Study Circle (Product Management)",
    date: "12th October 2025",
    time: "5:00 PM to 7:00 PM",
    venue: "Virtual",
    speaker: "Students",
    description: "A collaborative study session focused on key concepts and case studies in Product Management.",
    posterUrl: PLACEHOLDER_POSTER_URL,
    category: "Study Group",
    startDateTime: "2025-10-12T17:00:00",
    endDateTime: "2025-10-12T19:00:00",
  },
  // Main Festival Event (Interface)
  {
    id: 7,
    title: "Interface - Annual Tech Fest",
    date: "31st October to 2nd November 2025",
    time: "All Day",
    venue: "TBD",
    speaker: undefined,
    description: "The department's premier annual technical festival.",
    posterUrl: PLACEHOLDER_POSTER_URL,
    category: "Festival",
    startDateTime: "2025-10-31T00:00:00",
    endDateTime: "2025-11-02T23:59:59",
  },
  // Sub-events under Interface Fest (31st October - 2nd November)
  {
    id: 8,
    title: "Inkspire",
    date: "31st October to 2nd November 2025",
    time: "All Day",
    venue: "TBD",
    speaker: "Alumini Relations Club",
    description: "A club event hosted by the Alumini Relations Club during the Interface Tech Fest.",
    posterUrl: PLACEHOLDER_POSTER_URL,
    category: "Club Event",
    startDateTime: "2025-10-31T00:00:00",
    endDateTime: "2025-11-02T23:59:59",
  },
  {
    id: 9,
    title: "Enigmatic Enclave",
    date: "31st October to 2nd November 2025",
    time: "All Day",
    venue: "TBD",
    speaker: "Media Relations Club",
    description: "A club event hosted by the Media Relations Club during the Interface Tech Fest.",
    posterUrl: PLACEHOLDER_POSTER_URL,
    category: "Club Event",
    startDateTime: "2025-10-31T00:00:00",
    endDateTime: "2025-11-02T23:59:59",
  },
  {
    id: 10,
    title: "Stock Storm Exchange",
    date: "31st October to 2nd November 2025",
    time: "All Day",
    venue: "TBD",
    speaker: "Finance Club",
    description: "A club event hosted by the Finance Club during the Interface Tech Fest.",
    posterUrl: PLACEHOLDER_POSTER_URL,
    category: "Club Event",
    startDateTime: "2025-10-31T00:00:00",
    endDateTime: "2025-11-02T23:59:59",
  },
  {
    id: 11,
    title: "HR Imperium",
    date: "31st October to 2nd November 2025",
    time: "All Day",
    venue: "TBD",
    speaker: "HR & Sponsorship Club",
    description: "A club event hosted by the HR & Sponsorship Club during the Interface Tech Fest.",
    posterUrl: PLACEHOLDER_POSTER_URL,
    category: "Club Event",
    startDateTime: "2025-10-31T00:00:00",
    endDateTime: "2025-11-02T23:59:59",
  },
  {
    id: 12,
    title: "Cash or Clash",
    date: "31st October to 2nd November 2025",
    time: "All Day",
    venue: "TBD",
    speaker: "Industry Linkage Club",
    description: "A club event hosted by the Industry Linkage Club during the Interface Tech Fest.",
    posterUrl: PLACEHOLDER_POSTER_URL,
    category: "Club Event",
    startDateTime: "2025-10-31T00:00:00",
    endDateTime: "2025-11-02T23:59:59",
  },
  {
    id: 13,
    title: "InnoMun",
    date: "31st October to 2nd November 2025",
    time: "All Day",
    venue: "TBD",
    speaker: "Marketing Club",
    description: "A club event hosted by the Marketing Club during the Interface Tech Fest.",
    posterUrl: PLACEHOLDER_POSTER_URL,
    category: "Club Event",
    startDateTime: "2025-10-31T00:00:00",
    endDateTime: "2025-11-02T23:59:59",
  },
  {
    id: 14,
    title: "Moneyball",
    date: "31st October to 2nd November 2025",
    time: "All Day",
    venue: "TBD",
    speaker: "Operations Club",
    description: "A club event hosted by the Operations Club during the Interface Tech Fest.",
    posterUrl: PLACEHOLDER_POSTER_URL,
    category: "Club Event",
    startDateTime: "2025-10-31T00:00:00",
    endDateTime: "2025-11-02T23:59:59",
  },
  {
    id: 15,
    title: "The Product Paradox",
    date: "31st October to 2nd November 2025",
    time: "All Day",
    venue: "TBD",
    speaker: undefined,
    description: "A club event focused on Product Management challenges during the Interface Tech Fest.",
    posterUrl: PLACEHOLDER_POSTER_URL,
    category: "Club Event",
    startDateTime: "2025-10-31T00:00:00",
    endDateTime: "2025-11-02T23:59:59",
  },
];


const getDaysInMonth = (month: number, year: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (month: number, year: number): number => {
  return new Date(year, month, 1).getDay(); // 0 = Sunday, 1 = Monday...
};

// Helper function to format the selected date for comparison
const formatDateKey = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

function App() {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = useMemo(() => new Date(), []);

  const [calendarMonthIdx, setCalendarMonthIdx] = useState(today.getMonth());
  const [calendarYear, setCalendarYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  // Derived state for the calendar view
  const currentMonthDays = useMemo(() => getDaysInMonth(calendarMonthIdx, calendarYear), [calendarMonthIdx, calendarYear]);
  const firstDay = useMemo(() => getFirstDayOfMonth(calendarMonthIdx, calendarYear), [calendarMonthIdx, calendarYear]);
  const formattedSelectedDateKey = useMemo(() => formatDateKey(selectedDate), [selectedDate]);

  // Map events by date for quick lookup in the calendar grid
  const eventsByDate = useMemo(() => {
    const map = new Map<string, Event[]>();
    INITIAL_EVENTS.forEach(event => {
      const startKey = formatDateKey(new Date(event.startDateTime));
      const endKey = formatDateKey(new Date(event.endDateTime));

      const currentDate = new Date(startKey);
      const endDate = new Date(endKey);

      // Add event for every day it spans
      while (currentDate <= endDate) {
        const key = formatDateKey(currentDate);
        if (!map.has(key)) {
          map.set(key, []);
        }
        map.get(key)!.push(event);

        // Move to the next day
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });
    return map;
  }, []);

  // Filter events for the currently selected date
  const eventsForSelectedDate = useMemo(() => {
    return eventsByDate.get(formattedSelectedDateKey) || [];
  }, [eventsByDate, formattedSelectedDateKey]);


  useEffect(() => {
    if (eventsForSelectedDate.length > 0 && selectedEventId === null) {
      setSelectedEventId(eventsForSelectedDate[0].id);
    } else if (eventsForSelectedDate.length === 0) {
      setSelectedEventId(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventsForSelectedDate]);


  // Calendar navigation handlers
  const handlePrevMonth = () => {
    setCalendarMonthIdx(prev => {
      if (prev === 0) {
        setCalendarYear(y => y - 1);
        return 11;
      }
      return prev - 1;
    });
    setSelectedDate(new Date(calendarYear, calendarMonthIdx - 1, 1));
  };

  const handleNextMonth = () => {
    setCalendarMonthIdx(prev => {
      if (prev === 11) {
        setCalendarYear(y => y + 1);
        return 0;
      }
      return prev + 1;
    });
    setSelectedDate(new Date(calendarYear, calendarMonthIdx + 1, 1));
  };

  // Date cell renderer
  const renderDateCell = (dateNum: number) => {
    const dayDate = new Date(calendarYear, calendarMonthIdx, dateNum);
    const dateKey = formatDateKey(dayDate);
    const isEventDay = eventsByDate.has(dateKey);
    const isSelected = dateKey === formattedSelectedDateKey;
    const isToday = dateKey === formatDateKey(today);

    let baseClasses = "flex flex-col items-center justify-center p-1 md:p-2 aspect-square rounded-lg cursor-pointer transition-all duration-150 relative";
    let eventIndicator = null;

    if (isEventDay) {
      baseClasses += " bg-blue-50 hover:bg-blue-100 text-blue-900 font-semibold";
      eventIndicator = <span className="absolute bottom-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>;
    } else {
      baseClasses += " text-gray-700 hover:bg-gray-100";
    }

    if (isToday) {
      baseClasses += " border-2 border-green-500";
    }

    if (isSelected) {
      baseClasses = baseClasses.replace('bg-blue-50', 'bg-blue-900').replace('hover:bg-blue-100', 'hover:bg-blue-900');
      baseClasses += " bg-blue-900 text-white shadow-lg transform scale-105";
    }

    return (
      <div
        key={dateNum}
        className={baseClasses}
        onClick={() => setSelectedDate(dayDate)}
      >
        <span className="text-lg md:text-xl">{dateNum}</span>
        {eventIndicator}
      </div>
    );
  };

  // Function to create the calendar grid
  const renderCalendarGrid = () => {
    const calendarCells: JSX.Element[] = [];

    // Add empty cells for preceding days of the week
    for (let i = 0; i < firstDay; i++) {
      calendarCells.push(<div key={`empty-${i}`} className="p-2 aspect-square"></div>);
    }

    // Add day cells
    for (let day = 1; day <= currentMonthDays; day++) {
      calendarCells.push(renderDateCell(day));
    }

    return calendarCells;
  };

  const currentEvent = INITIAL_EVENTS.find(e => e.id === selectedEventId);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-blue-900 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Department Calendar
          </h1>
          <div className="flex items-center space-x-2 text-white text-sm">
            <Calendar className="h-5 w-5" />
            <span>BITS Pilani</span>
          </div>
        </div>
      </header>

      {/* Hero Banner (Placeholder for Video) */}
      <div className="relative h-64 md:h-96 w-full overflow-hidden mb-12">
        <img
          src={PLACEHOLDER_BANNER_URL}
          alt="Department Banner Placeholder"
          className="w-full h-full object-cover object-center"
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            (e.target as HTMLImageElement).onerror = null;
            (e.target as HTMLImageElement).src = "https://placehold.co/1200x400/1e3a8a/ffffff?text=Image+Unavailable";
          }}
        />
        <div className="absolute inset-0 bg-blue-900 bg-opacity-60 flex items-center justify-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white text-center p-4">
            Upcoming Events, Workshops, and Seminars
          </h2>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Calendar View (Column 1) */}
          <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-xl shadow-2xl">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <button
                onClick={handlePrevMonth}
                className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-900 transition-colors"
                aria-label="Previous Month"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <h3 className="text-3xl font-extrabold text-blue-900">
                {months[calendarMonthIdx]} {calendarYear}
              </h3>
              <button
                onClick={handleNextMonth}
                className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-900 transition-colors"
                aria-label="Next Month"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center">
              {weekdays.map(day => (
                <div key={day} className="text-sm font-bold text-gray-500 uppercase py-2">
                  {day}
                </div>
              ))}
              {renderCalendarGrid()}
            </div>
          </div>

          {/* Event Details and List (Column 2) */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              {/* Event List for Selected Date */}
              <div className="bg-white p-6 rounded-xl shadow-2xl mb-8">
                <h4 className="text-2xl font-bold text-blue-900 mb-4 flex items-center">
                  <Calendar className="h-6 w-6 mr-2" />
                  Events on {selectedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </h4>

                {eventsForSelectedDate.length === 0 ? (
                  <p className="text-gray-500 flex items-center">
                    <Info className="h-5 w-5 mr-2" />
                    No events scheduled for this date.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {eventsForSelectedDate.map(event => (
                      <div
                        key={event.id}
                        className={`p-3 rounded-lg cursor-pointer transition-colors duration-200 ${selectedEventId === event.id ? 'bg-blue-100 border-l-4 border-blue-900' : 'hover:bg-gray-100'}`}
                        onClick={() => setSelectedEventId(event.id)}
                      >
                        <p className="font-semibold text-blue-800">{event.title}</p>
                        <p className="text-sm text-gray-600 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {event.time}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Detailed Event Information */}
              {currentEvent && (
                <div className="bg-white p-6 rounded-xl shadow-2xl border-t-4 border-blue-600">
                  <h4 className="text-2xl font-bold text-blue-900 mb-4">{currentEvent.title}</h4>
                  <div className="flex flex-col items-center mb-4">
                    <img
                      src={currentEvent.posterUrl}
                      alt={`${currentEvent.title} poster`}
                      className="w-full h-auto max-h-64 object-cover rounded-lg shadow-md"
                      onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                        (e.target as HTMLImageElement).onerror = null;
                        (e.target as HTMLImageElement).src = "https://placehold.co/400x300/1e3a8a/ffffff?text=Image+Unavailable";
                      }}
                    />
                  </div>
                  <p className="text-gray-700 mb-4 text-sm leading-relaxed">{currentEvent.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="text-gray-700 flex items-start">
                      <Calendar className="h-4 w-4 mr-2 mt-0.5 text-blue-600 flex-shrink-0" />
                      <strong>Date:</strong> {currentEvent.date}
                    </div>
                    <div className="text-gray-700 flex items-start">
                      <Clock className="h-4 w-4 mr-2 mt-0.5 text-blue-600 flex-shrink-0" />
                      <strong>Time:</strong> {currentEvent.time}
                    </div>
                    <div className="text-gray-700 flex items-start">
                      <MapPin className="h-4 w-4 mr-2 mt-0.5 text-blue-600 flex-shrink-0" />
                      <strong>Venue:</strong> {currentEvent.venue}
                    </div>
                    {currentEvent.speaker && (
                      <div className="text-gray-700 flex items-start">
                        <Mic className="h-4 w-4 mr-2 mt-0.5 text-blue-600 flex-shrink-0" />
                        <strong>Speaker:</strong> {currentEvent.speaker}
                      </div>
                    )}
                    <div className="text-gray-700 flex items-start">
                      <Tag className="h-4 w-4 mr-2 mt-0.5 text-blue-600 flex-shrink-0" />
                      <strong>Category:</strong> {currentEvent.category}
                    </div>
                  </div>
                  <button
                    className="mt-6 w-full bg-blue-900 hover:bg-blue-800 text-white px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200 flex items-center justify-center shadow-lg hover:shadow-xl"
                    onClick={() => window.open(generateGoogleCalendarUrl(currentEvent), '_blank')}
                  >
                    <Link className="h-4 w-4 mr-2" />
                    Add to Calendar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-blue-900 text-white mt-16 shadow-inner">
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
