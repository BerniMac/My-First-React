import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  User,
  History,
  Sparkles,
  ArrowRight,
  X,
  Instagram,
  Twitter,
  Facebook,
  Star,
  Clock
} from 'lucide-react';

// --- PHP Backend Configuration ---
const API_BASE_URL = 'http://localhost/solecare1/my-kicks-app/api/';

// --- Global CSS Styles ---
const GlobalStyles = () => (
  <style>{`
    :root {
      --emerald: #10b981;
      --neutral-900: #171717;
      --neutral-800: #262626;
      --neutral-700: #404040;
      --neutral-400: #a3a3a3;
    }
    * { box-sizing: border-box; }
    body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #fff; color: #171717; }
    
    .screen-container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
    .btn { cursor: pointer; border: none; font-weight: bold; border-radius: 12px; transition: all 0.2s; display: inline-flex; align-items: center; justify-content: center; text-decoration: none; }
    .btn-primary { background: var(--emerald); color: #000; padding: 1rem 1.5rem; }
    .btn-primary:hover { background: #34d399; }
    .btn-black { background: #000; color: #fff; padding: 1rem 1.5rem; }
    
    .input-field { width: 100%; background: #262626; border: 1px solid #404040; border-radius: 12px; padding: 1rem; color: #fff; outline: none; }
    .input-field:focus { border-color: var(--emerald); }

    .card { background: #fff; border: 1px solid #e5e5e5; border-radius: 24px; overflow: hidden; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); }
    .hero-banner { background: var(--neutral-900); color: #fff; border-radius: 32px; padding: 3rem; position: relative; overflow: hidden; display: flex; align-items: center; justify-content: space-between; }
    
    .grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
    .navbar { position: sticky; top: 0; background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(12px); border-bottom: 1px solid #f0f0f0; z-index: 100; height: 80px; }
    
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    .animate-in { animation: fadeIn 0.5s ease forwards; }

    @media (max-width: 768px) {
      .hero-banner { flex-direction: column; padding: 2rem; }
      .mobile-hide { display: none; }
      .mobile-sticky-btn { position: fixed; bottom: 1.5rem; left: 50%; transform: translateX(-50%); width: 90%; z-index: 100; }
    }
  `}</style>
);

const AuthScreen = ({ onLogin }) => {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  // Directly handle login without OTP verification
  const handleVerify = () => {
    if (!phone || !name) return;
    setLoading(true);
    onLogin(
      { name, phone },
      () => setLoading(false)
    );
  };

  return (
    <div style={{ minHeight: '100vh', background: '#171717', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
      <div style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        <Sparkles style={{ width: '64px', height: '64px', color: '#10b981', margin: '0 auto 1rem auto' }} />
        <h1 style={{ fontSize: '2.5rem', margin: '0 0 0.5rem 0' }}>SoleCare</h1>
        <p style={{ color: '#a3a3a3', marginBottom: '2rem' }}>Premium Shoe Maintenance</p>

        <div className="animate-in" style={{ textAlign: 'left' }}>
          <label style={{ fontSize: '0.875rem', marginBottom: '0.5rem', display: 'block' }}>Full Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input-field" placeholder="Jordan Carter" style={{ marginBottom: '1rem' }} />
          <label style={{ fontSize: '0.875rem', marginBottom: '0.5rem', display: 'block' }}>Phone Number</label>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="input-field" placeholder="+27 0000000000" style={{ marginBottom: '2rem' }} />
          <button onClick={handleVerify} disabled={!name || !phone || loading} className="btn btn-primary" style={{ width: '100%' }}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ... (HomeFeed, BookingFlow, and PassportSection components remain exactly the same) ...

const HomeFeed = ({ onViewService }) => {
  const transformations = [
  { 
    id: 1, 
    title: 'Jordan 1 Chicago', 
    type: 'Restoration', 
    before: 'src/assets/image/low-dunk.jpg', // <-- Points to your public/images folder
    after: 'src/assets/image/low-dunk.jpg'    // <-- Points to your public/images folder
  },
  // ...
];
    /*
    for future improvements connect this to your PHP backend so you can upload
     these images directly from a web page instead of editing the code every time?
    */

  //const transformations = [
   // { id: 1, title: 'Jordan 1 Chicago', type: 'Restoration', before: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80', after: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&q=80' },
    //{ id: 2, title: 'Luxury Suede', type: 'Deep Clean', before: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&q=80', after: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&q=80' },
  //];

  return (
    <div className="screen-container animate-in" style={{ padding: '2rem 1rem' }}>
      <div className="hero-banner">
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '600px' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: '900', margin: '0 0 1rem 0', lineHeight: 1 }}>Your Kicks, <span style={{ color: '#10b981' }}>Better Than New.</span></h2>
          <p style={{ color: '#a3a3a3', fontSize: '1.125rem', marginBottom: '2rem' }}>Premium cleaning, restoration, and digital tracking.</p>
          <button onClick={onViewService} className="btn btn-primary" style={{ fontSize: '1.125rem', padding: '1rem 2rem' }}>
            Schedule a Pickup <ArrowRight style={{ marginLeft: '0.5rem' }} />
          </button>
        </div>
        <img src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400" alt="Sneakers" className="mobile-hide" style={{ width: '300px', borderRadius: '24px', transform: 'rotate(6deg)' }} />
      </div>

      <div style={{ marginTop: '4rem' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>The Transformation Gallery</h3>
        <div className="grid-3">
          {transformations.map(item => (
            <div key={item.id} className="card">
              <div style={{ display: 'flex', height: '240px', borderBottom: '1px solid #f0f0f0' }}>
                <div style={{ flex: 1, position: 'relative' }}><img src={item.before} alt="before" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /><span style={{ position: 'absolute', bottom: 8, left: 8, background: 'rgba(0,0,0,0.5)', color: '#fff', fontSize: '10px', padding: '2px 6px', borderRadius: '4px' }}>BEFORE</span></div>
                <div style={{ flex: 1, position: 'relative' }}><img src={item.after} alt="after" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /><span style={{ position: 'absolute', bottom: 8, right: 8, background: '#10b981', color: '#fff', fontSize: '10px', padding: '2px 6px', borderRadius: '4px' }}>AFTER</span></div>
              </div>
              <div style={{ padding: '1.5rem' }}>
                <h4 style={{ margin: '0 0 0.25rem 0' }}>{item.title}</h4>
                <p style={{ color: '#a3a3a3', margin: 0, fontSize: '0.875rem' }}>{item.type}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      <div style={{ marginTop: '5rem', marginBottom: '3rem' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '2rem', textAlign: 'center' }}>Recent Client Reviews</h3>
        <div className="grid-3">
          {[
            { id: 1, name: 'Marcus T.', rating: 5, text: 'Brought my beat-up Travis Scotts back to life. Unbelievable work!' },
            { id: 2, name: 'Sarah J.', rating: 5, text: 'The Downtown Hub pickup was so easy. Shoes look brand new.' },
            { id: 3, name: 'David L.', rating: 4, text: 'Great deep clean service. Highly recommend the restoration package.' }
          ].map(review => (
            <div key={review.id} className="card" style={{ padding: '1.5rem', background: '#fafafa' }}>
              <div style={{ display: 'flex', gap: '4px', marginBottom: '1rem', color: '#10b981' }}>
                {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p style={{ fontStyle: 'italic', marginBottom: '1rem', color: '#404040' }}>"{review.text}"</p>
              <p style={{ fontWeight: 'bold', fontSize: '0.875rem' }}>- {review.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Social Media Footer */}
      <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '3rem', paddingBottom: '2rem', textAlign: 'center' }}>
        <h4 style={{ marginBottom: '1.5rem', fontWeight: 'bold' }}>Follow the Process</h4>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
          <a href="https://instagram.com/lt_colonel_isheanesu" target="_blank" rel="noreferrer" style={{ color: '#171717', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#10b981'} onMouseOut={(e) => e.currentTarget.style.color = '#171717'}><Instagram size={28} /></a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" style={{ color: '#171717', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#10b981'} onMouseOut={(e) => e.currentTarget.style.color = '#171717'}><Twitter size={28} /></a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" style={{ color: '#171717', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#10b981'} onMouseOut={(e) => e.currentTarget.style.color = '#171717'}><Facebook size={28} /></a>
        </div>
      </div>
    </div>
  );
};

const BookingFlow = ({ user, onClose, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ brand: '', service: '', date: '', location: 'Downtown Hub' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBook = async () => {
    setIsSubmitting(true);
    try {
      const params = new URLSearchParams();
      params.append('user_id', user.id);
      params.append('brand', formData.brand);
      params.append('service', formData.service);
      params.append('date', formData.date);
      params.append('location', formData.location);

      const response = await fetch(`${API_BASE_URL}create_booking.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params
      });

      const data = await response.json();

      if (data.status === 'success') {
        onSuccess();
      } else {
        alert("Booking failed: " + data.message);
      }
    } catch (e) {
      alert("Error submitting booking to server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div className="animate-in" style={{ background: '#fff', width: '100%', maxWidth: '600px', borderRadius: '32px', overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0 }}>Reserve Service</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X /></button>
        </div>
        <div style={{ padding: '2rem' }}>
          {step === 1 && (
            <div className="grid-3">
              {['Nike', 'Yeezy', 'Gucci', 'Jordan'].map(b => (
                <button key={b} onClick={() => { setFormData({ ...formData, brand: b }); setStep(2); }} className="btn" style={{ background: '#f8f8f8', padding: '1.5rem', border: '2px solid transparent' }}>{b}</button>
              ))}
            </div>
          )}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { t: 'Standard', p: 150 }, // Suggested adjustment from 35
                { t: 'Deep Clean', p: 250 } // Suggested adjustment from 55
              ].map(s => (
                <button
                  key={s.t}
                  onClick={() => { setFormData({ ...formData, service: s.t }); setStep(3); }}
                  className="btn"
                  style={{
                    background: '#f8f8f8',
                    padding: '1.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span>{s.t}</span>
                  <b>R{s.p}</b>
                </button>
              ))}
            </div>
            //  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            //  {[{t: 'Standard', p: 35}, {t: 'Deep Clean', p: 55}].map(s => (
            //  <button key={s.t} onClick={() => {setFormData({...formData, service: s.t}); setStep(3);}} className="btn" style={{ background: '#f8f8f8', padding: '1.5rem', justifyContent: 'space-between' }}>
            //  <span>{s.t}</span><b>R{s.p}</b>
            //</button>
            //))}
            //</div>
          )}
          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#404040', marginBottom: '0.5rem', display: 'block' }}>Select Date</label>
                <input type="date" style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #e5e5e5' }} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
              </div>

              {/* Location Dropdown */}
              <div>
                <label style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#404040', marginBottom: '0.5rem', display: 'block' }}>Pickup / Delivery Location</label>
                <select
                  style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #e5e5e5', backgroundColor: '#fff', outline: 'none', cursor: 'pointer' }}
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                >
                  <option value="Downtown Hub">district 6 campus  (district 6)</option>
                  <option value="Westside Dropoff">mowbray campus  (mowbray)</option>
                  <option value="Mail-In Service">bellville campus </option>
                  <option value="Home Delivery">Home Delivery (+ R30)</option>
                </select>
              </div>

              <button onClick={handleBook} disabled={isSubmitting} className="btn btn-black" style={{ padding: '1.25rem', marginTop: '1rem' }}>{isSubmitting ? 'Confirming...' : 'Complete Booking'}</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const PassportSection = ({ user }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}get_orders.php?user_id=${user.id}`);
        const data = await response.json();
        if (data.status === 'success') {
          setOrders(data.data);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <div className="screen-container animate-in" style={{ padding: '3rem 1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
        <ShieldCheck style={{ color: '#10b981' }} />
        <h2 style={{ fontSize: '2rem', margin: 0 }}>Digital Vault</h2>
      </div>
      <div className="grid-3">
        {orders.length === 0 ? (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', background: '#fafafa', borderRadius: '24px', border: '2px dashed #eee' }}>
            <History style={{ color: '#ccc', marginBottom: '1rem' }} />
            <p style={{ color: '#a3a3a3' }}>No assets tracked yet.</p>
          </div>
        ) : (
          orders.map(order => (
            <div key={order.id} className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>

              {/* Order Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h4 style={{ margin: '0 0 0.25rem 0', textTransform: 'capitalize', fontSize: '1.25rem' }}>{order.shoe_brand || order.brand}</h4>
                  <p style={{ fontSize: '0.875rem', color: '#a3a3a3', margin: '0 0 0.5rem 0' }}>{order.service_type || order.service}</p>
                  <span style={{ fontSize: '10px', background: '#ecfdf5', color: '#059669', padding: '4px 8px', borderRadius: '12px', fontWeight: 'bold', display: 'inline-block', marginBottom: '0.5rem' }}>
                    {order.status || 'Pending'}
                  </span>
                  {order.location && <p style={{ fontSize: '0.75rem', color: '#737373', fontStyle: 'italic', margin: 0 }}>📍 {order.location}</p>}
                </div>
              </div>

              {/* Technician Notes */}
              {order.technician_notes && (
                <div style={{ background: '#fafafa', padding: '0.75rem', borderRadius: '12px', border: '1px solid #f0f0f0' }}>
                  <p style={{ fontSize: '0.65rem', color: '#a3a3a3', fontWeight: 'bold', textTransform: 'uppercase', margin: '0 0 0.25rem 0' }}>Tech Notes</p>
                  <p style={{ fontSize: '0.875rem', color: '#404040', margin: 0, fontStyle: 'italic' }}>"{order.technician_notes}"</p>
                </div>
              )}

              {/* Photo Proof Gallery */}

              {(order.before_photo_url || order.after_photo_url) && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.5rem' }}>
                  {order.before_photo_url && (
                    <div style={{ position: 'relative', height: '120px', borderRadius: '12px', overflow: 'hidden', background: '#f5f5f5' }}>
                      <img src={order.before_photo_url} alt="Before" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', bottom: '8px', left: '8px', background: 'rgba(0,0,0,0.7)', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold', color: 'white', backdropFilter: 'blur(4px)' }}>BEFORE</div>
                    </div>
                  )}
                  {order.after_photo_url ? (
                    <div style={{ position: 'relative', height: '120px', borderRadius: '12px', overflow: 'hidden', background: '#f5f5f5' }}>
                      <img src={order.after_photo_url} alt="After" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', bottom: '8px', left: '8px', background: '#10b981', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold', color: 'black' }}>AFTER</div>
                    </div>
                  ) : (
                    <div style={{ height: '120px', borderRadius: '12px', border: '2px dashed #e5e5e5', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#a3a3a3' }}>
                      <Clock size={20} style={{ marginBottom: '4px', opacity: 0.5 }} />
                      <span style={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}>Awaiting After</span>
                    </div>
                  )}
                </div>
              )}

            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [showBooking, setShowBooking] = useState(false);

  // UPDATED: Now sends just name and phone to the PHP login.php script
  const handleLogin = async (userData, stopLoadingCallback) => {
    try {
      const params = new URLSearchParams();
      params.append('name', userData.name);
      params.append('phone', userData.phone);

      const response = await fetch(`${API_BASE_URL}login.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params
      });

      const data = await response.json();
      if (data.status === 'success') {
        setUser(data.user);
      } else {
        alert(data.message);
        if (stopLoadingCallback) stopLoadingCallback();
      }
    } catch (error) {
      alert("Connection Failed. Make sure PHP server is running.");
      if (stopLoadingCallback) stopLoadingCallback();
    }
  };

  if (!user) return <><GlobalStyles /><AuthScreen onLogin={handleLogin} /></>;

  return (
    <div style={{ paddingBottom: '5rem' }}>
      <GlobalStyles />
      <nav className="navbar">
        <div className="screen-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }} onClick={() => setActiveTab('home')}>
            <Sparkles style={{ color: '#10b981' }} />
            <span style={{ fontSize: '1.5rem', fontWeight: '900', letterSpacing: '-1px' }}>KicksCare</span>
          </div>
          <div className="mobile-hide" style={{ display: 'flex', gap: '2rem' }}>
            <button onClick={() => setActiveTab('home')} className="btn" style={{ background: 'none', color: activeTab === 'home' ? '#000' : '#a3a3a3' }}>HOME</button>
            <button onClick={() => setActiveTab('passport')} className="btn" style={{ background: 'none', color: activeTab === 'passport' ? '#000' : '#a3a3a3' }}>VAULT</button>
            <button onClick={() => setShowBooking(true)} className="btn btn-black">BOOK SERVICE</button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 'bold' }} className="mobile-hide">{user.name.split(' ')[0]}</span>
            <div style={{ width: '40px', height: '40px', background: '#f0f0f0', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center' }}>
              <User style={{ width: '20px', color: '#a3a3a3' }} />
            </div>
          </div>
        </div>
      </nav>

      <main>
        {activeTab === 'home' && <HomeFeed onViewService={() => setShowBooking(true)} />}
        {activeTab === 'passport' && <PassportSection user={user} />}
      </main>

      {showBooking && <BookingFlow user={user} onClose={() => setShowBooking(false)} onSuccess={() => { setShowBooking(false); setActiveTab('passport'); }} />}

      <div className="mobile-sticky-btn">
        <button onClick={() => setShowBooking(true)} className="btn btn-black" style={{ width: '100%', padding: '1.25rem', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}>
          <Sparkles style={{ width: '18px', height: '18px', marginRight: '8px', color: '#10b981' }} /> Book Premium Care
        </button>
      </div>
    </div>
  );
}