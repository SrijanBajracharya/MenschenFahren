package com.insightfools.menschen.module.event.entity;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 
 * @author Srijan Bajracharya<srijanbajracharya@lftechnology.com>
 *
 */
@Entity
@Table(name = "event_status")
public class EventStatus implements Serializable {

    private static final long serialVersionUID = 4246393217135767597L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "dropdown_order")
    private Integer dropdownOrder;

    @Column(name = "recorded_at")
    private LocalDateTime recordedAt;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getDropdownOrder() {
        return dropdownOrder;
    }

    public void setDropdownOrder(Integer dropdownOrder) {
        this.dropdownOrder = dropdownOrder;
    }

    public LocalDateTime getRecordedAt() {
        return recordedAt;
    }

    public void setRecordedAt(LocalDateTime recordedAt) {
        this.recordedAt = recordedAt;
    }

    @Override
    public String toString() {
        return "EventStatus [id=" + id + ", name=" + name + ", description=" + description + ", dropdownOrder=" + dropdownOrder
                + ", recordedAt=" + recordedAt + "]";
    }

}
