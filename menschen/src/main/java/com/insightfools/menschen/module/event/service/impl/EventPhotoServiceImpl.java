package com.insightfools.menschen.module.event.service.impl;

import java.util.List;

import javax.inject.Inject;

import com.insightfools.menschen.exception.NotFoundException;
import com.insightfools.menschen.exception.SaveFailException;
import com.insightfools.menschen.module.event.dao.EventDao;
import com.insightfools.menschen.module.event.dao.EventPhotoDao;
import com.insightfools.menschen.module.event.entity.Event;
import com.insightfools.menschen.module.event.entity.EventPhoto;
import com.insightfools.menschen.module.event.service.EventPhotoService;

public class EventPhotoServiceImpl implements EventPhotoService {

    @Inject
    private EventPhotoDao eventPhotoDao;

    @Inject
    private EventDao eventDao;

    public void eventPhotoFunctions(Long eventId, List<String> photoUrls, List<Long> photoId) throws NotFoundException, SaveFailException {
        Event event = eventDao.findByPk(eventId);
        if (photoId.isEmpty()) {
            saveEventphoto(event, photoUrls);
        }
    }

    private void saveEventphoto(Event event, List<String> photoUrls) throws SaveFailException {
        for (String photoUrl : photoUrls) {
            EventPhoto eventPhoto = new EventPhoto();
            eventPhoto.setEvent(event);
            eventPhoto.setPhotoUrl(photoUrl);
            eventPhotoDao.persist(eventPhoto);
        }
    }

}
