package com.insightfools.menschen.module.event.dao;

import java.time.LocalDateTime;
import java.util.List;

import javax.inject.Inject;
import javax.interceptor.Interceptors;
import javax.persistence.EntityManager;

import com.insightfools.menschen.exception.DeleteFailException;
import com.insightfools.menschen.exception.NotFoundException;
import com.insightfools.menschen.exception.SaveFailException;
import com.insightfools.menschen.logger.LogMaker;
import com.insightfools.menschen.module.event.entity.Event;
import com.insightfools.menschen.orm.GenericDao;

@Interceptors({ LogMaker.class })
public class EventDao implements GenericDao<Event, Long> {

    @Inject
    private EntityManager em;

    @Override
    public Event persist(Event event) throws SaveFailException {
        event.setRecordedAt(LocalDateTime.now());
        em.persist(event);
        em.flush();
        return event;
    }

    @Override
    public Event merge(Event event) throws SaveFailException {
        event.setRecordedAt(LocalDateTime.now());
        em.merge(event);
        em.flush();
        return event;
    }

    @Override
    public void remove(Event event) throws DeleteFailException {
        em.remove(event);
    }

    @Override
    public void remove(Long id) throws DeleteFailException {
        Event event = em.getReference(Event.class, id);
        em.remove(event);
    }

    @Override
    public List<Event> findAll() {
        return em.createNamedQuery(Event.FIND_ALL, Event.class).getResultList();
    }

    @Override
    public Event findByPk(Long id) throws NotFoundException {
        return em.find(Event.class, id);
    }

}
