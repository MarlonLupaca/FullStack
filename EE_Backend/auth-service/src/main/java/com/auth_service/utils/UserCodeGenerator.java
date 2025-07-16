package com.auth_service.utils;

import java.util.concurrent.ThreadLocalRandom;

import com.auth_service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserCodeGenerator {

    @Autowired
    private UserRepository userRepository;

    public String generateUniqueUserCode() {
        String code;
        do {
            code = generateRandom8DigitNumber();
        } while (userRepository.existsByUserCode(code));
        return code;
    }

    private String generateRandom8DigitNumber() {
        int min = 10000000;
        int max = 99999999;
        int number = ThreadLocalRandom.current().nextInt(min, max + 1);
        return String.valueOf(number);
    }
}
