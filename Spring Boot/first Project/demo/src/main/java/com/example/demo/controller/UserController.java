 package com.example.demo.controller;


import com.example.demo.dto.UserDTO;
import com.example.demo.entities.User;
import com.example.demo.service.UserService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.RestController;

// import java.util.List;
// import org.springframework.web.bind.annotation.CrossOrigin;
// @CrossOrigin(origins = "http://localhost:5173")
// @RestController
// @RequestMapping("/api/users")
// public class UserController {

//     @Autowired
//     private UserService userService;

//  @PostMapping("/register")
//     public UserDTO createUser(@RequestBody User user) {
//         return userService.registerUser(user);
//     }

//     @PostMapping("/login")
//     public UserDTO loginUser(@RequestParam String username, @RequestParam String password) {
//         return userService.login(username, password);
//     }

//  @GetMapping
//     public List<UserDTO> getUsers() {
//         return userService.getAllUsers();
//     }
// }

// import com.first.demo.dto.UserDTO;
// import com.first.demo.entity.User;
// import com.first.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

 @PostMapping("/register")
    public UserDTO createUser(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping("/login")
    public UserDTO loginUser(@RequestParam String username, @RequestParam String password) {
        return userService.login(username, password);
    }

 @GetMapping
    public List<UserDTO> getUsers() {
        return userService.getAllUsers();
    }
}