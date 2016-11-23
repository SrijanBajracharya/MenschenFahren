package com.insightfools.menschen.module.user.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

import com.insightfools.menschen.module.event.entity.Event;
import com.insightfools.menschen.orm.BaseEntity;

/**
 * 
 * @author Srijan Bajracharya<srijanbajracharya@lftechnology.com>
 *
 */
@Entity
@Table(name = "user_interest")
@NamedQueries({ @NamedQuery(name = UserInterest.FIND_ALL, query = UserInterest.FIND_ALL_QUERY),
        @NamedQuery(name = UserInterest.FIND_BY_EVENT_ID, query = UserInterest.FIND_BY_EVENT_ID_QUERY) })
public class UserInterest extends BaseEntity implements Serializable {

    private static final long serialVersionUID = -101989028138457982L;

    public static final String PREFIX = "user.userInterest";
    public static final String FIND_ALL = PREFIX + "findAll";
    public static final String FIND_ALL_QUERY = "SELECT ui FROM UserInterest ui";

    public static final String FIND_BY_EVENT_ID = PREFIX + "findByEventId";
    public static final String FIND_BY_EVENT_ID_QUERY = "SELECT ui FROM UserInterest ui WHERE ui.event.id=:eventId";

    @ManyToOne
    @JoinColumn(name = "user_profile_id", referencedColumnName = "id")
    private UserProfile userProfile;

    @ManyToOne
    @JoinColumn(name = "event_id", referencedColumnName = "id")
    private Event event;

    @Column(name = "status")
    private Boolean status;

    public UserInterest() {

    }

    public UserProfile getUserProfile() {
        return userProfile;
    }

    public void setUserProfile(UserProfile userProfile) {
        this.userProfile = userProfile;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "UserInterest [userProfile=" + userProfile + ", event=" + event + ", status=" + status + "]";
    }

}
