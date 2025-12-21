package com.cognizant.orm_learn.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognizant.orm_learn.repository.CountryRepository;

import org.springframework.transaction.annotation.Transactional;

import com.cognizant.orm_learn.exception.CountryNotFoundException;
import com.cognizant.orm_learn.model.Country;
import java.util.List;
import java.util.Optional;
import java.util.Collections;

@Service
public class CountryService {
    @Autowired
    private CountryRepository countryRepository;
    
    @Transactional
    public List<Country> getAllCountries(){
        return countryRepository.findAll();
    }

    @Transactional
    public Country findCountryByCode(String countryCode) throws CountryNotFoundException{
        Optional<Country> result = countryRepository.findById(countryCode);
        if(!result.isPresent()){
            throw new CountryNotFoundException(
                "Country not found with code " + countryCode
            );
        }
        Country country = result.get();
        return country;
    }
    @Transactional
    public void addCountry(Country country){
        countryRepository.save(country);
    }
    @Transactional
    public void updateCountryName(String countryCode, String name) throws CountryNotFoundException{
        Optional<Country> country = countryRepository.findById(countryCode);
        if(!country.isPresent()) throw new CountryNotFoundException("Country with the code "+ countryCode +"does not exist.");
        Country c = country.get();
        c.setName(name);
        countryRepository.save(c);
    }
    @Transactional
    public void deleteCountry(String countrycode) throws CountryNotFoundException{
        Optional<Country> country = countryRepository.findById(countrycode);
        if(!country.isPresent()) throw new CountryNotFoundException("Country with the code "+ countrycode +"does not exist.");
        Country c = country.get();
        countryRepository.delete(c);
    }
    @Transactional(readOnly = true)
    public List<Country> findCountryByText(String text) throws CountryNotFoundException{
        List<Country> listOfcountries = countryRepository.findByNameContaining(text);
        if(!listOfcountries.isEmpty()) return listOfcountries;
        else throw new CountryNotFoundException("No country found with the key " + text);
    }
    @Transactional(readOnly = true)
    public List<Country> findCountryByTextSorted(String text) throws CountryNotFoundException{
        List<Country> listOfcountries = countryRepository.findByNameContaining(text);
        if(!listOfcountries.isEmpty()){ 
            Collections.sort(listOfcountries, (a,b)-> a.getName().compareTo(b.getName()));
            return listOfcountries;
        }
        else throw new CountryNotFoundException("No country found with the key " + text);
    }
}
