import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login'; // החזרנו את הלוגין
import FlightList from './components/FlightList'; 
import PaymentPage from './components/PaymentPage'; 
import FlightDetails from './components/FlightDetails';
import MyBookingsPage from './components/MyBookingsPage';
import ChatBot from './components/ChatBot'; // ייבוא רכיב הצי'אט החדש

// הגדרת טיפוס הנתונים של המשתמש
interface UserDTO {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  role: 'USER' | 'ADMIN';
}

function App() {
  // ניהול הסטייט - האם יש משתמש מחובר במערכת
  const [user, setUser] = useState<UserDTO | null>(null);

  const handleLoginSuccess = (loggedInUser: UserDTO) => {
    setUser(loggedInUser);
  };

  return (
    <Router>
      <div style={{ fontFamily: 'Arial', direction: 'rtl', textAlign: 'center', padding: '20px' }}>
        
        {/* תנאי: אם המשתמש עדיין לא מחובר, הוא יראה אך ורק את דף הלוגין */}
        {!user ? (
          <Login onLoginSuccess={handleLoginSuccess} />
        ) : (
          
          /* המשתמש מחובר בהצלחה! כל שאר האפליקציה נחשפת בפניו */
          <div>
            <h2>מערכת ניהול טיסות ✈️</h2>
            <h3>שלום, {user.firstName} {user.lastName}!</h3>
            
            {/* תפריט ניווט עליון נקי ונוח */}
            <nav style={{ 
              margin: '20px auto', 
              padding: '10px', 
              backgroundColor: '#f8f9fa', 
              borderRadius: '5px', 
              maxWidth: '900px', 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '20px' 
            }}>
              <Link to="/" style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}>✈️ לוח טיסות</Link>
              <Link to="/my-bookings" style={{ textDecoration: 'none', color: '#00adb5', fontWeight: 'bold' }}>🧳 הטיסות שלי</Link>
              {/* כפתור ניווט חדש לצ'אט הבינה המלאכותית */}
              <Link to="/chat" style={{ textDecoration: 'none', color: '#28a745', fontWeight: 'bold' }}>💬 שירות לקוחות AI</Link>
            </nav>
            
            <hr style={{ maxWidth: '900px', margin: '20px auto' }} />

            {/* מערכת הראוטינג המרכזית */}
            <div style={{ 
              backgroundColor: '#ffffff', 
              padding: '20px', 
              margin: '25px auto', 
              maxWidth: '900px', 
              borderRadius: '5px'
            }}>
              <Routes>
                {/* דף הבית מציג את רשימת הטיסות */}
                <Route path="/" element={<FlightList />} />
                
                {/* דף טיסה ספציפית */}
                <Route path="/flights/:id" element={<FlightDetails />} />                
                
                {/* דף התשלום */}
                <Route path="/checkout/:id" element={<PaymentPage />} />

                {/* דף היסטוריית ההזמנות החדש */}
                <Route path="/my-bookings" element={<MyBookingsPage />} />

                {/* דף הצי'אט החדש עם שרת ה-Flask */}
                <Route path="/chat" element={<ChatBot />} />
              </Routes>
            </div>

            {/* כפתור התנתקות קבוע בתחתית לנוחיות המשתמש */}
            <button 
              onClick={() => setUser(null)} 
              style={{ marginTop: '25px', padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              התנתק מהמערכת 🚪
            </button>
          </div>
        )}

      </div>
    </Router>
  );
}

export default App;