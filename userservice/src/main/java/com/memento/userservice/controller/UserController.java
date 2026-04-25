package com.memento.userservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.memento.userservice.dto.ProfileUpdateRequest;
import com.memento.userservice.dto.UserResponse;
import com.memento.userservice.dto.UserStatsResponse;
import com.memento.userservice.security.JwtUtil;
import com.memento.userservice.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    /**
     * Get current user's profile (authenticated)
     */
    @GetMapping("/profile")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<UserResponse> getCurrentUserProfile() {
        return ResponseEntity.ok(userService.getCurrentUserProfile(jwtUtil.getToken()));
    }

    /**
     * Update current user's profile
     */
    @PutMapping("/profile")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<UserResponse> updateUserProfile(@Valid @RequestBody ProfileUpdateRequest request) {
        String userId = jwtUtil.getCurrentUserId();
        return ResponseEntity.ok(userService.updateUserProfile(userId, request));
    }

    /**
     * Get user profile by ID (admin or user own profile)
     */
    @GetMapping("/{userId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<UserResponse> getUserProfile(@PathVariable String userId) {
        return ResponseEntity.ok(userService.getUserProfile(userId));
    }

    /**
     * Get current user's statistics
     */
    @GetMapping("/stats")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<UserStatsResponse> getCurrentUserStats() {
        return ResponseEntity.ok(userService.getCurrentUserStats(jwtUtil.getToken()));
    }

    /**
     * Get specific user's statistics (accessible to admins or the user themselves)
     */
    @GetMapping("/{userId}/stats")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<UserStatsResponse> getUserStats(@PathVariable String userId) {
        return ResponseEntity.ok(userService.getUserStats(userId));
    }

    /**
     * Health check endpoint (public)
     */
    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("User Service is running");
    }
}

