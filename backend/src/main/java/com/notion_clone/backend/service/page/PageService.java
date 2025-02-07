package com.notion_clone.backend.service.page;

import com.notion_clone.backend.collection.Page;
import com.notion_clone.backend.collection.User;
import com.notion_clone.backend.dto.page.UpdatePageDto;
import com.notion_clone.backend.repository.IPageRepository;
import com.notion_clone.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;
import java.util.*;


@Service
public class PageService implements IPageService {
    @Autowired
    private IPageRepository pageRepository;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public Page create(String parentPageId) {
        Page page = new Page();
        User user = jwtUtil.getLoggedInUser();
        page.setTitle("Untitled");
        page.setParentPageId(parentPageId);
        page.setUserId(user.getId());
        page.setCreatedAt(new Date(System.currentTimeMillis()));
        page.setUpdatedAt(new Date(System.currentTimeMillis()));
        page.setIcon("");
        page.setContent("");
        return pageRepository.save(page);
    }

    @Override
    public List<Page> getRootPages() {
        User user = jwtUtil.getLoggedInUser();
        List<Page> userPages = pageRepository.findByUserId(user.getId());
        List<Page> rootPages = new ArrayList<>();

        for(Page page : userPages) {
            if(page.getParentPageId().equals("") || page.getParentPageId().equals(null))
                rootPages.add(page);
        }

        return rootPages;
    }

    @Override
    public List<Page> getByParentPageId(String parentPageId) {
        return pageRepository.findByParentPageId(parentPageId);
    }

    @Override
    public List<Page> getAll() {
        User user = jwtUtil.getLoggedInUser();
        return pageRepository.findByUserId(user.getId());
    }

    @Override
    public Optional<Page> getById(String id) {
        return pageRepository.findById(id);
    }

    @Override
    public List<String> delete(String id) {
        Optional<Page> pageForDeleting = pageRepository.findById(id);
        List<String> deletedPagesIds = new ArrayList<>();

        deleteNestedPages(pageForDeleting.get().getId(), deletedPagesIds);
        pageRepository.deleteById(id);
        deletedPagesIds.add(id);

        return deletedPagesIds;
    }

    @Override
    public void deleteNestedPages(String parentPageId, List<String> deletedPagesIds) {
        List<Page> childrenPages = pageRepository.findByParentPageId(parentPageId);
        for(Page childPage : childrenPages) {
            deleteNestedPages(childPage.getId(), deletedPagesIds);
            pageRepository.deleteById(childPage.getId());
            deletedPagesIds.add(childPage.getId());
        }
    }

    @Override
    public Page update(UpdatePageDto updatePageDto) {
        Optional<Page> optionalPage = pageRepository.findById(updatePageDto.getId());
        Page page = optionalPage.get();

        if (updatePageDto.getTitle() != null && !updatePageDto.getTitle().isEmpty() && !updatePageDto.getTitle().equals(page.getTitle())) {
            page.setTitle(updatePageDto.getTitle());
        } else if (updatePageDto.getTitle() != null && updatePageDto.getTitle().isEmpty()) {
            page.setTitle("Untitled");
        }

        if (updatePageDto.getIcon() != null && !Objects.equals(page.getIcon(), updatePageDto.getIcon())) {
            page.setIcon(updatePageDto.getIcon());
        }


        if (updatePageDto.getContent() != null && !Objects.equals(page.getContent(), updatePageDto.getContent())) {
            page.setContent(updatePageDto.getContent());
        }

        page.setUpdatedAt(new Date(System.currentTimeMillis()));

        return pageRepository.save(page);
    }

    @Override
    public List<Page> search(String query) {
        String userId = jwtUtil.getLoggedInUser().getId();
        return pageRepository.search(userId, query);
    }


}
