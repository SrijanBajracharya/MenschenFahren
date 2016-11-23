package com.insightfools.menschen.module.user.service;

import com.insightfools.menschen.exception.NotFoundException;
import com.insightfools.menschen.exception.SaveFailException;

public interface UserProfileService {

    /***
     * Handles all the functionality related to userProfile
     * 
     * @param userId
     * @param firstName
     * @param lastName
     * @param address
     * @param phoneNumber
     * @param profilePhoto
     * @throws SaveFailException
     */
    public void userProfileFunctions(Long userId, String firstName, String lastName, String address, String phoneNumber,
            String profilePhoto) throws SaveFailException, NotFoundException;

}
