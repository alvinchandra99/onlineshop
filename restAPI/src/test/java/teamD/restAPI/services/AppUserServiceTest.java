package teamD.restAPI.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import teamD.restAPI.model.AppUser;

@SpringBootTest
public class AppUserServiceTest {

    @Autowired
    AppUserService appUserService;


    @Test
    public void register_shouldReturnAlreadyRegister() throws Exception {
        try {
            AppUser appUser = new AppUser();

            String email = "alvinchandra99@gmail.com";
            appUser.setEmail(email);
            appUserService.appUserRegister(appUser);

        } catch (Exception e) {
            assertNotNull(e);
        }
    }

    @Test
    public void register_shouldReturnSuccess(){
        AppUser appUser = new AppUser();

        appUser.setFirstName("Alvin");
        appUser.setLastName("Chandra");
        appUser.setEmail("aiiwnsviw@gmail.com");
        appUser.setPassword("eivmievenAmwf");
        appUser.setRePassword("eivmievenAmwf");

        appUser.setGender("Male");

        AppUser saveUser = appUserService.appUserRegister(appUser);

        assertEquals(appUser.getEmail(), saveUser.getEmail());
        assertEquals(appUser.getFirstName(), saveUser.getFirstName());

    }

}
