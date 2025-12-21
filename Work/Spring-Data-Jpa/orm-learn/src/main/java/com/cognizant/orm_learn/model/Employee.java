package com.cognizant.orm_learn.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@Entity
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Table(name="employee")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="em_id")
    @EqualsAndHashCode.Include
    private int id;

    @Column(name="em_name")
    private String name;

    @Column(name="em_salary")
    private BigDecimal salary;

    @Column(name="em_permanent")
    private boolean permanent;

    @Column(name="em_date_of_birth")
    private LocalDate dateOfBirth;

    @ManyToOne
    @JoinColumn(name="em_dp_id")
    @ToString.Exclude
    private Department department;

    @ToString.Exclude
    @ManyToMany
    @JoinTable(
        name="employee_skill",
        joinColumns = @JoinColumn(name="es_em_id"),
        inverseJoinColumns = @JoinColumn(name="es_sk_id")
    )
    private Set<Skill> skills = new HashSet<>();
    
}
