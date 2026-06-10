// import React from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// function FlightDetails() {
//   // useParams מושך את ה-ID מתוך כתובת ה-URL (למשל /flights/3)
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();

//   return (
//     <div style={{ padding: '20px', color: 'black', textAlign: 'right', direction: 'rtl' }}>
//       <h2>✈️ פרטי הטיסה שנבחרה (מספר מזהה: {id})</h2>
//       <p>כאן יוצגו כל הפרטים המלאים של הטיסה שימשכו מה-Backend בהמשך...</p>
      
//       <div style={{ marginTop: '30px' }}>
//         <button 
//           onClick={() => navigate('/')} 
//           style={{ padding: '10px 15px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginLeft: '10px' }}
//         >
//           חזרה ללוח הטיסות
//         </button>
        
//         <button 
//           onClick={() => navigate(`/checkout/${id}`)} 
//           style={{ padding: '10px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
//         >
//           המשך לתשלום 💳
//         </button>
//       </div>
//     </div>
//   );
// }

// export default FlightDetails;


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface FlightDTO {
  id: number;
  flightNumber: string;
  airline: string;
  departureFrom: string;
  destination: string;
  departureTime: string;
  availableSeats: number;
  price: number;
}

function FlightDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [flight, setFlight] = useState<FlightDTO | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`http://localhost:8081/api/flights/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('לא הצלחנו למצוא את פרטי הטיסה');
        return res.json();
      })
      .then((data) => setFlight(data))
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) {
    return (
      <div style={{ color: '#dc3545', padding: '30px', textAlign: 'center', direction: 'rtl' }}>
        <h3>❌ שגיאה: {error}</h3>
        <button onClick={() => navigate('/')} style={{ marginTop: '15px', padding: '10px 20px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
          חזרה ללוח הטיסות
        </button>
      </div>
    );
  }

  if (!flight) {
    return <div style={{ color: '#666', padding: '50px', textAlign: 'center', fontSize: '18px' }}>⏳ טוען את נתוני הטיסה המאובטחים...</div>;
  }

  return (
    <div style={{ maxWidth: '600px', margin: '30px auto', padding: '0 10px', direction: 'rtl' }}>
      
      {/* כרטיס הטיסה הראשי */}
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e0e0e0',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        overflow: 'hidden',
        textAlign: 'right'
      }}>
        
        {/* כותרת הכרטיס (חברת התעופה ומספר הטיסה) */}
        <div style={{
          backgroundColor: '#007bff',
          color: '#ffffff',
          padding: '15px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontWeight: 'bold'
        }}>
          <span style={{ fontSize: '18px' }}>✈️ {flight.airline}</span>
          <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '4px 10px', borderRadius: '4px', fontSize: '14px' }}>
            טיסה {flight.flightNumber}
          </span>
        </div>

        {/* גוף הכרטיס - נתיב הטיסה */}
        <div style={{ padding: '25px 20px', borderBottom: '1px dashed #e0e0e0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ textAlign: 'center' }}>
              <small style={{ color: '#aaa', display: 'block', marginBottom: '5px' }}>מוצא</small>
              <strong style={{ fontSize: '20px', color: '#333' }}>{flight.departureFrom}</strong>
            </div>
            
            <div style={{ fontSize: '24px', color: '#007bff', fontWeight: 'light' }}>←</div>
            
            <div style={{ textAlign: 'center' }}>
              <small style={{ color: '#aaa', display: 'block', marginBottom: '5px' }}>יעד סופי</small>
              <strong style={{ fontSize: '20px', color: '#333' }}>{flight.destination}</strong>
            </div>
          </div>
        </div>

        {/* פרטי זמנים ומקומות */}
        <div style={{ padding: '20px', backgroundColor: '#fafafa', fontSize: '15px', color: '#555', lineHeight: '2' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span><strong>📅 מועד המראה:</strong></span>
            <span style={{ color: '#333', fontWeight: '500' }}>{flight.departureTime}</span>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span><strong>💺 מקומות פנויים:</strong></span>
            <span style={{ color: flight.availableSeats < 20 ? '#dc3545' : '#333', fontWeight: 'bold' }}>
              {flight.availableSeats} כסאות נותרו
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #eee' }}>
            <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>מחיר סופי לכרטיס:</span>
            <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>${flight.price}</span>
          </div>
        </div>

      </div>

      {/* כפתורי פעולה מתחת לכרטיס */}
      <div style={{ marginTop: '25px', display: 'flex', gap: '15px', justifyContent: 'center' }}>
        <button 
          onClick={() => navigate('/')} 
          style={{
            flex: 1,
            padding: '12px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '15px'
          }}
        >
          חזרה ללוח הטיסות
        </button>
        
        <button 
          onClick={() => navigate(`/checkout/${flight.id}`)} 
          style={{
            flex: 2,
            padding: '12px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '16px',
            boxShadow: '0 2px 6px rgba(40,167,69,0.2)'
          }}
        >
          המשך לבחירת מושב ותשלום 💳
        </button>
      </div>

    </div>
  );
}

export default FlightDetails;