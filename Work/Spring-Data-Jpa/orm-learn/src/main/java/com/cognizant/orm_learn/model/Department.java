package com.cognizant.orm_learn.model;

import java.util.HashSet;
import java.util.Set;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;


@Data
@Entity
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Table(name="department")
public class Department {
   @Id
   @Column(name="dp_id")
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private int id; 

   @Column(name="dp_name")
   private String name;

   @OneToMany(mappedBy = "department")
   @ToString.Exclude
   private Set<Employee> employees = new HashSet<>();
}
