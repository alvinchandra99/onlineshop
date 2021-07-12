package teamD.restAPI.services;

import java.util.Optional;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import teamD.restAPI.model.AppUser;
import teamD.restAPI.repos.AppUserRepository;

@Service
@Transactional
public class AppUserService implements UserDetailsService {

    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return appUserRepository.findByEmail(email).orElseThrow(
                () -> new UsernameNotFoundException(String.format("User with email '%s' Not Found", email)));
    }

    public AppUser appUserRegister(AppUser appUser) {
        boolean userExist = appUserRepository.findByEmail(appUser.getEmail()).isPresent();
        if (userExist) {
            throw new RuntimeException(String.format("User with email '%s' already registed", appUser.getEmail()));
        }

        String encodedPassword = bCryptPasswordEncoder.encode(appUser.getPassword());
        appUser.setPassword(encodedPassword);

        return appUserRepository.save(appUser);
    }

    public Long findIdByUsername(String username) {
        return appUserRepository.findByEmail(username).get().getId();
    }
    
    public Optional<AppUser> findById(Long id) {
        return appUserRepository.findById(id);
    }

    public void updateUser(AppUser user) {
        AppUser tempUser = appUserRepository.findById(user.getId()).get();
        tempUser.setFirstName(user.getFirstName());
        tempUser.setLastName(user.getLastName());
        tempUser.setAddress(user.getAddress());
    }
    
    public List<AppUser> getAll() {
        List<AppUser> users = appUserRepository.findAll();
        return users;
    }

    public void setRole(AppUser user) {
        AppUser tempUser = appUserRepository.findById(user.getId()).get();
        tempUser.setAppUserRole(user.getAppUserRole());
    }
}
