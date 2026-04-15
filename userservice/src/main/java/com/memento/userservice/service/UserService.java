package com.memento.userservice.service;

import com.memento.userservice.dto.RegisterRequest;
import com.memento.userservice.dto.UserResponse;
import com.memento.userservice.model.User;
import com.memento.userservice.repository.UserRepository;
import jakarta.validation.Valid;
import org.jspecify.annotations.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    public UserResponse registerUser(@Valid RegisterRequest registerRequest) {

        if (userRepository.existsByEmail(registerRequest.getEmail())) {

            User existingUser = userRepository.findByEmail(registerRequest.getEmail());

            UserResponse userResponse = new UserResponse();

            userResponse.setId(existingUser.getId());
            userResponse.setEmail(existingUser.getEmail());
            userResponse.setPassword(existingUser.getPassword());
            userResponse.setFirstName(existingUser.getFirstName());
            userResponse.setLastName(existingUser.getLastName());
            userResponse.setProvider(existingUser.getProvider());
            userResponse.setVerified(existingUser.getVerified());
            userResponse.setActive(existingUser.getActive());
            userResponse.setCreatedAt(existingUser.getCreatedAt());
            userResponse.setUpdatedAt(existingUser.getUpdatedAt());

            return userResponse;

        }

        User user = new User();

        user.setEmail(registerRequest.getEmail());
        user.setPassword(registerRequest.getPassword());
        user.setFirstName(registerRequest.getFirstName());
        user.setLastName(registerRequest.getLastName());
        user.setVerified(registerRequest.getVerified());
        user.setActive(registerRequest.getActive());

        User savedUser = userRepository.save(user);

        UserResponse userResponse = new UserResponse();

        userResponse.setId(savedUser.getId());
        userResponse.setEmail(savedUser.getEmail());
        userResponse.setPassword(savedUser.getPassword());
        userResponse.setFirstName(savedUser.getFirstName());
        userResponse.setLastName(savedUser.getLastName());
        userResponse.setProvider(savedUser.getProvider());
        userResponse.setVerified(savedUser.getVerified());
        userResponse.setActive(savedUser.getActive());
        userResponse.setCreatedAt(savedUser.getCreatedAt());
        userResponse.setUpdatedAt(savedUser.getUpdatedAt());

        return userResponse;

    }


    public UserResponse getUserProfile(String userId) {

        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User Not Found"));

        UserResponse userResponse = new UserResponse();

        userResponse.setId(user.getId());
        userResponse.setEmail(user.getEmail());
        userResponse.setPassword(user.getPassword());
        userResponse.setFirstName(user.getFirstName());
        userResponse.setLastName(user.getLastName());
        userResponse.setProvider(user.getProvider());
        userResponse.setVerified(user.getVerified());
        userResponse.setActive(user.getActive());
        userResponse.setCreatedAt(user.getCreatedAt());
        userResponse.setUpdatedAt(user.getUpdatedAt());

        return userResponse;
    }
}
