package com.example.backend.exception;

public class InvalidDataParametersException extends Exception{
    public InvalidDataParametersException(String errorMessage){
        super(errorMessage);
    }

}
