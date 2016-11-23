package com.insightfools.menschen.module.user.service.impl;

import javax.inject.Inject;

import com.insightfools.menschen.exception.NotFoundException;
import com.insightfools.menschen.exception.SaveFailException;
import com.insightfools.menschen.module.event.dao.EventDao;
import com.insightfools.menschen.module.event.entity.Event;
import com.insightfools.menschen.module.user.dao.UserInterestDao;
import com.insightfools.menschen.module.user.dao.UserProfileDao;
import com.insightfools.menschen.module.user.entity.UserInterest;
import com.insightfools.menschen.module.user.entity.UserProfile;

/**
 * 
 * @author Srijan Bajracharya<srijan.bajracharya@gmail.com>
 *
 */
public class UserInterestServiceImpl {

    @Inject
    private UserProfileDao userProfileDao;

    @Inject
    private UserInterestDao userInterestDao;

    @Inject
    private EventDao eventDao;

    public void userInterestFunctions(Long userId, Long eventId) throws NotFoundException, SaveFailException {
        UserProfile userProfile = userProfileDao.findByPk(userId);
        Event event = eventDao.findByPk(eventId);
        if (event == null) {
            saveUserInterest(event, userProfile);
        } else {
            UserInterest userInterest = userInterestDao.findByEventId(eventId);
            if (userInterest != null) {
                mergeUserInterest(event, userInterest, userProfile);
            } else {
                throw new NotFoundException();
            }
        }

    }

    /**
     * sets different elements of {@link UserInterest} and saves {@link UserInterest}s
     * 
     * @param event
     * @param userProfile
     * @return
     * @throws SaveFailException
     */
    private UserInterest saveUserInterest(Event event, UserProfile userProfile) throws SaveFailException {
        UserInterest userInterest = new UserInterest();
        userInterest.setEvent(event);
        userInterest.setStatus(Boolean.FALSE);
        userInterest.setUserProfile(userProfile);
        return userInterestDao.persist(userInterest);
    }

    /**
     * Handles Merge Functionality of {@link UserInterest}
     * 
     * @param event
     * @param userInterest
     * @param userProfile
     * @return
     * @throws SaveFailException
     */
    private UserInterest mergeUserInterest(Event event, UserInterest userInterest, UserProfile userProfile) throws SaveFailException {
        userInterest.setEvent(event);
        userInterest.setUserProfile(userProfile);
        return userInterestDao.merge(userInterest);
    }

}
