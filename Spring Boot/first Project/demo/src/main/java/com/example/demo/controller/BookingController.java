 package com.example.demo.controller;

import com.example.demo.dto.BookingDTO;
import com.example.demo.service.FlightBookingService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.RestController;

// @RestController
// @RequestMapping("/api/bookings")
// public class BookingController {

//     @Autowired
//     private FlightBookingService bookingService;

//     @PostMapping("/book")
//     public BookingDTO bookFlight(@RequestParam Long userId, @RequestParam Long flightId) {
//         return bookingService.createBooking(userId, flightId);
//     }
// }
// package com.first.demo.controller;

// import com.first.demo.dto.BookingDTO;
// import com.first.demo.service.FlightBookingService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;

// @RestController
// @RequestMapping("/api/bookings")
// @CrossOrigin(origins = "http://localhost:5173")
// public class BookingController {

//     @Autowired
//     private FlightBookingService bookingService;

//     /**
//      * נקודת קצה לביצוע הזמנה חדשה
//      * פנייה מ-React: POST ל- http://localhost:8081/api/bookings/book?userId=1&flightId=5
//      */
//     @PostMapping("/book")
//     public ResponseEntity<BookingDTO> bookFlight(@RequestParam Long userId, @RequestParam Long flightId) {
//         BookingDTO newBooking = bookingService.createBooking(userId, flightId);
//         return ResponseEntity.ok(newBooking);
//     }

//     /**
//      * נקודת קצה לשליפת כל הטיסות שהמשתמש הזמין
//      * פנייה מ-React: GET ל- http://localhost:8081/api/bookings/user/1
//      */
//     @GetMapping("/user/{userId}")
//     public ResponseEntity<List<BookingDTO>> getMyFlights(@PathVariable Long userId) {
//         List<BookingDTO> myFlights = bookingService.getBookingsByUser(userId);
//         return ResponseEntity.ok(myFlights);
//     }
// }



// package com.example.demo.controller;

import com.example.demo.dto.BookingDTO;
import com.example.demo.service.FlightBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:5173")
public class BookingController {

    @Autowired
    private FlightBookingService bookingService;

    /**
     * נקודת קצה לביצוע הזמנה חדשה
     * פנייה מ-React: POST ל- http://localhost:8081/api/bookings/book?userId=1&flightId=5
     */
    @PostMapping("/book")
    public ResponseEntity<BookingDTO> bookFlight(@RequestParam Long userId, @RequestParam Long flightId) {
        BookingDTO newBooking = bookingService.createBooking(userId, flightId);
        return ResponseEntity.ok(newBooking);
    }

    /**
     * נקודת קצה לשליפת כל הטיסות שהמשתמש הזמין
     * פנייה מ-React: GET ל- http://localhost:8081/api/bookings/user/1
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BookingDTO>> getMyFlights(@PathVariable Long userId) {
        List<BookingDTO> myFlights = bookingService.getBookingsByUser(userId);
        return ResponseEntity.ok(myFlights);
    }

    /**
     * נקודת קצה לביטול הזמנה ומחיקתה מהמערכת
     * פנייה מ-React: DELETE ל- http://localhost:8081/api/bookings/cancel/12
     */
    @DeleteMapping("/cancel/{bookingId}")
    public ResponseEntity<String> cancelBooking(@PathVariable Long bookingId) {
        boolean isCancelled = bookingService.cancelBooking(bookingId);
        
        if (isCancelled) {
            return ResponseEntity.ok("ההזמנה בוטלה בהצלחה ומספר המקומות בטיסה עודכן!");
        } else {
            return ResponseEntity.status(404).body("ההזמנה לא נמצאה במערכת.");
        }
    }
}