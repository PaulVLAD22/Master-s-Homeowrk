package com.example.backend.dto;

import com.example.backend.enums.PayerType;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PaymentOrderDto {
    String payerName;
    String payerIban;
    PayerType payerType;
    int sum;
    String receiverName;
    String receiverIban;
}
