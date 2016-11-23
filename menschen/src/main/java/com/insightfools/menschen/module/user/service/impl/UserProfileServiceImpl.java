package com.insightfools.menschen.module.user.service.impl;

import javax.inject.Inject;

import com.insightfools.menschen.exception.NotFoundException;
import com.insightfools.menschen.exception.SaveFailException;
import com.insightfools.menschen.module.user.dao.UserProfileDao;
import com.insightfools.menschen.module.user.entity.UserProfile;
import com.insightfools.menschen.module.user.service.UserProfileService;

public class UserProfileServiceImpl implements UserProfileService {

    @Inject
    private UserProfileDao userProfileDao;

    @Override
    public void userProfileFunctions(Long userId, String firstName, String lastName, String address, String phoneNumber,
            String profilePhoto) throws SaveFailException, NotFoundException {
        UserProfile profileInfo = userProfileDao.findByPk(userId);
        if (profileInfo != null) {
            if (profileInfo.getFirstName().equals(firstName)) {
                mergeUserProfile(profileInfo, firstName, lastName, address, phoneNumber, profilePhoto);
            } else {
                throw new NotFoundException();
            }

        } else {
            saveUserProfile(firstName, lastName, address, phoneNumber, profilePhoto);
        }

    }

    private UserProfile saveUserProfile(String firstName, String lastName, String address, String phoneNumber, String profilePhoto)
            throws SaveFailException {
        UserProfile userProfile = new UserProfile();
        userProfile.setAddress(address);
        userProfile.setFirstName(firstName);
        userProfile.setLastName(lastName);
        userProfile.setStatus(Boolean.FALSE);
        if (!phoneNumber.isEmpty()) {
            userProfile.setPhoneNumber(phoneNumber);
        }
        if (!profilePhoto.isEmpty()) {
            userProfile.setProfilePhoto(profilePhoto);
        }
        return userProfileDao.persist(userProfile);
    }

    private UserProfile mergeUserProfile(UserProfile profileInfo, String firstName, String lastName, String address, String phoneNumber,
            String profilePhoto) throws SaveFailException {
        profileInfo.setAddress(address);
        profileInfo.setFirstName(firstName);
        profileInfo.setLastName(lastName);
        if (!phoneNumber.isEmpty()) {
            profileInfo.setPhoneNumber(phoneNumber);
        }
        if (!profilePhoto.isEmpty()) {
            profileInfo.setProfilePhoto(profilePhoto);
        }
        return userProfileDao.merge(profileInfo);
    }
}
