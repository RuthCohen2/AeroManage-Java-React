import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './FlightList.css'; // החזרנו את קובץ ה-CSS לעיצוב הלינקים והכרטיסים

interface FlightDTO {
    id: number;
    flightNumber: string;
    airline: string;
    departureFrom: string;
    destination: string;
    departureTime: string;
    price: number;
    availableSeats: number;
}

function FlightList() {
    const [flights, setFlights] = useState<FlightDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    
    // משתני הסטייט עבור הסינון המשולב
    const [searchDestination, setSearchDestination] = useState<string>('');
    const [maxPrice, setMaxPrice] = useState<number>(1000); // ברירת מחדל תקציב של 1000 ₪
    
    const navigate = useNavigate();

    // פונקציה שמבצעת את קריאת ה-fetch לשרת עם הסינונים
    const fetchFilteredFlights = () => {
        setLoading(true);
        fetch(`http://localhost:8081/api/flights/search?destination=${searchDestination}&maxPrice=${maxPrice}`)
            .then(res => {
                if (!res.ok) throw new Error("שגיאה בטעינת הטיסות");
                return res.json();
            })
            .then((data: FlightDTO[]) => {
                setFlights(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error searching flights:", err);
                setLoading(false);
            });
    };

    // טעינה ראשונית של הדף
    useEffect(() => {
        fetchFilteredFlights();
    }, []);

    return (
        <div style={{ backgroundColor: '#121212', color: '#ffffff', padding: '20px', minHeight: '100vh', direction: 'rtl' }}>
            
            {/* סקשן חיפוש וסינון משולב מודרני */}
            <div style={{ 
                backgroundColor: '#1e1e1e', 
                padding: '20px', 
                borderRadius: '8px', 
                marginBottom: '25px',
                display: 'flex',
                gap: '15px',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
                border: '1px solid #333'
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label style={{ fontSize: '14px', color: '#b3b3b3' }}>לאן תרצו לטוס?</label>
                    <input 
                        type="text" 
                        placeholder="למשל: לונדון, פריז..." 
                        value={searchDestination}
                        onChange={(e) => setSearchDestination(e.target.value)}
                        style={{ padding: '10px', borderRadius: '5px', border: '1px solid #555', backgroundColor: '#2a2a2a', color: '#fff', width: '200px' }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label style={{ fontSize: '14px', color: '#b3b3b3' }}>תקציב מקסימלי ({maxPrice}₪)</label>
                    <input 
                        type="range" 
                        min="100" 
                        max="2000" 
                        step="50"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                        style={{ width: '180px', accentColor: '#00adb5' }}
                    />
                </div>

                <button 
                    onClick={fetchFilteredFlights}
                    style={{ 
                        padding: '10px 25px', 
                        backgroundColor: '#00adb5', 
                        color: '#fff', 
                        border: 'none', 
                        borderRadius: '5px', 
                        fontWeight: 'bold', 
                        cursor: 'pointer',
                        marginTop: '22px',
                        transition: '0.3s'
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#008c9e')}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#00adb5')}
                >
                    🔍 חפש טיסות
                </button>
            </div>

            {/* הצגת תוצאות הטיסות */}
            <h3>טיסות זמינות עבורך ✈️</h3>
            
            {loading ? (
                <p style={{ color: '#00adb5' }}>מחפש טיסות תואמות...</p>
            ) : flights.length === 0 ? (
                <p style={{ color: '#ff6b6b', backgroundColor: '#2a1b1b', padding: '15px', borderRadius: '5px' }}>לא נמצאו טיסות התואמות ליעד או לתקציב המבוקש.</p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', marginTop: '20px' }}>
                    {flights.map((flight) => (
                        
                        /* 🔗 החזרנו את העטיפה של ה-Link! לחיצה על הכרטיס תפתח את פרטי הטיסה בגדול */
                        <Link to={`/flights/${flight.id}`} key={flight.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                            
                            <div style={{ 
                                backgroundColor: '#1e1e1e', 
                                padding: '20px', 
                                borderRadius: '8px', 
                                border: '1px solid #333',
                                textAlign: 'right',
                                position: 'relative',
                                cursor: 'pointer',
                                transition: 'transform 0.2s, border-color 0.2s'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.borderColor = '#00adb5'}
                            onMouseOut={(e) => e.currentTarget.style.borderColor = '#333'}
                            >
                                {/* 🔥 תגית ביקוש גבוה במידה ויש מעט מקומות */}
                                {flight.availableSeats <= 10 && flight.availableSeats > 0 && (
                                    <span style={{ position: 'absolute', top: '10px', left: '10px', backgroundColor: '#ff9f43', color: '#000', fontSize: '11px', padding: '3px 8px', borderRadius: '3px', fontWeight: 'bold' }}>
                                        🔥 ביקוש גבוה
                                    </span>
                                )}
                                
                                <h4 style={{ margin: '0 0 10px 0', color: '#00adb5' }}>{flight.destination}</h4>
                                <p style={{ margin: '5px 0', fontSize: '14px', color: '#b3b3b3' }}>חברה: {flight.airline} ({flight.flightNumber})</p>
                                <p style={{ margin: '5px 0', fontSize: '14px', color: '#b3b3b3' }}>מאיפה: {flight.departureFrom}</p>
                                <p style={{ margin: '5px 0', fontSize: '14px', color: '#b3b3b3' }}>תאריך: {new Date(flight.departureTime).toLocaleString('he-IL')}</p>
                                <p style={{ margin: '5px 0', fontSize: '14px', color: '#b3b3b3' }}>
                                    מקומות פנויים: <span style={{ color: flight.availableSeats <= 10 ? '#ff6b6b' : '#28c76f', fontWeight: 'bold' }}>
                                        {flight.availableSeats > 0 ? flight.availableSeats : 'אזל המלאי'}
                                    </span>
                                </p>
                                
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px', borderTop: '1px solid #333', paddingTop: '10px' }}>
                                    <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#28c76f' }}>{flight.price} ₪</span>
                                    
                                    <button 
                                        disabled={flight.availableSeats <= 0}
                                        onClick={(e) => {
                                            // 🛑 קריטי: מונע מהקליק על הכפתור להפעיל גם את הקישור לעמוד הפרטים הגדול!
                                            e.stopPropagation(); 
                                            e.preventDefault();
                                            navigate(`/checkout/${flight.id}`);
                                        }}
                                        style={{ 
                                            padding: '6px 12px', 
                                            backgroundColor: flight.availableSeats > 0 ? '#28c76f' : '#555', 
                                            color: '#fff', 
                                            border: 'none', 
                                            borderRadius: '4px', 
                                            cursor: flight.availableSeats > 0 ? 'pointer' : 'not-allowed',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        {flight.availableSeats > 0 ? 'הזמן כעת' : 'אזל המלאי'}
                                    </button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export default FlightList;