package com.example.slackx.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name="users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String email;
    private String password;

    @OneToMany(mappedBy = "sender", cascade=CascadeType.ALL)
    private List<Message> messageList;

    @OneToOne(mappedBy = "user", cascade=CascadeType.ALL)
    private Profile profile;

    @ManyToMany(mappedBy = "userList")
    private List<Channel> channelList;
}
