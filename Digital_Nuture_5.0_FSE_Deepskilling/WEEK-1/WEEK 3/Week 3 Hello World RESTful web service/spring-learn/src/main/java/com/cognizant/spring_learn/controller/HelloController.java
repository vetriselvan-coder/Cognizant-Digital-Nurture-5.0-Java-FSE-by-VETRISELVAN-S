package com.cognizant.spring_learn.controller;

import com.cognizant.spring_learn.SpringLearnApplication;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
    private static final Logger LOGGER = LoggerFactory.getLogger(SpringLearnApplication.class);
    @GetMapping("hello")
    public String sayHello(){
        LOGGER.debug("START sayHello() method");
        String msg = "Hello World";
        LOGGER.debug("END sayHello() method");
        return msg;
    }
}
