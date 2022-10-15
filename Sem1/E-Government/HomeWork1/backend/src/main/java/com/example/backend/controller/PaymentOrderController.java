package com.example.backend.controller;

import com.example.backend.exception.InvalidDataParametersException;
import com.example.backend.dto.PaymentOrderDto;
import com.example.backend.exception.NullFieldsException;
import com.example.backend.service.PaymentOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
@RequiredArgsConstructor
public class PaymentOrderController {
    private final PaymentOrderService paymentOrderService;

    @PostMapping("/add")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity addPaymentOrder(@RequestBody PaymentOrderDto paymentOrderDto
    ) {
        try {
            return ResponseEntity.ok(paymentOrderService.save(paymentOrderDto));
        } catch (InvalidDataParametersException | NullFieldsException e) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

}
