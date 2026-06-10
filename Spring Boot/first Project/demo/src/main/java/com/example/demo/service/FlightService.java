 package com.example.demo.service;

 import com.example.demo.dto.FlightDTO;
 import com.example.demo.entities.Flight;
 import com.example.demo.repository.FlightRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;


// import java.util.ArrayList;
// import java.util.List;
// import java.util.stream.Collectors;

// @Service
// public class FlightService {

//     @Autowired
//     private FlightRepository flightRepository;

//     // 1. פונקציה להחזרת כל הטיסות (נשארה כמו שהייתה, רק מקוצרת בעזרת פונקציית העזר)
//     public List<FlightDTO> getAllFlights() {
//         List<Flight> flights = flightRepository.findAll();
//         List<FlightDTO> dtos = new ArrayList<>();
        
//         for (Flight flight : flights) {
//             dtos.add(convertToDTO(flight)); // משתמש בפונקציית העזר החדשה
//         }
//         return dtos;
//     }
    
//     // 2. פונקציה חדשה לחלוטין שמחזירה טיסה אחת ספציפית לפי ה-ID שלה!
//     public FlightDTO getFlightById(Long id) {
//         Flight flight = flightRepository.findById(id)
//                 .orElseThrow(() -> new RuntimeException("הטיסה המבוקשת לא נמצאה במערכת"));
//         return convertToDTO(flight);
//     }

//     // 3. פונקציית עזר פרטית למיפוי מ-Entity ל-DTO (חוסכת כתיבה כפולה של קוד)
//     private FlightDTO convertToDTO(Flight flight) {
//         FlightDTO dto = new FlightDTO();
//         dto.setId(flight.getId());
//         dto.setFlightNumber(flight.getFlightNumber());
//         dto.setAirline(flight.getAirline());
//         dto.setDepartureFrom(flight.getDepartureFrom());
//         dto.setDestination(flight.getDestination());
//         dto.setDepartureTime(flight.getDepartureTime());
//         dto.setPrice(flight.getPrice());
//         dto.setAvailableSeats(flight.getAvailableSeats());
//         return dto;
//     }

// public FlightDTO bookSeat(Long id) {
//     // 1. שליפת הטיסה מבסיס הנתונים
//     Flight flight = flightRepository.findById(id)
//             .orElseThrow(() -> new RuntimeException("הטיסה לא נמצאה"));

//     // 2. בדיקה שיש בכלל מקומות פנויים לפני שמורידים
//     if (flight.getAvailableSeats() <= 0) {
//         throw new RuntimeException("אזלו המקומות בטיסה זו!");
//     }

//     // 3. הפחתת מקום אחד
//     flight.setAvailableSeats(flight.getAvailableSeats() - 1);

//     // 4. שמירת הטיסה המעודכנת בבסיס הנתונים
//     Flight updatedFlight = flightRepository.save(flight);


    
//     // 5. החזרת ה-DTO המעודכן לדפדפן
//     return convertToDTO(updatedFlight);
// }
// public List<FlightDTO> searchFlights(String destination, double maxPrice) {
//     List<Flight> flights = flightRepository.findByDestinationContainingIgnoreCaseAndPriceLessThanEqual(destination, maxPrice);
//     return flights.stream()
//                   .map(this::convertToDTO)
//                   .collect(Collectors.toList());
// }
// }


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FlightService {

    @Autowired
    private FlightRepository flightRepository;

    /**
     * מחזירה את כל הטיסות הקיימות במערכת כרשימה של DTOs
     */
    public List<FlightDTO> getAllFlights() {
        // 1. שליפת כל ה-Entities מבסיס הנתונים
        List<Flight> flights = flightRepository.findAll();
        
        // 2. יצירת רשימה ריקה חדשה שתכיל את ה-DTOs
        List<FlightDTO> dtos = new ArrayList<>();
        
        // 3. לולאה שעוברת על כל טיסה, ממירה אותה בעזרת פונקציית העזר ומכניסה לרשימה
        for (Flight flight : flights) {
            dtos.add(convertToDTO(flight));
        }
        
        return dtos;
    }
    
    /**
     * מחזירה טיסה אחת ספציפית לפי ה-ID שלה
     */
    public FlightDTO getFlightById(Long id) {
        Flight flight = flightRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("הטיסה המבוקשת לא נמצאה במערכת"));
        return convertToDTO(flight);
    }

    /**
     * מעדכנת ומפחיתה מקום פנוי אחד בטיסה בעת ביצוע הזמנה
     */
    public FlightDTO bookSeat(Long id) {
        // 1. שליפת הטיסה מבסיס הנתונים
        Flight flight = flightRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("הטיסה לא נמצאה"));

        // 2. בדיקה שיש בכלל מקומות פנויים לפני שמורידים
        if (flight.getAvailableSeats() <= 0) {
            throw new RuntimeException("אזלו המקומות בטיסה זו!");
        }

        // 3. הפחתת מקום אחד
        flight.setAvailableSeats(flight.getAvailableSeats() - 1);

        // 4. שמירת הטיסה המעודכנת בבסיס הנתונים
        Flight updatedFlight = flightRepository.save(flight);

        // 5. החזרת ה-DTO המעודכן לדפדפן
        return convertToDTO(updatedFlight);
    }

    /**
     * פונקציית עזר פרטית למיפוי מ-Entity ל-DTO (חוסכת כתיבה כפולה של קוד)
     */
    private FlightDTO convertToDTO(Flight flight) {
        FlightDTO dto = new FlightDTO();
        dto.setId(flight.getId());
        dto.setFlightNumber(flight.getFlightNumber());
        dto.setAirline(flight.getAirline());
        dto.setDepartureFrom(flight.getDepartureFrom());
        dto.setDestination(flight.getDestination());
        dto.setDepartureTime(flight.getDepartureTime());
        
        // === כאן קורה השינוי המרכזי! ===
        // במקום להביא את המחיר הרגיל, אנחנו מחשבים אותו דינמית לפי זמינות המושבים
        dto.setPrice(getDynamicPrice(flight)); 
        
        dto.setAvailableSeats(flight.getAvailableSeats());
        return dto;
    }

    /**
     * מנוע החיפוש והסינון המשולב לפי יעד ומחיר מקסימלי
     */
    public List<FlightDTO> searchFlights(String destination, double maxPrice) {
        List<Flight> flights = flightRepository.findByDestinationContainingIgnoreCaseAndPriceLessThanEqual(destination, maxPrice);
        return flights.stream()
                      .map(this::convertToDTO) // שימוש ב-convertToDTO המעודכן שמחשב מחיר דינמי!
                      .collect(Collectors.toList());
    }

    /**
     * אלגוריתם תמחור דינמי - מעלה את המחיר ב-25% אם נשארו 10 מקומות או פחות
     */
    private double getDynamicPrice(Flight flight) {
        double basePrice = flight.getPrice();
        if (flight.getAvailableSeats() <= 10) {
            return basePrice * 1.25;
        }
        return basePrice;
    }
}