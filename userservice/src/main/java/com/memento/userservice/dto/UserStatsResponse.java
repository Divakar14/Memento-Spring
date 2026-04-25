package com.memento.userservice.dto;

import java.time.LocalDateTime;

public class UserStatsResponse {

    private Long projectsCreated;
    private Long tasksCreated;
    private Long notesCreated;
    private LocalDateTime lastLoginAt;
    private LocalDateTime createdAt;

    public UserStatsResponse() {
    }

    public UserStatsResponse(Long projectsCreated, Long tasksCreated, Long notesCreated, LocalDateTime lastLoginAt, LocalDateTime createdAt) {
        this.projectsCreated = projectsCreated;
        this.tasksCreated = tasksCreated;
        this.notesCreated = notesCreated;
        this.lastLoginAt = lastLoginAt;
        this.createdAt = createdAt;
    }

    public Long getProjectsCreated() {
        return projectsCreated;
    }

    public void setProjectsCreated(Long projectsCreated) {
        this.projectsCreated = projectsCreated;
    }

    public Long getTasksCreated() {
        return tasksCreated;
    }

    public void setTasksCreated(Long tasksCreated) {
        this.tasksCreated = tasksCreated;
    }

    public Long getNotesCreated() {
        return notesCreated;
    }

    public void setNotesCreated(Long notesCreated) {
        this.notesCreated = notesCreated;
    }

    public LocalDateTime getLastLoginAt() {
        return lastLoginAt;
    }

    public void setLastLoginAt(LocalDateTime lastLoginAt) {
        this.lastLoginAt = lastLoginAt;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
