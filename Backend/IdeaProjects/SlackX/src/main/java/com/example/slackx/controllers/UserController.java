package com.example.slackx.controllers;

import com.example.slackx.dto.ChannelDTO;
import com.example.slackx.dto.UserCreationDTO;
import com.example.slackx.models.Profile;
import com.example.slackx.services.ChannelService;
import com.example.slackx.services.ProfileService;
import org.slf4j.Logger;
import com.example.slackx.models.User;
import com.example.slackx.services.UserService;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/users")
public class UserController {
    private final static Logger logger = LoggerFactory.getLogger(UserController.class);

    private final UserService userService;
    private final ProfileService profileService;

    public UserController(UserService userService, ProfileService profileService, ChannelService channelService){
        this.userService = userService;
        this.profileService = profileService;
    }

    @PostMapping
    public ResponseEntity<User> signUp(@RequestBody User user){
        logger.info("API HIT");
        logger.info("USER DATA: " + user);
        User newUser = userService.createUser(user);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @DeleteMapping("/{email}")
    public ResponseEntity<Void> deleteAccount(@PathVariable String email) throws Exception {
        userService.deleteUserByEmail(email);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/test")
    public String test(){
        return "Protected Api working.";
    }

    @PostMapping("/register")
    public ResponseEntity<Profile> register(@RequestBody UserCreationDTO userCreationDTO){
        User newUser = userService.createUser(userCreationDTO.email(), userCreationDTO.password());
        Profile profile = profileService.createProfile(newUser, userCreationDTO.bio());
        return new ResponseEntity<>(profile, HttpStatus.CREATED);
    }
    @GetMapping("/{email}/channels")
    public ResponseEntity<List<ChannelDTO>> findAllChannels(@PathVariable String email){
        return ResponseEntity.ok(userService.findAllChannels(email));
    }
}
