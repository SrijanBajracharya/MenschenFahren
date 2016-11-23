package com.insightfools.menschen.module.event.service.impl;

import javax.inject.Inject;

import com.insightfools.menschen.exception.NotFoundException;
import com.insightfools.menschen.exception.SaveFailException;
import com.insightfools.menschen.module.category.dao.CategoryDao;
import com.insightfools.menschen.module.category.entity.Category;
import com.insightfools.menschen.module.event.dao.EventDao;
import com.insightfools.menschen.module.event.entity.Event;
import com.insightfools.menschen.module.event.service.EventService;

public class EventServiceImpl implements EventService {

    @Inject
    private EventDao eventDao;

    @Inject
    private CategoryDao categoryDao;

    public void eventFunctions(Long userId, Long eventId, String name, String title, String description, String address, Long categoryId)
            throws SaveFailException, NotFoundException {
        Category category = categoryDao.findByPk(categoryId);
        Event event = eventDao.findByPk(eventId);
        if (event == null) {
            saveEvent(userId, name, title, description, address, category);
        } else {
            if (event.getCreatedBy().equals(userId)) {
                mergeEvent(event, name, title, description, category, address);
            } else {
                throw new NotFoundException();
            }
        }
    }

    private Event saveEvent(Long userId, String name, String title, String description, String address, Category category)
            throws SaveFailException {
        Event event = new Event();
        event.setAddress(address);
        event.setCategory(category);
        event.setCreatedBy(userId);
        event.setDescription(description);
        event.setName(name);
        event.setTitle(title);
        event.setStatus(Boolean.FALSE);
        return eventDao.persist(event);
    }

    private Event mergeEvent(Event event, String name, String title, String description, Category category, String address)
            throws SaveFailException {
        event.setAddress(address);
        event.setCategory(category);
        event.setDescription(description);
        event.setName(name);
        event.setTitle(title);
        return eventDao.merge(event);
    }
}