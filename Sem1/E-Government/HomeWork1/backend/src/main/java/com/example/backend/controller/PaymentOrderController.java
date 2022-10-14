package com.example.backend.controller;

import com.example.backend.Exception.InvalidDataParameters;
import com.example.backend.dto.PaymentOrderDto;
import com.example.backend.model.PaymentOrder;
import com.example.backend.service.PaymentOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestController
@RequiredArgsConstructor
public class PaymentOrderController {
    private final PaymentOrderService paymentOrderService;

    @PostMapping("/add")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity addPaymentOrder(@RequestBody PaymentOrderDto paymentOrderDto){
        try {
            return ResponseEntity.ok(paymentOrderService.save(paymentOrderDto));
        }
        catch(InvalidDataParameters e){
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

}
