package com.insightfools.menschen.module.event.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

import com.insightfools.menschen.orm.BaseEntity;

/**
 * 
 * @author Srijan Bajracharya<srijan.bajracharya@gmail.com>
 *
 */
@Entity
@Table(name = "event_photo")
@NamedQueries({ @NamedQuery(name = EventPhoto.FIND_ALL, query = EventPhoto.FIND_ALL_QUERY) })
public class EventPhoto extends BaseEntity implements Serializable {

    private static final long serialVersionUID = -5171771351140865073L;

    public static final String PREFIX = "event.eventPhoto";
    public static final String FIND_ALL = PREFIX + "findAll";
    public static final String FIND_ALL_QUERY = "SELECT ep FROM EventPhoto ep";

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
