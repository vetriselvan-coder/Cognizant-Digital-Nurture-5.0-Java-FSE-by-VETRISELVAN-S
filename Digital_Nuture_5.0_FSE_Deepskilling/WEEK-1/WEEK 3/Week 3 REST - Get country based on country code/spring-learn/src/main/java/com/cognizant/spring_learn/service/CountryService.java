package com.cognizant.spring_learn.service;

import com.cognizant.spring_learn.Country;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CountryService {

    public Country getCountry(String code){
        ApplicationContext context = new ClassPathXmlApplicationContext("country.xml");
        List<Country> countries = context.getBean("countrylist",java.util.ArrayList.class);
        code = code.toLowerCase();
        for(Country country : countries){
            if(code.equals(country.getCode().toLowerCase())){
                return country;
            }
        }
        return null;
    }
}
