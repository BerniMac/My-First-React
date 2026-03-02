import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ShieldCheck,
  User,
  Plus,
  Home,
  ChevronRight,
  Clock,
  Calendar,
  Loader2,
  X
} from 'lucide-react';
import jordanImg from './assets/image/jordan-1.jpg';
import yeezyImg from './assets/image/yeezy-350.jpg';
import dunkImg from './assets/image/low-dunk.jpg';


const API_BASE_URL = 'http://localhost/SoleCare1/my-kicks-app/api/';

//here we i am using array destructors
const App = () => {
  //the value on the left side inside the bracket[] is the current value 
  //setter function on the right side inside the bracket [] updates the value
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [orders, setOrders] = useState([]);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form States
  const [loginData, setLoginData] = useState({ name: '', phone: '' });
  const [bookingData, setBookingData] = useState({
    brand: 'Jordan',
    service: 'Standard',
    date: '',
    time: '09:00'
  });

  
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.tailwindcss.com";
    document.head.appendChild(script);
  }, []);

  
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      
      const params = new URLSearchParams();
      params.append('name', loginData.name);
      params.append('phone', loginData.phone);

      const response = await fetch(`${API_BASE_URL}login.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params
      });

      const data = await response.json();
      if (data.status === 'success') {
        
        setUser(data.user);
        fetchOrders(data.user.id);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Connection Failed. 1. Check if XAMPP is running. 2. Ensure config.php has CORS headers.");
    } finally {
      setLoading(false);
    }
  };


  const fetchOrders = async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}get_orders.php?user_id=${userId}`);
      const data = await response.json();
      if (data.status === 'success') {
        setOrders(data.data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('user_id', user.id);
      params.append('brand', bookingData.brand);
      params.append('service', bookingData.service);
      params.append('date', bookingData.date);
      params.append('time', bookingData.time);

      const response = await fetch(`${API_BASE_URL}create_booking.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params
      });
      const data = await response.json();

      if (data.status === 'success') {
        alert("Booking Confirmed!");
        setIsBookingOpen(false);
        fetchOrders(user.id);
        setActiveTab('passport');
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Error submitting booking. Check PHP logs.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 font-sans">
        <style>{`
          .animate-in { animation: fadeIn 0.5s ease-out forwards; }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        `}</style>
        <div className="w-full max-w-sm text-center space-y-8 animate-in">
          <div className="animate-bounce">
            <Sparkles className="w-16 h-16 text-emerald-400 mx-auto" />
          </div>
          <div className="space-y-2">
            <h1 className="text-5xl font-black tracking-tighter italic uppercase">Sole_Care</h1>
            <p className="text-neutral-500 font-medium tracking-wide">Premium Sneaker Maintenance</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-4 rounded-2xl bg-neutral-900 border border-neutral-800 text-white outline-none focus:ring-2 focus:ring-emerald-500 transition"
              value={loginData.name}
              onChange={(e) => setLoginData({ ...loginData, name: e.target.value })}
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full p-4 rounded-2xl bg-neutral-900 border border-neutral-800 text-white outline-none focus:ring-2 focus:ring-emerald-500 transition"
              value={loginData.phone}
              onChange={(e) => setLoginData({ ...loginData, phone: e.target.value })}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black py-4 rounded-2xl transition-all flex justify-center items-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" /> : 'ENTER THE VAULT'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24 font-sans max-w-md mx-auto shadow-2xl relative border-x border-gray-200">
      <header className="p-6 bg-white sticky top-0 z-20 flex justify-between items-center border-b border-gray-100">
        <div>
          <h2 className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Active Member</h2>
          <p className="text-xl font-black tracking-tight italic">Hello, {user.name.split(' ')[0]}</p>
        </div>
        <div className="w-12 h-12 bg-neutral-900 rounded-2xl flex items-center justify-center">
          <User className="text-emerald-400 w-5 h-5" />
        </div>
      </header>

      <main className="p-6">
        {activeTab === 'home' ? (
          <div className="space-y-8 animate-in">
            <div className="bg-neutral-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-emerald-900/20">
              <div className="relative z-10">
                <h3 className="text-4xl font-black italic mb-2 leading-none">RESTORE<br />THE GLORY.</h3>
                <p className="text-neutral-400 text-sm mb-8 font-medium">Professional grade maintenance for your rotation.</p>
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="bg-emerald-500 text-black px-8 py-4 rounded-2xl font-black flex items-center gap-2 hover:scale-105 transition"
                >
                  Book Service <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              <Sparkles className="absolute -right-8 -bottom-8 w-48 h-48 text-emerald-500/10 rotate-12" />
            </div>

            {

              /*  <section>
                 <h3 className="font-black text-lg tracking-tight mb-4 uppercase">The Laboratory</h3>
                 <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                   {['Jordan 1', 'Yeezy 350', 'Dunk Low'].map((shoe, i) => (
                     <div key={i} className="min-w-[200px] bg-white rounded-[2rem] border border-gray-100 p-5 shadow-sm">
                       <div className="h-24 bg-neutral-100 rounded-2xl mb-4 flex items-center justify-center">
                         <Sparkles className="text-neutral-300" />
                       </div>
                       <p className="font-black text-sm uppercase tracking-tight">{shoe}</p>
                       <p className="text-xs text-neutral-400 font-bold">Standard Care</p>
                     </div>
                   ))}
                 </div>
               </section>
                */

              <section>
                <h3 className="font-black text-lg tracking-tight mb-4 uppercase">The Laboratory</h3>

                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                  {}
                  {[
                    {
                      name: 'Jordan 1',
                      image: jordanImg 
                    },
                    {
                      name: 'Yeezy 350',
                      image: yeezyImg
                    },
                    {
                      name: 'Dunk Low',
                      image: dunkImg
                    }
                  ].map((shoe, i) => (
                    <div key={i} className="min-w-[200px] bg-white rounded-[2rem] border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer">

                      {}
                      {}
                      <div className="h-24 bg-neutral-100 rounded-2xl mb-4 flex items-center justify-center relative overflow-hidden">

                        {}
                        <img
                          src={shoe.image}
                          alt={shoe.name}
                          className="w-full h-full object-cover"
                        />

                      </div>

                      <p className="font-black text-sm uppercase tracking-tight">{shoe.name}</p>
                      <p className="text-xs text-neutral-400 font-bold">Standard Care</p>
                    </div>
                  ))}
                </div>
              </section>

            }
          </div>
        ) : (
          <div className="space-y-6 animate-in">
            <h3 className="font-black text-2xl tracking-tighter italic uppercase">The Vault</h3>
            {orders.length === 0 ? (
              <div className="py-24 text-center border-2 border-dashed border-gray-100 rounded-[3rem] bg-white">
                <Clock className="w-12 h-12 text-neutral-200 mx-auto" />
                <p className="text-neutral-400 font-bold text-sm tracking-widest mt-2 uppercase">No Assets Tracked</p>
                <button onClick={() => setIsBookingOpen(true)} className="text-emerald-500 font-black text-xs mt-2">BOOK FIRST SERVICE</button>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white p-5 rounded-[2rem] border border-gray-100 flex justify-between items-center shadow-sm">
                    <div className="flex gap-4 items-center">
                      <div className="w-12 h-12 bg-neutral-50 rounded-xl flex items-center justify-center">👟</div>
                      <div>
                        <h4 className="font-black uppercase text-sm tracking-tight">{order.shoe_brand}</h4>
                        <p className="text-[10px] text-neutral-400 font-bold uppercase">{order.service_type} • {order.pickup_date}</p>
                        {order.technician_notes && (
                          <p className="text-[9px] text-emerald-600 font-medium italic mt-1">Note: {order.technician_notes}</p>
                        )}
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 border border-emerald-100">
                      {order.status || 'Pending'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/90 backdrop-blur-md border-t border-gray-100 px-10 py-5 flex justify-between items-center z-30 rounded-t-[2.5rem] shadow-2xl">
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-black' : 'text-neutral-300'}`}>
          <Home className="w-6 h-6" />
          <span className="text-[9px] font-black tracking-widest">HOME</span>
        </button>
        <button
          onClick={() => setIsBookingOpen(true)}
          className="bg-black text-emerald-400 w-14 h-14 rounded-2xl flex items-center justify-center -mt-14 shadow-2xl border-4 border-white active:scale-90 transition-all"
        >
          <Plus className="w-8 h-8" />
        </button>
        <button onClick={() => setActiveTab('passport')} className={`flex flex-col items-center gap-1 ${activeTab === 'passport' ? 'text-black' : 'text-neutral-300'}`}>
          <ShieldCheck className="w-6 h-6" />
          <span className="text-[9px] font-black tracking-widest">VAULT</span>
        </button>
      </nav>

      {isBookingOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end animate-in">
          <div className="bg-white w-full max-w-md mx-auto rounded-t-[3.5rem] p-10 space-y-8 shadow-2xl">
            <div className="flex justify-between items-center">
              <h3 className="text-3xl font-black italic tracking-tighter uppercase">Reserve Care</h3>
              <button onClick={() => setIsBookingOpen(false)} className="text-neutral-400 bg-neutral-100 w-10 h-10 rounded-full flex items-center justify-center">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleBooking} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-neutral-400 ml-2 uppercase">Brand</label>
                  <select
                    className="w-full p-4 bg-neutral-50 rounded-2xl font-black text-sm outline-none border-2 border-transparent focus:border-emerald-500 transition"
                    value={bookingData.brand}
                    onChange={(e) => setBookingData({ ...bookingData, brand: e.target.value })}
                  >
                    <option>Jordan</option>
                    <option>Nike</option>
                    <option>Yeezy</option>
                    <option>Reebok</option>
                    <option>New Balance</option>
                    <option>Vans</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-neutral-400 ml-2 uppercase">Service</label>
                  <select
                    className="w-full p-4 bg-neutral-50 rounded-2xl font-black text-sm outline-none border-2 border-transparent focus:border-emerald-500 transition"
                    value={bookingData.service}
                    onChange={(e) => setBookingData({ ...bookingData, service: e.target.value })}
                  >
                    <option value="Standard">Standard Clean</option>
                    <option value="Deep">Deep Revival</option>
                    <option value="Restoration">Restoration</option>
                    <option value="Exterior clean">exterior clean</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black text-neutral-400 ml-2 uppercase">Collection Date</label>
                <input
                  type="date"
                  className="w-full p-4 bg-neutral-50 rounded-2xl font-black text-sm outline-none border-2 border-transparent focus:border-emerald-500 transition"
                  onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-emerald-400 font-black py-6 rounded-2xl shadow-2xl flex justify-center items-center gap-3 active:scale-95 transition-all"
              >
                {loading ? <Loader2 className="animate-spin" /> : 'CONFIRM SERVICE'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;