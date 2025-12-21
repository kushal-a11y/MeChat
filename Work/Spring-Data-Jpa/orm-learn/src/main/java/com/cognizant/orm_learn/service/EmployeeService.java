package com.cognizant.orm_learn.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognizant.orm_learn.model.Employee;
import com.cognizant.orm_learn.model.Skill;
import com.cognizant.orm_learn.repository.EmployeeRepository;

import jakarta.transaction.Transactional;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;

    //getting employee by id(pk)
    @Transactional
    public Employee get(Integer id){
        return employeeRepository.findById(id)
        .orElseThrow(()->new RuntimeException("Wmployee does not exist with id " + id));
    } 

    // @Transactional
    public List<Skill> getSkillsOfPermanentEmployees(){
        List<Skill> skills = new ArrayList<Skill>();
        List<Employee> permanentEmployees = employeeRepository.getAllPermanentEmployees();
        permanentEmployees.forEach(e -> skills.addAll(e.getSkills()));
        return skills;
    }
    public void save(Employee employee){
        employeeRepository.save(employee);
    }
}
