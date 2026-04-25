package com.example.slackx.services;

import com.example.slackx.models.Profile;
import com.example.slackx.models.User;
import com.example.slackx.repositories.ProfileRepository;
import com.example.slackx.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {
    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;


    public ProfileService(ProfileRepository profileRepository, UserRepository userRepository){
        this.profileRepository = profileRepository;
        this.userRepository = userRepository;
    }
    @Transactional
    public Profile createProfile(User user, String bio){
        Profile newProfile = new Profile();

        newProfile.setUser(user);
        newProfile.setBio(bio);

        user.setProfile(newProfile);
        newProfile = profileRepository.save(newProfile);
        userRepository.save(user);

        return newProfile;
    }
}
