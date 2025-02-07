package com.notion_clone.backend.service.auth;

import com.notion_clone.backend.dto.auth.RegisterRequest;
import com.notion_clone.backend.dto.user.UserDto;

public interface IAuthService {
    UserDto register(RegisterRequest registerRequest);
    boolean isEmailTaken(String email);
    boolean isEmailFormatValid(String email);
}
