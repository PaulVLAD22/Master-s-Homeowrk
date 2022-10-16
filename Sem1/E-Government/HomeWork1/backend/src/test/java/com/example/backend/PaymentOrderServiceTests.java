package com.example.backend;

import com.example.backend.dto.PaymentOrderDto;
import com.example.backend.enums.PayerType;
import com.example.backend.exception.InvalidDataParametersException;
import com.example.backend.repository.PaymentOrderRepository;
import com.example.backend.service.PaymentOrderService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
public class PaymentOrderServiceTests {
    private static final String badIban = "RO@!#!#!@";
    private static final String name = "Marian";
    private static final String validIban = "RO62BREL0005505440400100";
    @Autowired
    PaymentOrderService paymentOrderService;
    @MockBean
    PaymentOrderRepository paymentOrderRepository;
    PaymentOrderDto badIbanPaymentOrder = PaymentOrderDto.builder()
            .payerIban(badIban)
            .receiverIban(badIban)
            .sum(2L)
            .payerType(PayerType.RETIRED)
            .receiverName(name)
            .payerName(name)
            .build();

    @Test
    void test_save_bad_iban_payment_order() {
        assertThrows(InvalidDataParametersException.class, () -> paymentOrderService.save(badIbanPaymentOrder));
    }

    @Test
    void test_save_valid_payment_order() {
        PaymentOrderDto validPaymentOrderDto = badIbanPaymentOrder;
        validPaymentOrderDto.setPayerIban(validIban);
        validPaymentOrderDto.setReceiverIban(validIban);
       assertDoesNotThrow(()-> paymentOrderService.save(validPaymentOrderDto));
    }
}
