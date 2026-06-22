package com.cognizant.orm_learn.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognizant.orm_learn.repository.CountryRepository;

import jakarta.transaction.Transactional;

import com.cognizant.orm_learn.model.Country;
import java.util.*;
@Service
public class CountryService{
	@Autowired
	private CountryRepository countryRepository;
	
	@Transactional
	public List<Country> getAllCountries(){
		List<Country> list = countryRepository.findAll();
		return list;
	}
	
}