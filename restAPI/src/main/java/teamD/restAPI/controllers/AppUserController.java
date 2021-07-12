package teamD.restAPI.controllers;

import java.util.List;
import javax.validation.Valid;

import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import teamD.restAPI.config.JwtTokenProvider;
import teamD.restAPI.model.AppUser;
import teamD.restAPI.model.AppUserRole;
import teamD.restAPI.repos.AppUserRepository;
import teamD.restAPI.services.AppUserService;

@RestController
@CrossOrigin("http://localhost:3000")
public class AppUserController {

    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    private AppUserService appUserService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @GetMapping("/welcome")
    public String welcome() {
        return "Welcome";
    }


    @PostMapping("/signup")
    public ResponseEntity<String> register(@Valid @RequestBody AppUser appUser, Errors errors) {
      
        appUser.setAppUserRole(AppUserRole.USER);
        appUserService.appUserRegister(appUser);
        return new ResponseEntity<>("Berhasil Mendaftar", HttpStatus.OK);
    }

    @PostMapping(value = "/auth")
    public ResponseEntity<String> authenticate(@RequestBody AppUser user) {
        JSONObject jsonObject = new JSONObject();
        try {
            Authentication authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));

            if (authentication.isAuthenticated()) {
                String email = user.getEmail();
                jsonObject.put("name", authentication.getName());
                jsonObject.put("authorities", authentication.getAuthorities());
                jsonObject.put("userId", appUserService.findIdByUsername(authentication.getName()));
                jsonObject.put("token",
                        tokenProvider.createToken(email, appUserRepository.findByEmail(email).get().getAppUserRole()));
                return new ResponseEntity<String>(jsonObject.toString(), HttpStatus.OK);
            }
        } catch (JSONException e) {
            try {
                jsonObject.put("exception", e.getMessage());
            } catch (JSONException e1) {
                e1.printStackTrace();
            }
            return new ResponseEntity<String>(jsonObject.toString(), HttpStatus.UNAUTHORIZED);
        }
        return null;
    }

    @GetMapping("/user/{id}")
    public AppUser findById(@PathVariable Long id) {
        return appUserService.findById(id).get();
    }

    @PostMapping("/user/edit/")
    public void updateUser(@RequestBody AppUser user) {
        appUserService.updateUser(user);
    }

    @GetMapping("user/all")
    public List<AppUser> getAllUser() {
        return appUserService.getAll();
    }

    @PostMapping(value = "/check")
    public String isValid(){
        return "Token Valid";
    } 
    @PostMapping("user/set")
    public void setRole(@RequestBody AppUser user) {
        appUserService.setRole(user);
        }
}
