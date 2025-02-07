package com.notion_clone.backend.controller;

import com.notion_clone.backend.collection.Page;
import com.notion_clone.backend.dto.page.CreatePageDto;
import com.notion_clone.backend.dto.page.UpdatePageDto;
import com.notion_clone.backend.service.page.IPageService;
import com.notion_clone.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/page")
public class PageController {
    @Autowired
    private IPageService pageService;
    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping
    public ResponseEntity<?> create(@RequestBody CreatePageDto createPageDto) {
        Page page = pageService.create(createPageDto.getParentPageId());
        if(page == null)
            return ResponseEntity.status(500).body("Something went wrong.");

        return ResponseEntity.status(201).body(page);
    }

    @GetMapping("/root")
    public ResponseEntity<?> getRootPages() {
        return ResponseEntity.status(200).body(pageService.getRootPages());
    }

    @GetMapping("/children-pages/{id}")
    public ResponseEntity<?> getByParentPageId(@PathVariable String id) {
        Optional<Page> page = pageService.getById(id);

        if(page.isEmpty())
            return ResponseEntity.status(404).body("Page not found.");

        if(!page.get().getUserId().equals(jwtUtil.getLoggedInUser().getId()))
            return ResponseEntity.status(403).body("Forbidden access");

        return ResponseEntity.status(200).body(pageService.getByParentPageId(id));
    }

    @GetMapping("/user-pages")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.status(200).body(pageService.getAll());
    }

    @GetMapping
    public ResponseEntity<?> getById(@RequestParam String pageId) {
        Optional<Page> page = pageService.getById(pageId);

        if(page.isPresent() && !page.get().getUserId().equals(jwtUtil.getLoggedInUser().getId()))
            return ResponseEntity.status(403).body("Forbidden access");

        if(page.isPresent())
            return ResponseEntity.status(200).body(page.get());

        return ResponseEntity.status(404).body("Page not found.");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) {
        Optional<Page> page = pageService.getById(id);
        if(page.isEmpty())
            return ResponseEntity.status(404).body("Page not found.");
        if(!page.get().getUserId().equals(jwtUtil.getLoggedInUser().getId()))
            return ResponseEntity.status(403).body("Forbidden access");

        List<String> deletedPagesIds = pageService.delete(id);
        return ResponseEntity.status(200).body(deletedPagesIds);
    }

    @PutMapping
    public ResponseEntity<?> update(@RequestBody UpdatePageDto updatePageDto) {
        Optional<Page> page = pageService.getById(updatePageDto.getId());
        if(page.isEmpty())
            return ResponseEntity.status(404).body("Page not found.");
        if(!page.get().getUserId().equals(jwtUtil.getLoggedInUser().getId()))
            return ResponseEntity.status(403).body("Forbidden access");

        return ResponseEntity.status(200).body(pageService.update(updatePageDto));
    }

    @GetMapping("/search")
    public ResponseEntity<?> search(@RequestParam String query) {
        return ResponseEntity.status(200).body(pageService.search(query));
    }


}
