package com.notion_clone.backend.repository;

import com.notion_clone.backend.collection.Page;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.mongodb.repository.Query;
import java.util.List;


@Repository
public interface IPageRepository extends MongoRepository<Page, String> {
    List<Page> findByUserId(String userId);
    List<Page> findByParentPageId(String parentPageId);

    @Query("{ 'userId': ?0, 'title': { $regex: ?1, $options: 'i' } }")
    List<Page> search(String userId, String query);
}
