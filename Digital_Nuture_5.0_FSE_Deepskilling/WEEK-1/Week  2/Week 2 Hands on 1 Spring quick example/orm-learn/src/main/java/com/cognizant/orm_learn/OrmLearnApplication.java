package com.cognizant.orm_learn;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;

import com.cognizant.orm_learn.service.*;

import jakarta.annotation.PostConstruct;

import com.cognizant.orm_learn.model.*;
import java.util.*;
@SpringBootApplication
public class OrmLearnApplication implements CommandLineRunner{
	
	private static CountryService countryService;
    private static final Logger LOGGER = LoggerFactory.getLogger(OrmLearnApplication.class);

    public static void main(String[] args) {
        ApplicationContext context = SpringApplication.run(OrmLearnApplication.class, args);
        countryService = context.getBean(CountryService.class);
        
        LOGGER.info("Inside main");
        testGetAllCountries();
    }
    private static void testGetAllCountries() {
        // I have implemented the test logic in run method.
    	LOGGER.info("Start");
        List<Country> countries = countryService.getAllCountries();
        LOGGER.debug("countries={}", countries);
        LOGGER.info("End");
    }
	@Override
	public void run(String... args) throws Exception {
		
		
	}

}
