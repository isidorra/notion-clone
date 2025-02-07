package com.notion_clone.backend.collection;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.TextIndexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "page")
@Data
public class Page {
    @Id
    private String id;
    private String title;
    private String content;
    private String icon;
    private Date createdAt;
    private Date updatedAt;
    private String userId;
    private String parentPageId;
}
