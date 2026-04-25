package com.example.slackx.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name="channels")
public class Channel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String name;

    @OneToMany(mappedBy = "channel", cascade=CascadeType.ALL)
    private List<Message> messageList;

    @ManyToMany
    @JoinTable(
            name = "channel_table",
            joinColumns = {@JoinColumn(name = "channel_id")},
            inverseJoinColumns = {@JoinColumn(name = "user_id")}
    )
    private List<User> userList;
}
