package com.notion_clone.backend.controller;

import com.notion_clone.backend.collection.User;
import com.notion_clone.backend.dto.auth.AuthenticationResponse;
import com.notion_clone.backend.dto.auth.LoginRequest;
import com.notion_clone.backend.dto.auth.RegisterRequest;
import com.notion_clone.backend.dto.user.UserDto;
import com.notion_clone.backend.repository.IUserRepository;
import com.notion_clone.backend.service.auth.IAuthService;
import com.notion_clone.backend.service.user.IUserService;
import com.notion_clone.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private IAuthService authService;
    @Autowired
    private IUserRepository userRepository;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private IUserService userService;
    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        if (registerRequest.getName() == null || registerRequest.getName().isEmpty() ||
                registerRequest.getEmail() == null || registerRequest.getEmail().isEmpty() ||
                registerRequest.getPassword() == null || registerRequest.getPassword().isEmpty() ||
                registerRequest.getConfirmPassword() == null || registerRequest.getConfirmPassword().isEmpty()) {
            return ResponseEntity.status(400).body("All fields are required.");
        }

        if(!authService.isEmailFormatValid(registerRequest.getEmail()))
            return ResponseEntity.status(400).body("Invalid email format.");
        if(authService.isEmailTaken(registerRequest.getEmail()))
            return ResponseEntity.status(400).body("Email taken.");
        if(registerRequest.getPassword().length() < 7)
            return ResponseEntity.status(400).body("Password must be at least 7 characters long.");
        if(!registerRequest.getPassword().equals(registerRequest.getConfirmPassword()))
            return ResponseEntity.status(400).body("Passwords must match.");

        UserDto userDto = authService.register(registerRequest);

        final UserDetails userDetails = userService.userDetailsService().loadUserByUsername(registerRequest.getEmail());
        Optional<User> user = userRepository.findByEmail(registerRequest.getEmail());
        final String jwtToken = jwtUtil.generateToken(userDetails);

        AuthenticationResponse authenticationResponse = new AuthenticationResponse();
        if(user.isPresent()) {
            authenticationResponse.setJwt(jwtToken);
            authenticationResponse.setId(user.get().getId());
            authenticationResponse.setName(user.get().getName());
        }

        return ResponseEntity.status(201).body(authenticationResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        if (loginRequest.getEmail() == null || loginRequest.getEmail().isEmpty() ||
                loginRequest.getPassword() == null || loginRequest.getPassword().isEmpty()) {
            return ResponseEntity.status(400).body("All fields are required.");
        }

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        } catch(BadCredentialsException e) {
            return ResponseEntity.status(400).body("Incorrect email or password.");
        }

        final UserDetails userDetails = userService.userDetailsService().loadUserByUsername(loginRequest.getEmail());
        Optional<User> user = userRepository.findByEmail(loginRequest.getEmail());
        final String jwtToken = jwtUtil.generateToken(userDetails);

        AuthenticationResponse authenticationResponse = new AuthenticationResponse();
        if(user.isPresent()) {
            authenticationResponse.setJwt(jwtToken);
            authenticationResponse.setId(user.get().getId());
            authenticationResponse.setName(user.get().getName());
        }

        return ResponseEntity.status(200).body(authenticationResponse);
    }
}
