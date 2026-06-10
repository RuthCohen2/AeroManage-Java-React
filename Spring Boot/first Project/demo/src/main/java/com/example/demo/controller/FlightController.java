package com.example.demo.controller;

import com.example.demo.dto.FlightDTO;
import com.example.demo.service.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable; // ייבוא חובה עבור PathVariable!
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173") 
@RequestMapping("/api/flights")
public class FlightController {

    @Autowired
    private FlightService flightService;

    // 1. פונקציה שמחזירה את כל הטיסות (נשארה כמו שהייתה)
    @GetMapping
    public List<FlightDTO> getAllFlights() {
        return flightService.getAllFlights();
    }

    // 2. הפונקציה החדשה שהייתה חסרה! מקשיבה לנתיב /api/flights/{id}
    @GetMapping("/{id}")
    public FlightDTO getFlightById(@PathVariable Long id) {
        return flightService.getFlightById(id);
    }
    @PutMapping("/{id}/book")
    public FlightDTO bookSeat(@PathVariable Long id) {
        return flightService.bookSeat(id);
    }
    @GetMapping("/search")
public ResponseEntity<List<FlightDTO>> searchFlights(
        @RequestParam(required = false, defaultValue = "") String destination,
        @RequestParam(required = false, defaultValue = "999999") double maxPrice) {
    return ResponseEntity.ok(flightService.searchFlights(destination, maxPrice));
}
}