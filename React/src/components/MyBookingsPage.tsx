import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MyBookingsPage.css';

// ממשק התואם בדיוק ל-BookingDTO שחוזר משרת ה-Java
interface BookingDTO {
    id: number;
    userId: number;
    passengerName: string;
    flightId: number;
    destination: string;
    bookingDate: string;
}

function MyBookingsPage() {
    const [bookings, setBookings] = useState<BookingDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    // שימוש ב-userId = 1 הסטטי, בדיוק כמו בדף התשלום
    const mockUserId = 1;

    useEffect(() => {
        // פנייה ל-Endpoint החדש שבדקנו בג'אווה
        fetch(`http://localhost:8081/api/bookings/user/${mockUserId}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("חלה שגיאה במשיכת ההזמנות מהשרת");
                }
                return res.json();
            })
            .then((data: BookingDTO[]) => {
                setBookings(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching bookings:", err);
                setLoading(false);
            });
    }, []);

    // 🌟 פונקציית ביטול ההזמנה החדשה שלך! 🌟
    const handleCancelBooking = async (bookingId: number) => {
        if (window.confirm("האם את בטוחה שברצונך לבטל את ההזמנה הזו?")) {
            try {
                // שליחת בקשת ה-DELETE לקונטרולר המעודכן בשרת
                const response = await axios.delete(`http://localhost:8081/api/bookings/cancel/${bookingId}`);
                
                // הצגת הודעת ההצלחה שחוזרת מה-ResponseEntity.ok בג'אווה
                alert(response.data); 
                
                // עדכון הסטייט בריאקט: מסננים החוצה את ההזמנה שנמחקה כדי שתיעלם מהמסך מיד
                setBookings(prevBookings => prevBookings.filter(booking => booking.id !== bookingId));
                
            } catch (error) {
                console.error("Error cancelling booking:", error);
                alert("חלה שגיאה בזמן ביטול ההזמנה. נסי שנית מאוחר יותר.");
            }
        }
    };

    if (loading) {
        return (
            <div className="bookings-container dark">
                <div className="loading-text dark">טוען את היסטוריית ההזמנות שלך...</div>
            </div>
        );
    }

    return (
        <div className="bookings-container dark">
            <div className="bookings-header dark">
                <h2>הטיסות שהזמנתי ✈️</h2>
                <p>כאן ריכזנו עבורך את כל כרטיסי הטיסה שרכשת במערכת</p>
            </div>

            {bookings.length === 0 ? (
                <div className="no-bookings-box dark">
                    <p>עדיין לא ביצעת הזמנות במערכת.</p>
                    <button className="explore-btn dark" onClick={() => navigate('/')}>
                        לצפייה בלוח הטיסות הראשי
                    </button>
                </div>
            ) : (
                <div className="bookings-grid dark">
                    {bookings.map((booking) => (
                        <div key={booking.id} className="booking-mini-card dark">
                            <div className="mini-card-header dark">
                                <span className="booking-id dark">כרטיס מס' #{booking.id}</span>
                                <span className="status-approved dark">מאושר</span>
                            </div>
                            
                            <div className="mini-card-body dark">
                                <div className="detail-row dark">
                                    <span className="detail-label dark">יעד מבוקש:</span>
                                    <strong className="detail-value dark dest-highlight">{booking.destination}</strong>
                                </div>
                                <div className="detail-row dark">
                                    <span className="detail-label dark">שם הנוסע:</span>
                                    <span className="detail-value dark">{booking.passengerName}</span>
                                </div>
                                <div className="detail-row dark">
                                    <span className="detail-label dark">תאריך רכישה:</span>
                                    <span className="detail-value dark">
                                        {new Date(booking.bookingDate).toLocaleDateString('he-IL')}
                                    </span>
                                </div>

                                {/* 🔘 כפתור הביטול החדש שנוסף בתחתית כל כרטיס */}
                                <button 
                                    className="cancel-booking-btn dark"
                                    onClick={() => handleCancelBooking(booking.id)}
                                    style={{
                                        backgroundColor: '#e63946',
                                        color: 'white',
                                        border: 'none',
                                        padding: '8px 12px',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        marginTop: '15px',
                                        width: '100%',
                                        fontWeight: 'bold',
                                        transition: 'background-color 0.2s'
                                    }}
                                >
                                    ביטול הזמנה ❌
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <button className="back-home-button dark" onClick={() => navigate('/')}>
                חזרה למסך הראשי
            </button>
        </div>
    );
}

export default MyBookingsPage;