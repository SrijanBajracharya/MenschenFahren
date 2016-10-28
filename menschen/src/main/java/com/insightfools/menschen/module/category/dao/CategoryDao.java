package com.insightfools.menschen.module.category.dao;

import java.time.LocalDateTime;
import java.util.List;

import javax.inject.Inject;
import javax.interceptor.Interceptors;
import javax.persistence.EntityManager;

import com.insightfools.menschen.exception.DeleteFailException;
import com.insightfools.menschen.exception.NotFoundException;
import com.insightfools.menschen.exception.SaveFailException;
import com.insightfools.menschen.logger.LogMaker;
import com.insightfools.menschen.module.category.entity.Category;
import com.insightfools.menschen.orm.GenericDao;

@Interceptors({ LogMaker.class })
public class CategoryDao implements GenericDao<Category, Long> {

    @Inject
    private EntityManager em;

    @Override
    public Category persist(Category category) throws SaveFailException {
        category.setRecordedAt(LocalDateTime.now());
        em.persist(category);
        em.flush();
        return category;
    }

    @Override
    public Category merge(Category category) throws SaveFailException {
        category.setRecordedAt(LocalDateTime.now());
        em.merge(category);
        em.flush();
        return category;
    }

    @Override
    public void remove(Category category) throws DeleteFailException {
        em.remove(category);
    }

    @Override
    public void remove(Long id) throws DeleteFailException {
        Category category = em.getReference(Category.class, id);
        em.remove(category);
    }

    @Override
    public List<Category> findAll() {
        return em.createNamedQuery(Category.FIND_ALL, Category.class).getResultList();
    }

    @Override
    public Category findByPk(Long id) throws NotFoundException {
        return em.find(Category.class, id);
    }

}
