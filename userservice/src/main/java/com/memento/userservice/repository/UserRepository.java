package com.memento.userservice.repository;

import com.memento.userservice.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    
    boolean existsByEmail(String email);

    User findByEmail(String email);
}
