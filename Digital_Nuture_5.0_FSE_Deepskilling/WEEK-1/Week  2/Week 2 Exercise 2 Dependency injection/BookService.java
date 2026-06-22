package com.library.service;

import com.library.repository.BookRepository;

public class BookService {
    private BookRepository bookRepository;

    public BookRepository getBookRepository() {
        return bookRepository;
    }

    public void setBookRepository(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
        System.out.println("BookRepository injected into BookService via setter.");
    }

    public BookService() {
        System.out.println("Book service class created");
    }

    public void info() {
        System.out.println("Book repository name: " + bookRepository.getName());
    }
}
