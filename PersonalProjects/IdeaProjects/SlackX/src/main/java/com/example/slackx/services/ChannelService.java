package com.example.slackx.services;

import com.example.slackx.dto.DeliverySuccessMessageDTO;
import com.example.slackx.dto.MemberDTO;
import com.example.slackx.dto.MessageDTO;
import com.example.slackx.dto.UserAddSuccessMessageDTO;
import com.example.slackx.models.Channel;
import com.example.slackx.models.Message;
import com.example.slackx.models.User;
import com.example.slackx.repositories.ChannelRepository;
import com.example.slackx.repositories.MessageRepository;
import com.example.slackx.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ChannelService {
    private final ChannelRepository channelRepository;
    private final UserRepository userRepository;
    private final MessageRepository messageRepository;

    public ChannelService(ChannelRepository channelRepository, UserRepository userRepository, MessageRepository messageRepository){
        this.channelRepository = channelRepository;
        this.userRepository = userRepository;
        this.messageRepository = messageRepository;
    }

    public Channel createChannel(Channel channel) {
        if (channelRepository.existsByName(channel.getName())) {
            throw new RuntimeException("Channel " + channel.getName() + " already exists.");
        }
        return channelRepository.save(channel);
    }
    public Channel createChannel(String name) {
        if (channelRepository.existsByName(name)) {
            return channelRepository.findByName(name).orElse(null);
        }
        Channel channel = new Channel();
        channel.setName(name);
        return channelRepository.save(channel);
    }
    public Channel getChannelByName(String name){
        return channelRepository.findByName(name).orElse(null);
    }
    public List<Channel> getAllChannels(){
        return channelRepository.findAll();
    }
    @Transactional
    public UserAddSuccessMessageDTO addUser(Channel channel, User user){
        Channel managedChannel = channelRepository.findById(channel.getId())
                .orElseThrow(() -> new RuntimeException("Channel not found"));
        User managedUser = userRepository.findById(user.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        if(user.getChannelList() == null){
            user.setChannelList(new ArrayList<Channel>());
        }
        if(channel.getUserList() == null){
            channel.setUserList(new ArrayList<User>());
        }
        if(!user.getChannelList().contains(channel)){
            user.getChannelList().add(channel);
        }
        if(!channel.getUserList().contains(user)){
            channel.getUserList().add(user);
        }

        channelRepository.save(channel);

        return new UserAddSuccessMessageDTO(channel.getName(), user.getEmail(), "User added successfully.");
    }
    @Transactional
    public DeliverySuccessMessageDTO sendMessage(String channelName, MessageDTO messageDTO) throws Exception {
        Channel channel = channelRepository.findByName(channelName)
                .orElseThrow(()->new Exception("Channel does not exist..."));
        User user = userRepository.getByEmail(messageDTO.userEmail())
                .orElseThrow(()->new Exception("Invalid user..."));
        Message message = new Message();
        message.setContent(messageDTO.message());
        message.setChannel(channel);
        message.setSender(user);

        if(user.getMessageList() == null){
            user.setMessageList(new ArrayList<Message>());
        }
        if(channel.getMessageList() == null){
            channel.setMessageList(new ArrayList<Message>());
        }

        user.getMessageList().add(message);
        channel.getMessageList().add(message);

        messageRepository.save(message);
        return new DeliverySuccessMessageDTO(channelName, user.getEmail(), messageDTO.message());
    }
    public List<MemberDTO> findAllMember(String channelName){
        Channel channel = channelRepository.findByName(channelName)
                .orElseThrow(()->new RuntimeException("Channel Not found..."));
        return channel.getUserList().stream()
                .map(member->new MemberDTO(member.getId(), member.getEmail()))
                .toList();
    }
}
