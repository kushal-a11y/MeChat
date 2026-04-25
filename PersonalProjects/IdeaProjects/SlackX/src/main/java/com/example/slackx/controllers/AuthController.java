package com.example.slackx.controllers;

import com.example.slackx.jwt.JwtUtils;
import com.example.slackx.models.User;
import com.example.slackx.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final JwtUtils jwtUtils;
    private final UserService userService;

    public AuthController(JwtUtils jwtUtils, UserService userService){
        this.jwtUtils = jwtUtils;
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user){
        User newUser = userService.createUser(user);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user){
        User existingUser = userService.getUserByEmail(user.getEmail());
        if(!existingUser.getPassword().equals(user.getPassword())){
            return new ResponseEntity<>("Not a valid user", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(jwtUtils.generateToken(user.getEmail()), HttpStatus.OK);
    }
}
