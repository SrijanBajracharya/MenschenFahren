package com.insightfools.menschen.module.category.service.impl;

import java.util.logging.Level;
import java.util.logging.Logger;

import javax.inject.Inject;

import com.insightfools.menschen.exception.NotFoundException;
import com.insightfools.menschen.exception.SaveFailException;
import com.insightfools.menschen.module.category.dao.CategoryDao;
import com.insightfools.menschen.module.category.entity.Category;
import com.insightfools.menschen.module.category.service.CategoryService;

/**
 * 
 * @author Srijan Bajracharya<srijan.bajracharya@gmail.com>
 *
 */
public class CategoryServiceImpl implements CategoryService {

    @Inject
    private CategoryDao categoryDao;

    @Inject
    private Logger logger;

    public void categoryFunctions(Long categoryId, String name, String title, String description)
            throws SaveFailException, NotFoundException {
        try {
            if (categoryId != null) {
                Category category = categoryDao.findByPk(categoryId);
                if (category != null) {
                    mergeCategory(category, name, title, description);
                }
            } else {
                saveCategory(name, title, description);
            }
        } catch (NotFoundException e) {
            logger.log(Level.SEVERE, "Not Found Exception: category could not found from categoryId", e);
            throw new NotFoundException();
        }
    }

    /**
     * Handles persist functionality of {@link Category}
     * 
     * @param name
     * @param title
     * @param description
     * @return {@link Category}
     * @throws SaveFailException
     */
    private Category saveCategory(String name, String title, String description) throws SaveFailException {
        Category category = new Category();
        category.setDescription(description);
        category.setName(name);
        category.setTitle(title);
        category.setStatus(Boolean.FALSE);
        return categoryDao.persist(category);
    }

    /**
     * Handles merge functionality of {@link Category}
     * 
     * @param category
     * @param name
     * @param title
     * @param description
     * @return {@link Category}
     * @throws SaveFailException
     */
    private Category mergeCategory(Category category, String name, String title, String description) throws SaveFailException {
        category.setDescription(description);
        category.setName(name);
        category.setTitle(title);
        return categoryDao.merge(category);
    }
}
