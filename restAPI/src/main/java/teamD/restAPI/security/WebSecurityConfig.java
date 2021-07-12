package teamD.restAPI.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import teamD.restAPI.config.JwtTokenConfigurer;
import teamD.restAPI.config.JwtTokenProvider;
import teamD.restAPI.services.AppUserService;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private AppUserService appUserService;

    @Autowired
    JwtTokenProvider jTokenProvider;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.cors();
        httpSecurity.csrf().disable().authorizeRequests().antMatchers("/signup", "/auth","/product/**", "/products/**" , "/order/**","/category","/user/**").permitAll().anyRequest()
                .fullyAuthenticated().and().httpBasic();
        httpSecurity.apply(new JwtTokenConfigurer(jTokenProvider));

    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    // @Override
    // protected void configure(AuthenticationManagerBuilder
    // authenticationManagerBuilder) throws Exception {
    // }

    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider() {
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setPasswordEncoder(bCryptPasswordEncoder);
        daoAuthenticationProvider.setUserDetailsService(appUserService);

        return daoAuthenticationProvider;

    }

}
