 package com.example.demo.service;


import com.example.demo.dto.UserDTO;
import com.example.demo.entities.User;
import com.example.demo.repository.UserRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import java.util.ArrayList;
// import java.util.List;

// @Service
// public class UserService {

//     @Autowired
//     private UserRepository userRepository;


//         public UserDTO registerUser(User user) {
//         user.setRole("USER"); 
//         User savedUser = userRepository.save(user);
//         return convertToDTO(savedUser);
//     }
//     public UserDTO login(String username, String password) {
//         User user = userRepository.findByUsername(username)
//                 .orElseThrow(() -> new RuntimeException("משתמש לא נמצא במערכת"));

//         if (!user.getPassword().equals(password)) {
//             throw new RuntimeException("סיסמה שגויה, נסה שנית");
//         }

//         return convertToDTO(user);
//     }
//     // פונקציה להחזרת כל המשתמשים במערכת
//     public List<UserDTO> getAllUsers() {
//         List<User> users = userRepository.findAll();
//         List<UserDTO> dtos = new ArrayList<>();
        
//         for (User u : users) {
//             dtos.add(convertToDTO(u));
//         }
//         return dtos;
//     }


//     // פונקציית עזר פרטית למיפוי מ-Entity ל-DTO (חוסכת כתיבה כפולה של קוד)
//     private UserDTO convertToDTO(User user) {
//         UserDTO dto = new UserDTO();
//         dto.setId(user.getId());
//         dto.setUsername(user.getUsername());
//         dto.setFirstName(user.getFirstName());
//         dto.setLastName(user.getLastName());
//         dto.setRole(user.getRole());
//         return dto;
//     }
// }


// package com.first.demo.service;

// import com.first.demo.dto.UserDTO;
// import com.first.demo.entity.User;
// import com.first.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;


        public UserDTO registerUser(User user) {
        user.setRole("USER"); 
        User savedUser = userRepository.save(user);
        return convertToDTO(savedUser);
    }
    public UserDTO login(String username, String password) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("משתמש לא נמצא במערכת"));

        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("סיסמה שגויה, נסה שנית");
        }

        return convertToDTO(user);
    }
    // פונקציה להחזרת כל המשתמשים במערכת
    public List<UserDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        List<UserDTO> dtos = new ArrayList<>();
        
        for (User u : users) {
            dtos.add(convertToDTO(u));
        }
        return dtos;
    }


    // פונקציית עזר פרטית למיפוי מ-Entity ל-DTO (חוסכת כתיבה כפולה של קוד)
    private UserDTO convertToDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setRole(user.getRole());
        return dto;
    }
}