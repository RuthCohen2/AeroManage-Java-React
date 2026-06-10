// package com.example.demo;

// import org.springframework.boot.SpringApplication;
// import org.springframework.boot.autoconfigure.SpringBootApplication;

// @SpringBootApplication
// public class DemoApplication {

// 	public static void main(String[] args) {
// 		SpringApplication.run(DemoApplication.class, args);
// 	}

// }
// package com.example.demo;

// import com.example.demo.entities.User;
// import com.example.demo.repository.UserRepository; // ודאי שהנתיב ל-Repository נכון
// import org.springframework.boot.CommandLineRunner;
// import org.springframework.boot.SpringApplication;
// import org.springframework.boot.autoconfigure.SpringBootApplication;
// import org.springframework.context.annotation.Bean;

// @SpringBootApplication
// public class DemoApplication {

//     public static void main(String[] args) {
//         SpringApplication.run(DemoApplication.class, args);
//     }

//     @Bean
//     CommandLineRunner initDatabase(UserRepository userRepository) {
//         return args -> {
//             // בדיקה אם הטבלה ריקה, כדי לא לייצר כפילויות במקרה של שינוי הגדרות
//             if (userRepository.count() == 0) {
//                 User defaultUser = new User();
//                 defaultUser.setUsername("user123");
//                 defaultUser.setPassword("password123"); // אם יש לך הצפנת סיסמאות, השתמשי בה כאן
//                 defaultUser.setFirstName("ישראל");
//                 defaultUser.setLastName("ישראלי");
//                 defaultUser.setRole("USER");

//                 userRepository.save(defaultUser);
//                 System.out.println(" Default user created successfully: user123 / password123");
//             }
//         };
//     }
// }



package com.example.demo;

import com.example.demo.entities.User;
import com.example.demo.repository.UserRepository; 
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository) {
        return args -> {
            // בדיקה אם הטבלה ריקה, כדי לא לייצר כפילויות
            if (userRepository.count() == 0) {
                User defaultUser = new User();
                defaultUser.setUsername("user123");
                defaultUser.setPassword("password123"); // ודאי שזה תואם לאיך שאת שומרת סיסמאות
                defaultUser.setFirstName("ישראל");
                defaultUser.setLastName("ישראלי");
                defaultUser.setRole("USER");

                userRepository.save(defaultUser);
                
                // הוספת מנהל לבדיקה
                User adminUser = new User();
                adminUser.setUsername("admin123");
                adminUser.setPassword("admin123");
                adminUser.setFirstName("מנהל");
                adminUser.setLastName("מערכת");
                adminUser.setRole("ADMIN");
                
                userRepository.save(adminUser);

                System.out.println("Default users created successfully: user123 and admin123");
            }
        };
    }
}