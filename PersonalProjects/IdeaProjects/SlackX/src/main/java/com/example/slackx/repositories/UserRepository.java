package com.example.slackx.repositories;

import com.example.slackx.models.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);

    @Modifying
    @Transactional
    void deleteByEmail(String email);

    Optional<User> getByEmail(String email);

}
