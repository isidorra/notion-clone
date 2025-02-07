package com.notion_clone.backend.dto.auth;

import lombok.Data;

@Data
public class AuthenticationResponse {
    private String jwt;
    private String id;
    private String name;
}
