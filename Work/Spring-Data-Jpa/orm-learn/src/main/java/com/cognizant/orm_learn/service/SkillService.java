package com.cognizant.orm_learn.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognizant.orm_learn.model.Skill;
import com.cognizant.orm_learn.repository.SkillRepository;

@Service
public class SkillService {
    @Autowired
    private SkillRepository skillRepository;
    
    public Skill get(int id){
        return skillRepository.findById(id)
            .orElseThrow(()->new RuntimeException("Skill not found."));
    }
}
