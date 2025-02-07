package com.notion_clone.backend.service.page;

import com.notion_clone.backend.collection.Page;
import com.notion_clone.backend.dto.page.UpdatePageDto;

import java.util.List;
import java.util.Optional;

public interface IPageService {
    Page create(String parentPageId);
    List<Page> getRootPages();
    List<Page> getByParentPageId(String parentPageId);
    List<Page> getAll();
    Optional<Page> getById(String id);
    List<String> delete(String id);
    void deleteNestedPages(String parentPageId, List<String> deletedPagesIds);
    Page update(UpdatePageDto updatePageDto);
    List<Page> search(String query);
}
