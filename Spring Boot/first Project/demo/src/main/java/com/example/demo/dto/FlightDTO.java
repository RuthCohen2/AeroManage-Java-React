package com.example.demo.dto;

import java.time.LocalDateTime;
public class FlightDTO {
    
    private Long id;
    private String flightNumber;
    private String airline;
    private String departureFrom;
    private String destination;
    private LocalDateTime departureTime;
    private double price;
    private int availableSeats;

    public FlightDTO() {
    }

    public FlightDTO(Long id, String flightNumber, String airline, String departureFrom, 
                     String destination, LocalDateTime departureTime, double price, int availableSeats) {
        this.id = id;
        this.flightNumber = flightNumber;
        this.airline = airline;
        this.departureFrom = departureFrom;
        this.destination = destination;
        this.departureTime = departureTime;
        this.price = price;
        this.availableSeats = availableSeats;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFlightNumber() { return flightNumber; }
    public void setFlightNumber(String flightNumber) { this.flightNumber = flightNumber; }
    public String getAirline() { return airline; }
    public void setAirline(String airline) { this.airline = airline; }
    public String getDepartureFrom() { return departureFrom; }
    public void setDepartureFrom(String departureFrom) { this.departureFrom = departureFrom; }
    public String getDestination() { return destination; }
    public void setDestination(String destination) { this.destination = destination; }
    public LocalDateTime getDepartureTime() { return departureTime; }
    public void setDepartureTime(LocalDateTime departureTime) { this.departureTime = departureTime; }
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
    public int getAvailableSeats() { return availableSeats; }
    public void setAvailableSeats(int availableSeats) { this.availableSeats = availableSeats; }
}
