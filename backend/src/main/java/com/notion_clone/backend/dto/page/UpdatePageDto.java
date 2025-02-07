package com.notion_clone.backend.dto.page;

import lombok.Data;

import java.util.Date;

@Data
public class UpdatePageDto {
    private String id;
    private String title;
    private String content;
    private String icon;
}
