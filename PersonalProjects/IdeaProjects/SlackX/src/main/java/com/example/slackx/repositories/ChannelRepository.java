package com.example.slackx.repositories;

import com.example.slackx.models.Channel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChannelRepository extends JpaRepository<Channel, Long> {
    boolean existsByName(String name);
    Optional<Channel> findByName(String name);
}
