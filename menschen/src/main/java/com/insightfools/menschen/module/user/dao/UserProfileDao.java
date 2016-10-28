package com.insightfools.menschen.module.user.dao;

import java.time.LocalDateTime;
import java.util.List;

import javax.inject.Inject;
import javax.persistence.EntityManager;

import com.insightfools.menschen.exception.DeleteFailException;
import com.insightfools.menschen.exception.NotFoundException;
import com.insightfools.menschen.exception.SaveFailException;
import com.insightfools.menschen.module.user.entity.UserProfile;
import com.insightfools.menschen.orm.GenericDao;

public class UserProfileDao implements GenericDao<UserProfile, Long> {

    @Inject
    private EntityManager em;

    @Override
    public UserProfile persist(UserProfile userProfile) throws SaveFailException {
        userProfile.setRecordedAt(LocalDateTime.now());
        em.persist(userProfile);
        em.flush();
        return userProfile;
    }

    @Override
    public UserProfile merge(UserProfile userProfile) throws SaveFailException {
        userProfile.setRecordedAt(LocalDateTime.now());
        em.merge(userProfile);
        em.flush();
        return userProfile;
    }

    @Override
    public void remove(UserProfile userProfile) throws DeleteFailException {
        em.remove(userProfile);
    }

    @Override
    public void remove(Long id) throws DeleteFailException {
        UserProfile userProfile = em.getReference(UserProfile.class, id);
        em.remove(userProfile);
    }

    @Override
    public List<UserProfile> findAll() {
        return em.createNamedQuery(UserProfile.FIND_ALL, UserProfile.class).getResultList();
    }

    @Override
    public UserProfile findByPk(Long id) throws NotFoundException {
        return em.find(UserProfile.class, id);
    }

}
