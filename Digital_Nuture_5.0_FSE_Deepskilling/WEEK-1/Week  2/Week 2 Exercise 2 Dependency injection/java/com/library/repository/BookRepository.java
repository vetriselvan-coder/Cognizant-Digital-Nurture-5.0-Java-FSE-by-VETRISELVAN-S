package com.library.repository;

import org.springframework.stereotype.Component;


public class BookRepository {
    String name;

    public BookRepository(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BookRepository() {
        System.out.println("Book repository created");
    }
}
