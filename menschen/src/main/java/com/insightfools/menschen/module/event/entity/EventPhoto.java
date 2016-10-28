package com.insightfools.menschen.module.event.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.insightfools.menschen.orm.BaseEntity;

/**
 * 
 * @author Srijan Bajracharya<srijanbajracharya@lftechnology.com>
 *
 */
@Entity
@Table(name = "event_photo")
public class EventPhoto extends BaseEntity implements Serializable {

    private static final long serialVersionUID = -5171771351140865073L;

    @ManyToOne
    @JoinColumn(name = "event_id", referencedColumnName = "id")
    private Event event;

    @Column(name = "url")
    private String photoUrl;

    public EventPhoto() {

    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

    @Override
    public String toString() {
        return "EventPhoto [event=" + event + ", photoUrl=" + photoUrl + "]";
    }

}
