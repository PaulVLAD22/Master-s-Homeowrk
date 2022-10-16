package com.example.backend.dto;

import com.example.backend.enums.PayerType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PaymentOrderDto {
    String payerName;
    String payerIban;
    PayerType payerType;
    Long sum;
    String receiverName;
    String receiverIban;
}
