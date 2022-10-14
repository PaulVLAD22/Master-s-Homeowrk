package com.example.backend.Exception;

public class InvalidDataParameters extends Exception{
    public InvalidDataParameters(String errorMessage){
        super(errorMessage);
    }

}
