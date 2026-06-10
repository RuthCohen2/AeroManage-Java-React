 package com.example.demo.service;


 import com.example.demo.dto.BookingDTO;
 import com.example.demo.entities.Booking;
 import com.example.demo.entities.Flight;
 import com.example.demo.entities.User;
 import com.example.demo.repository.BookingRepository;
 import com.example.demo.repository.FlightRepository;
 import com.example.demo.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FlightBookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private FlightRepository flightRepository;

    @Autowired
    private UserRepository userRepository;

    /**
     * פונקציה מורכבת לקניית כרטיס טיסה והורדת מקום פנוי
     */
    @Transactional
    public BookingDTO createBooking(Long userId, Long flightId) {
        
        // 1. שליפת המשתמש והטיסה
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Flight flight = flightRepository.findById(flightId)
                .orElseThrow(() -> new RuntimeException("Flight not found"));

        // 2. בדיקת מקומות פנויים
        if (flight.getAvailableSeats() <= 0) {
            throw new RuntimeException("No available seats on this flight!");
        }

        // 3. עדכון הטיסה: הורדת מקום אחד
        flight.setAvailableSeats(flight.getAvailableSeats() - 1);
        flightRepository.save(flight); 

        // 4. יצירת ההזמנה ושמירתה
        Booking booking = new Booking(user, flight, LocalDateTime.now());
        Booking savedBooking = bookingRepository.save(booking);

        // 5. החזרת ה-DTO
        return convertToDTO(savedBooking);
    }

    /**
     * פונקציה לביטול הזמנה קיימת והחזרת המקום הפנוי לטיסה
     */
    @Transactional
    public boolean cancelBooking(Long bookingId) {
        // 1. חיפוש ההזמנה בבסיס הנתונים
        Optional<Booking> bookingOptional = bookingRepository.findById(bookingId);
        
        if (bookingOptional.isPresent()) {
            Booking booking = bookingOptional.get();
            Flight flight = booking.getFlight();
            
            // 2. עדכון הטיסה: החזרת מקום פנוי אחד (+1)
            flight.setAvailableSeats(flight.getAvailableSeats() + 1);
            flightRepository.save(flight);
            
            // 3. מחיקת ההזמנה הפיזית
            bookingRepository.delete(booking);
            return true; // הביטול הצליח
        }
        
        return false; // ההזמנה לא נמצאה במערכת
    }

    /**
     * שליפת כל ההזמנות עבור נוסע ספציפי
     */
    public List<BookingDTO> getBookingsByUser(Long userId) {
        return bookingRepository.findByUserId(userId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * פונקציית מיפוי מ-Entity ל-DTO
     */
    private BookingDTO convertToDTO(Booking booking) {
        BookingDTO dto = new BookingDTO();
        dto.setId(booking.getId());
        dto.setUserId(booking.getUser().getId());
        
        // הגנה מפני NullPointerException במקרה של שם חסר ב-Entity
        String firstName = booking.getUser().getFirstName() != null ? booking.getUser().getFirstName() : "";
        String lastName = booking.getUser().getLastName() != null ? booking.getUser().getLastName() : "";
        dto.setPassengerName((firstName + " " + lastName).trim());
        
        dto.setFlightId(booking.getFlight().getId());
        dto.setDestination(booking.getFlight().getDestination());
        dto.setBookingDate(booking.getBookingDate());
        return dto;
    }
}