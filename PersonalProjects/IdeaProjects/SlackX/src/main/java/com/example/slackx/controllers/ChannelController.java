package com.example.slackx.controllers;

import com.example.slackx.dto.DeliverySuccessMessageDTO;
import com.example.slackx.dto.MemberDTO;
import com.example.slackx.dto.MessageDTO;
import com.example.slackx.dto.UserAddSuccessMessageDTO;
import com.example.slackx.models.Channel;
import com.example.slackx.models.User;
import com.example.slackx.services.ChannelService;
import com.example.slackx.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/channels")
public class ChannelController {
    private final ChannelService channelService;
    private final UserService userService;

    public ChannelController(ChannelService channelService, UserService userService){
        this.channelService = channelService;
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<Channel> createChannel(@RequestBody Channel channel){
        Channel newChannel = channelService.createChannel(channel);
        if(newChannel != null) System.out.println("New channel created with name : " + channel.getName());
        return ResponseEntity.ok(newChannel);
    }
    @PostMapping("/{channelName}/users/{userEmail:.+}")
    public ResponseEntity<UserAddSuccessMessageDTO> addUserToChannel(@PathVariable String channelName,
                                                                     @PathVariable String userEmail){
        Channel channel = channelService.getChannelByName(channelName);
        User user = userService.getUserByEmail(userEmail);
        UserAddSuccessMessageDTO userAddSuccessMessageDTO =  channelService.addUser(channel, user);
        return new ResponseEntity<>(userAddSuccessMessageDTO,HttpStatus.OK);
    }
    @PostMapping("/{channelName}/messages")
    public ResponseEntity<DeliverySuccessMessageDTO> deliverMessage(@PathVariable String channelName, @RequestBody MessageDTO message) throws Exception {
        return new ResponseEntity<>(channelService.sendMessage(channelName, message), HttpStatus.OK);
    }
//    @GetMapping
//    public ResponseEntity<List<Channel>> getAllChannels(){
//        return ResponseEntity.ok(channelService.getAllChannels());
//    }
    @GetMapping("/{channelName}/members")
    public ResponseEntity<List<MemberDTO>> getAllMembers(@PathVariable String channelName){
        return ResponseEntity.ok(channelService.findAllMember(channelName));
    }
}
