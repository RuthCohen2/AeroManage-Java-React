 package com.example.demo.repository;

import com.example.demo.entities.Booking;
// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.stereotype.Repository;

// @Repository
// public interface BookingRepository extends JpaRepository<Booking, Long> {
    
// }

// package com.first.demo.repository;

// import com.first.demo.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    
    // פונקציה דינמית: מוצאת את כל ההזמנות (והטיסות) המשויכות ל-User ID ספציפי
    List<Booking> findByUserId(Long userId);
}