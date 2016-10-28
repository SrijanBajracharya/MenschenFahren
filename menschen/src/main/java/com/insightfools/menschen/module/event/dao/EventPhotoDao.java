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
import com.insightfools.menschen.module.event.entity.EventPhoto;
import com.insightfools.menschen.orm.GenericDao;

@Interceptors({ LogMaker.class })
public class EventPhotoDao implements GenericDao<EventPhoto, Long> {

    @Inject
    private EntityManager em;

    @Override
    public EventPhoto persist(EventPhoto eventPhoto) throws SaveFailException {
        eventPhoto.setRecordedAt(LocalDateTime.now());
        em.persist(eventPhoto);
        em.flush();
        return eventPhoto;
    }

    @Override
    public EventPhoto merge(EventPhoto eventPhoto) throws SaveFailException {
        eventPhoto.setRecordedAt(LocalDateTime.now());
        em.merge(eventPhoto);
        em.flush();
        return eventPhoto;
    }

    @Override
    public void remove(EventPhoto eventPhoto) throws DeleteFailException {
        em.remove(eventPhoto);
    }

    @Override
    public void remove(Long id) throws DeleteFailException {
        EventPhoto eventPhoto = em.getReference(EventPhoto.class, id);
        em.remove(eventPhoto);
    }

    @Override
    public List<EventPhoto> findAll() {
        return em.createNamedQuery(EventPhoto.FIND_ALL, EventPhoto.class).getResultList();
    }

    @Override
    public EventPhoto findByPk(Long id) throws NotFoundException {
        return em.find(EventPhoto.class, id);
    }

}
