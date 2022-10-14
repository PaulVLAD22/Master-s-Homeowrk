package com.example.backend.service;

import com.example.backend.Exception.InvalidDataParameters;
import com.example.backend.dto.PaymentOrderDto;
import com.example.backend.enums.PayerType;
import com.example.backend.model.PaymentOrder;
import com.example.backend.repository.PaymentOrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PaymentOrderService {
    private final PaymentOrderRepository paymentOrderRepository;

    private boolean isIbanValid(String iban) {

        int IBAN_MIN_SIZE = 15;
        int IBAN_MAX_SIZE = 34;
        long IBAN_MAX = 999999999;
        long IBAN_MODULUS = 97;

        String trimmed = iban.trim();

        if (trimmed.length() < IBAN_MIN_SIZE || trimmed.length() > IBAN_MAX_SIZE) {
            return false;
        }

        String reformat = trimmed.substring(4) + trimmed.substring(0, 4);
        long total = 0;

        for (int i = 0; i < reformat.length(); i++) {

            int charValue = Character.getNumericValue(reformat.charAt(i));

            if (charValue < 0 || charValue > 35) {
                return false;
            }

            total = (charValue > 9 ? total * 100 : total * 10) + charValue;

            if (total > IBAN_MAX) {
                total = (total % IBAN_MODULUS);
            }
        }

        return (total % IBAN_MODULUS) == 1;
    }
    private long calculateDiscountedSum(long sum, PayerType payerType){
        if (payerType.equals(PayerType.EMPLOYEE)) {
            return Math.round(0.8 * sum);
        }else if (payerType.equals(PayerType.RETIRED)){
            return Math.round(0.75 * sum);
        }else if (payerType.equals(PayerType.STUDENT)){
            return Math.round(0.70* sum);
        }else if (payerType.equals(PayerType.OTHER)){
            return sum;
        }
        return sum;
    }
    public PaymentOrder save(PaymentOrderDto paymentOrderDto) throws InvalidDataParameters {
        if (!isIbanValid(paymentOrderDto.getPayerIban())){
            throw new InvalidDataParameters("Invalid Iban");
        }
        return paymentOrderRepository.save(
                PaymentOrder.builder()
                        .sum(calculateDiscountedSum(paymentOrderDto.getSum(),paymentOrderDto.getPayerType()))
                        .receiverIban(paymentOrderDto.getReceiverIban())
                        .payerName(paymentOrderDto.getPayerName())
                        .payerIban(paymentOrderDto.getPayerIban())
                        .payerType(paymentOrderDto.getPayerType())
                        .receiverName(paymentOrderDto.getReceiverName())
                        .build()
        );
    }
}
