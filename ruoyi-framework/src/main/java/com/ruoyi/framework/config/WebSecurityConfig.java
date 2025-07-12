package com.ruoyi.framework.config;

import com.ruoyi.framework.security.filter.JwtAuthenticationTokenFilter;
import com.ruoyi.framework.security.handle.AccessDeniedHandlerImpl;
import com.ruoyi.framework.security.handle.AuthenticationEntryPointImpl;
import com.ruoyi.framework.security.handle.LogoutSuccessHandlerImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


/**
 * https://blog.csdn.net/qq_74312711/article/details/134558633
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class WebSecurityConfig
{
    /**
     * 自定义用户认证逻辑
     */
    @Autowired
    private UserDetailsService userDetailsService;

    /**
     * 权限不足处理逻辑
     */
    @Autowired
    private AccessDeniedHandlerImpl accessDeniedHandler;

    /**
     * 退出处理类
     */
    @Autowired
    private LogoutSuccessHandlerImpl logoutSuccessHandler;

    /**
     * 认证失败处理类
     */
    @Autowired
    private AuthenticationEntryPointImpl unauthorizedHandler;

    /**
     * 自定义用于认证的过滤器
     */
    @Autowired
    private JwtAuthenticationTokenFilter jwtAuthenticationTokenFilter;

    @Bean
    public PasswordEncoder passwordEncoder()
    {
        return new BCryptPasswordEncoder();
    }


    /**
     * 身份验证管理器
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception
    {
        return authenticationConfiguration.getAuthenticationManager();
    }

    /**
     * 处理身份验证
     */
    @Bean
    public AuthenticationProvider authenticationProvider()
    {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        //使用自定义的用户校验
        authenticationProvider.setUserDetailsService(userDetailsService);
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception
    {
        httpSecurity.authorizeHttpRequests((requests)->{
                // 允许所有OPTIONS请求
                requests.requestMatchers(HttpMethod.OPTIONS,"/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/oauth/login").permitAll()
                        .anyRequest()
                        .authenticated();
        });

        httpSecurity.authenticationProvider(authenticationProvider());

        //禁用csrf保护
        httpSecurity.csrf(AbstractHttpConfigurer::disable);
        //禁用登录页面
        httpSecurity.formLogin(AbstractHttpConfigurer::disable);
        //禁用登出页面
        httpSecurity.logout(logout -> logout.logoutUrl("/logout").logoutSuccessHandler(logoutSuccessHandler));
        //禁用session
        httpSecurity.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        // 认证失败处理类
        httpSecurity.exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler));
        //权限不足处理逻辑
        httpSecurity.exceptionHandling(exception -> exception.accessDeniedHandler(accessDeniedHandler));

        //把token验证过滤器添加到过滤器链中
        httpSecurity.addFilterBefore(jwtAuthenticationTokenFilter, UsernamePasswordAuthenticationFilter.class);

        return httpSecurity.build();
    }



    @Bean
    public WebSecurityCustomizer webSecurityCustomizer(){
        return (web)->web.ignoring().requestMatchers(
                "/profile/**","auth/user/export"
        );
    }


}