package com.example.slackx.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name="messages")
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String content;

    @ManyToOne
    @JoinColumn(name="channel_id")
    @JsonIgnore
    private Channel channel;

    @ManyToOne
    @JoinColumn(name="user_id")
    @JsonIgnore
    private User sender;
}
