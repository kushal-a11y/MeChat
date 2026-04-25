package com.example.slackx.services;

import com.example.slackx.dto.ChannelDTO;
import com.example.slackx.models.Channel;
import com.example.slackx.models.User;
import com.example.slackx.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User createUser(User newUser){
        return userRepository.save(newUser);
    }

    public User createUser(String email, String password){
        if(userRepository.existsByEmail(email)) return userRepository.getByEmail(email).orElse(null);
        User newUser = new User();
        newUser.setEmail(email);
        newUser.setPassword(password);
        return userRepository.save(newUser);
    }

    @Transactional
    public void deleteUserByEmail(String email) throws Exception{
        if(!userRepository.existsByEmail(email)){
            throw new RuntimeException("No user is registered with this email!!");
        }
        userRepository.deleteByEmail(email);
    }

    public User getUserByEmail(String email){
        return userRepository.getByEmail(email).orElse(null);
    }

    public List<ChannelDTO> findAllChannels(String email){
        User user = userRepository.getByEmail(email).orElse(null);
        assert user != null;
        return user.getChannelList().stream()
                .map(channel -> new ChannelDTO(channel.getId(), channel.getName()))
                .toList();
    }
}
