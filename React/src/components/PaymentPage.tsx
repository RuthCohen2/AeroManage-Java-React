
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PaymentPage.css';

interface PaymentFormData {
    fullName: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
}

interface FlightData {
    id: number;
    flightNumber: string;
    airline: string;
    departureFrom: string;
    destination: string;
    departureTime: string;
    price: number;
}

interface BookingResponseDTO {
    id: number;
    userId: number;
    passengerName: string;
    flightId: number;
    destination: string;
    bookingDate: string;
}

function PaymentPage() {
    const { id } = useParams<{ id: string }>(); 
    const navigate = useNavigate();
    
    const [flight, setFlight] = useState<FlightData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [bookingResult, setBookingResult] = useState<BookingResponseDTO | null>(null);

    const [formData, setFormData] = useState<PaymentFormData>({
        fullName: '',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });

    const [errors, setErrors] = useState<{ cardNumber?: string; cvv?: string }>({});

    useEffect(() => {
        fetch(`http://localhost:8081/api/flights`)
            .then(res => res.json())
            .then((data: FlightData[]) => {
                const currentFlight = data.find(f => f.id === Number(id));
                if (currentFlight) {
                    setFlight(currentFlight);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching flight details:", err);
                setLoading(false);
            });
    }, [id]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === 'cardNumber' || name === 'cvv') {
            const onlyNums = value.replace(/[^0-9]/g, '');
            
            setFormData(prev => ({
                ...prev,
                [name]: onlyNums
            }));

            if (errors[name as keyof typeof errors]) {
                setErrors(prev => ({ ...prev, [name]: undefined }));
            }
            return;
        }

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const validationErrors: { cardNumber?: string; cvv?: string } = {};

        if (formData.cardNumber.length !== 16) {
            validationErrors.cardNumber = 'מספר כרטיס אשראי חייב להכיל בדיוק 16 ספרות';
        }

        if (formData.cvv.length !== 3) {
            validationErrors.cvv = 'קוד CVV חייב להכיל בדיוק 3 ספרות';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        
        const mockUserId = 1;

        fetch(`http://localhost:8081/api/bookings/book?userId=${mockUserId}&flightId=${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (!res.ok) {
                throw new Error("שגיאה ברישום ההזמנה בשרת - ייתכן ואזלו המקומות");
            }
            return res.json();
        })
        .then((data: BookingResponseDTO) => {
            setBookingResult(data);
            setIsSubmitted(true);
        })
        .catch(err => {
            console.error("Booking submission failed:", err);
            alert("חלה שגיאה בביצוע ההזמנה. ודאי ששרת ה-Java פועל כראוי.");
        });
    };

    if (loading) {
        return <div className="payment-container"><div className="loading-text">טוען פרטי הזמנה...</div></div>;
    }

    // מסך ההצלחה המשודרג: כרטיס טיסה פיקסל-פרפקט (Boarding Pass)
    if (isSubmitted && bookingResult) {
        return (
            <div className="payment-container">
                <div className="success-header">
                    <div className="success-icon">✓</div>
                    <h2>ההזמנה נקלטה בהצלחה!</h2>
                    <p>איזה כיף, חוויית הטיסה שלך מתחילה כאן.</p>
                </div>

                {/* כרטיס הטיסה המעוצב */}
                <div className="ticket-visual">
                    
                    {/* חלק שמאל - הגוף המרכזי של הכרטיס */}
                    <div className="ticket-main">
                        <div className="passenger-section">
                            <span className="label">שם הנוסע / PASSENGER NAME</span>
                            <strong className="value">{bookingResult.passengerName}</strong>
                        </div>
                        
                        <div className="flight-route-visual">
                            <div className="route-point">
                                <span className="airport-code">{flight ? flight.departureFrom.substring(0, 3).toUpperCase() : 'TLV'}</span>
                                <span className="city-name">{flight ? flight.departureFrom : 'תל אביב'}</span>
                            </div>
                            <div className="route-path">
                                <span className="plane-icon">✈</span>
                                <div className="line-dashed"></div>
                            </div>
                            <div className="route-point">
                                <span className="airport-code">{bookingResult.destination.substring(0, 3).toUpperCase()}</span>
                                <span className="city-name">{bookingResult.destination}</span>
                            </div>
                        </div>

                        <div className="ticket-grid">
                            <div>
                                <span className="label">חברת תעופה</span>
                                <span className="value">{flight ? flight.airline : 'לא ידוע'}</span>
                            </div>
                            <div>
                                <span className="label">מספר טיסה</span>
                                <span className="value">{flight ? flight.flightNumber : '---'}</span>
                            </div>
                            <div>
                                <span className="label">תאריך רכישה</span>
                                <span className="value">{new Date(bookingResult.bookingDate).toLocaleDateString('he-IL')}</span>
                            </div>
                        </div>
                        
                        {/* ברקוד לעיצוב */}
                        <div className="ticket-barcode">
                            <div className="barcode-lines"></div>
                            <span className="barcode-text">BOOKING #{bookingResult.id}</span>
                        </div>
                    </div>

                    {/* ספח ימין - הגזירה בשער העלייה למטוס */}
                    <div className="ticket-stub">
                        <div className="stub-header">
                            <span>BOARDING PASS</span>
                        </div>
                        <div className="stub-info">
                            <span className="label">FLIGHT</span>
                            <strong className="value">{flight ? flight.flightNumber : '---'}</strong>
                            
                            <span className="label">DESTINATION</span>
                            <strong className="value">{bookingResult.destination}</strong>
                            
                            <span className="label">BOOKING ID</span>
                            <strong className="value">#{bookingResult.id}</strong>
                        </div>
                        <div className="stub-badge">BOARDING</div>
                    </div>

                </div>

                <button className="success-home-btn" onClick={() => navigate('/')}>
                    חזרה ללוח הטיסות הראשי
                </button>
            </div>
        );
    }

    return (
        <div className="payment-container">
            <div className="payment-card">
                <h2>פרטי תשלום</h2>
                <p className="payment-subtitle">
                    {flight ? `אתה מבצע הזמנה ל${flight.destination} עם חברת ${flight.airline}` : `אתה מבצע הזמנה עבור טיסה מספר ${id}`}
                </p>
                
                <form onSubmit={handleSubmit} className="payment-form">
                    <div className="form-group">
                        <label>שם מלא של בעל הכרטיס</label>
                        <input 
                            type="text" 
                            name="fullName" 
                            required 
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="ישראל ישראלי"
                        />
                    </div>

                    <div className="form-group">
                        <label>מספר כרטיס אשראי</label>
                        <input 
                            type="text" 
                            name="cardNumber" 
                            maxLength={16}
                            required 
                            value={formData.cardNumber}
                            onChange={handleChange}
                            placeholder="1234567812345678"
                        />
                        {errors.cardNumber && <span className="error-text">{errors.cardNumber}</span>}
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>תוקף (MM/YY)</label>
                            <input 
                                type="text" 
                                name="expiryDate" 
                                placeholder="12/28" 
                                maxLength={5}
                                required 
                                value={formData.expiryDate}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>CVV</label>
                            <input 
                                type="password" 
                                name="cvv" 
                                placeholder="123" 
                                maxLength={3}
                                required 
                                value={formData.cvv}
                                onChange={handleChange}
                            />
                            {errors.cvv && <span className="error-text">{errors.cvv}</span>}
                        </div>
                    </div>

                    {flight && (
                        <div className="price-display">
                            <span>סה"כ לתשלום:</span>
                            <strong>${flight.price}</strong>
                        </div>
                    )}

                    <button type="submit" className="submit-payment-btn">
                        אשר תשלום וסיים הזמנה
                    </button>
                </form>
                
                <button className="back-btn" onClick={() => navigate('/')}>
                    ביטול וחזרה ללוח הטיסות
                </button>
            </div>
        </div>
    );
}

export default PaymentPage;