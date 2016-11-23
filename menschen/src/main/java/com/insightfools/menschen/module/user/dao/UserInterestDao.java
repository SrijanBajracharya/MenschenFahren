package com.insightfools.menschen.module.user.dao;

import java.time.LocalDateTime;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.inject.Inject;
import javax.interceptor.Interceptors;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;

import com.insightfools.menschen.exception.DeleteFailException;
import com.insightfools.menschen.exception.NotFoundException;
import com.insightfools.menschen.exception.SaveFailException;
import com.insightfools.menschen.logger.LogMaker;
import com.insightfools.menschen.module.user.entity.UserInterest;
import com.insightfools.menschen.orm.GenericDao;

@Interceptors({ LogMaker.class })
public class UserInterestDao implements GenericDao<UserInterest, Long> {

    @Inject
    private EntityManager em;

    @Inject
    private Logger logger;

    @Override
    public UserInterest persist(UserInterest userInterest) throws SaveFailException {
        userInterest.setRecordedAt(LocalDateTime.now());
        em.persist(userInterest);
        em.flush();
        return userInterest;
    }

    @Override
    public UserInterest merge(UserInterest userInterest) throws SaveFailException {
        userInterest.setRecordedAt(LocalDateTime.now());
        em.merge(userInterest);
        em.flush();
        return userInterest;
    }

    @Override
    public void remove(UserInterest userInterest) throws DeleteFailException {
        em.remove(userInterest);
    }

    @Override
    public void remove(Long id) throws DeleteFailException {
        UserInterest userInterest = em.getReference(UserInterest.class, id);
        em.remove(userInterest);
    }

    @Override
    public List<UserInterest> findAll() {
        return em.createNamedQuery(UserInterest.FIND_ALL, UserInterest.class).getResultList();
    }

    @Override
    public UserInterest findByPk(Long id) throws NotFoundException {
        return em.find(UserInterest.class, id);
    }

    public UserInterest findByEventId(Long eventId) {
        try {
            return em.createNamedQuery(UserInterest.FIND_BY_EVENT_ID, UserInterest.class).setParameter("eventId", eventId)
                    .getSingleResult();
        } catch (NoResultException e) {
            logger.log(Level.SEVERE, "NoResultException: UserInterest Entity not found from eventId", e);
            return null;
        }

    }

}
