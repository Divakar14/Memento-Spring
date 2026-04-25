package com.memento.userservice.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import com.memento.userservice.dto.ProfileUpdateRequest;
import com.memento.userservice.dto.UserResponse;
import com.memento.userservice.dto.UserStatsResponse;
import com.memento.userservice.model.User;
import com.memento.userservice.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    /**
     * Get or create a user profile (for first-time login via Keycloak)
     */
    public User getOrCreateUser(Jwt jwt) {
        if (jwt == null) {
            throw new RuntimeException("Authenticated JWT is required");
        }

        String userId = jwt.getSubject();
        String email = jwt.getClaimAsString("email");
        String firstName = jwt.getClaimAsString("given_name");
        String lastName = jwt.getClaimAsString("family_name");

        Optional<User> existingUser = userRepository.findById(userId);

        if (existingUser.isPresent()) {
            User user = existingUser.get();
            user.setLastLoginAt(LocalDateTime.now());
            return userRepository.save(user);
        }

        // First-time login: create user profile
        User newUser = new User();
        newUser.setId(userId);
        newUser.setEmail(email);
        newUser.setFirstName(firstName);
        newUser.setLastName(lastName);
        newUser.setDisplayName(buildDisplayName(firstName, lastName, email));
        newUser.setLastLoginAt(LocalDateTime.now());
        newUser.setProjectsCreated(0L);
        newUser.setTasksCreated(0L);
        newUser.setNotesCreated(0L);

        return userRepository.save(newUser);
    }

    public UserResponse getCurrentUserProfile(Jwt jwt) {
        return mapToUserResponse(getOrCreateUser(jwt));
    }

    public UserStatsResponse getCurrentUserStats(Jwt jwt) {
        return mapToUserStats(getOrCreateUser(jwt));
    }

    /**
     * Get user profile by ID
     */
    public UserResponse getUserProfile(String userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        return mapToUserResponse(user);
    }

    /**
     * Update user profile
     */
    public UserResponse updateUserProfile(String userId, ProfileUpdateRequest request) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        if (request.getFirstName() != null) {
            user.setFirstName(request.getFirstName());
        }
        if (request.getLastName() != null) {
            user.setLastName(request.getLastName());
        }
        if (request.getDisplayName() != null) {
            user.setDisplayName(request.getDisplayName());
        }
        if (request.getAvatarUrl() != null) {
            user.setAvatarUrl(request.getAvatarUrl());
        }

        User updatedUser = userRepository.save(user);
        return mapToUserResponse(updatedUser);
    }

    /**
     * Get user statistics
     */
    public UserStatsResponse getUserStats(String userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        return mapToUserStats(user);
    }

    /**
     * Increment projects count
     */
    public void incrementProjectCount(String userId) {
        User user = userRepository.findById(userId)
            .orElse(null);
        if (user != null) {
            user.setProjectsCreated(defaultCount(user.getProjectsCreated()) + 1L);
            userRepository.save(user);
        }
    }

    /**
     * Increment tasks count
     */
    public void incrementTaskCount(String userId) {
        User user = userRepository.findById(userId)
            .orElse(null);
        if (user != null) {
            user.setTasksCreated(defaultCount(user.getTasksCreated()) + 1L);
            userRepository.save(user);
        }
    }

    /**
     * Increment notes count
     */
    public void incrementNoteCount(String userId) {
        User user = userRepository.findById(userId)
            .orElse(null);
        if (user != null) {
            user.setNotesCreated(defaultCount(user.getNotesCreated()) + 1L);
            userRepository.save(user);
        }
    }

    // Helper method
    private UserResponse mapToUserResponse(User user) {
        UserResponse response = new UserResponse();
        response.setId(user.getId());
        response.setEmail(user.getEmail());
        response.setFirstName(user.getFirstName());
        response.setLastName(user.getLastName());
        response.setDisplayName(user.getDisplayName());
        response.setAvatarUrl(user.getAvatarUrl());
        response.setLastLoginAt(user.getLastLoginAt());
        response.setCreatedAt(user.getCreatedAt());
        response.setUpdatedAt(user.getUpdatedAt());
        return response;
    }

    private UserStatsResponse mapToUserStats(User user) {
        return new UserStatsResponse(
            defaultCount(user.getProjectsCreated()),
            defaultCount(user.getTasksCreated()),
            defaultCount(user.getNotesCreated()),
            user.getLastLoginAt(),
            user.getCreatedAt()
        );
    }

    private Long defaultCount(Long value) {
        return value != null ? value : 0L;
    }

    private String buildDisplayName(String firstName, String lastName, String email) {
        String joinedName = String.join(" ",
            firstName != null ? firstName : "",
            lastName != null ? lastName : "").trim();
        return !joinedName.isEmpty() ? joinedName : email;
    }
}

