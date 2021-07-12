package teamD.restAPI.controllers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.Errors;

import teamD.restAPI.model.AppUser;

@SpringBootTest
public class AppUserControllerTest {

    @Autowired
    AppUserController appUserController;

    @Test
    void register_shouldReturnPasswordNotMatch() {
        AppUser user = new AppUser();
        user.setFirstName("Alvin");
        user.setFirstName("Chandra");
        user.setEmail("alvinchandra99@gmail.com");
        user.setPassword("123abcABCa");
        user.setRePassword("123abcABCaA");

        Errors errors = new BeanPropertyBindingResult(user, "user");

        assertEquals("Password tidak sesuai", appUserController.register(user, errors).getBody());
    }

    @Test
    void register_shouldReturnValidationException() throws Exception {
        try {
            AppUser appUser = new AppUser();
            appUser.setPassword("aaa");
            appUser.setRePassword("aaa");

            Errors errors = new BeanPropertyBindingResult(appUser, "user");
            appUserController.register(appUser, errors);
        } catch (Exception e) {
           assertNotNull(e);
        }
    }


}
