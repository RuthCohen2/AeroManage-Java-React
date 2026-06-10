// import React from 'react';
// import { useState } from 'react';
// import Login from './components/Login'; 
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import FlightList from './components/FlightList'; 
// import PaymentPage from './components/PaymentPage'; 
// import FlightDetails from './components/FlightDetails';

// interface UserDTO {
//   id: number;
//   username: string;
//   firstName: string;
//   lastName: string;
//   role: 'USER' | 'ADMIN';
// }

// function App() {
//   const [user, setUser] = useState<UserDTO | null>(null);

//   const handleLoginSuccess = (loggedInUser: UserDTO) => {
//     setUser(loggedInUser);
//   };

//   return (
//     <Router>
//       <div style={{ fontFamily: 'Arial', direction: 'rtl', textAlign: 'center', padding: '20px' }}>
        
//         {/* תנאי 1: אם המשתמש לא מחובר, מציגים רק את הלוגין */}
//         {!user ? (
//           <Login onLoginSuccess={handleLoginSuccess} />
//         ) : (
          
//           /* תנאי 2: המשתמש מחובר! */
//           <div>
//             <h2>שלום, {user.firstName} {user.lastName}!</h2>
//             <p>התפקיד שלך במערכת: <strong>{user.role}</strong></p>
            
//             {/* תפריט ניווט עליון נקי */}
//             <nav style={{ margin: '20px auto', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '5px', maxWidth: '900px' }}>
//               <Link to="/" style={{ margin: '0 10px', textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}>✈️ לוח טיסות</Link>
//             </nav>
//             <hr style={{ maxWidth: '900px', margin: '20px auto' }} />

//             {/* מערכת הראוטינג המרכזית - מציגה ישירות את לוח הטיסות לכולם בלי ריבועים מסיחים */}
//             <div style={{ 
//               backgroundColor: '#ffffff', 
//               padding: '20px', 
//               margin: '25px auto', 
//               maxWidth: '900px', 
//               borderRadius: '5px'
//             }}>
//               <Routes>
//                 {/* דף הבית מציג את רשימת הטיסות לכולם */}
//                 <Route path="/" element={<FlightList />} />
                
//                 {/* דף טיסה ספציפית */}
//                 {/* <Route path="/flights/:id" element={<div style={{color: 'black', padding: '20px'}}>דף טיסה ספציפית</div>} /> */}
//                  <Route path="/flights/:id" element={<FlightDetails />} />                
//                 {/* דף התשלום */}
//                 <Route path="/checkout/:id" element={<PaymentPage />} />
//               </Routes>
//             </div>

//             {/* כפתור התנתקות קבוע בתחתית */}
//             <button onClick={() => setUser(null)} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
//               התנתק מהמערכת
//             </button>
//           </div>
//         )}
//       </div>
//     </Router>
//   );
// }

// export default App;




















// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import FlightList from './components/FlightList'; 
// import PaymentPage from './components/PaymentPage'; 
// import FlightDetails from './components/FlightDetails';
// import MyBookingsPage from './components/MyBookingsPage'; // דף היסטוריית ההזמנות החדש

// function App() {
//   return (
//     <Router>
//       <div style={{ fontFamily: 'Arial', direction: 'rtl', textAlign: 'center', padding: '20px' }}>
        
//         <h2>מערכת ניהול טיסות ✈️</h2>
        
//         {/* תפריט ניווט עליון נקי ונוח */}
//         <nav style={{ 
//           margin: '20px auto', 
//           padding: '10px', 
//           backgroundColor: '#f8f9fa', 
//           borderRadius: '5px', 
//           maxWidth: '900px', 
//           display: 'flex', 
//           justifyContent: 'center', 
//           gap: '20px' 
//         }}>
//           <Link to="/" style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}>✈️ לוח טיסות</Link>
//           <Link to="/my-bookings" style={{ textDecoration: 'none', color: '#00adb5', fontWeight: 'bold' }}>🧳 הטיסות שלי</Link>
//         </nav>
        
//         <hr style={{ maxWidth: '900px', margin: '20px auto' }} />

//         {/* מערכת הראוטינג המרכזית */}
//         <div style={{ 
//           backgroundColor: '#ffffff', 
//           padding: '20px', 
//           margin: '25px auto', 
//           maxWidth: '900px', 
//           borderRadius: '5px'
//         }}>
//           <Routes>
//             {/* דף הבית מציג את רשימת הטיסות */}
//             <Route path="/" element={<FlightList />} />
            
//             {/* דף טיסה ספציפית (של חברה שלך) */}
//             <Route path="/flights/:id" element={<FlightDetails />} />                
            
//             {/* דף התשלום שלנו */}
//             <Route path="/checkout/:id" element={<PaymentPage />} />

//             {/* דף היסטוריית ההזמנות החדש */}
//             <Route path="/my-bookings" element={<MyBookingsPage />} />
//           </Routes>
//         </div>

//       </div>
//     </Router>
//   );
// }

// export default App;




import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login'; // החזרנו את הלוגין
import FlightList from './components/FlightList'; 
import PaymentPage from './components/PaymentPage'; 
import FlightDetails from './components/FlightDetails';
import MyBookingsPage from './components/MyBookingsPage';

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