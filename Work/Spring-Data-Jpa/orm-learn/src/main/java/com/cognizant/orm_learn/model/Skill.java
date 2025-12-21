package com.cognizant.orm_learn.model;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
// import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@Entity
@Table(name="skill")
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Skill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    @Column(name="sk_id")
    private int id;   

    @Column(name="sk_name")
    private String name;


    @ToString.Exclude
    @ManyToMany(mappedBy = "skills",fetch = FetchType.LAZY)
    Set<Employee> employees = new HashSet<>();
}
