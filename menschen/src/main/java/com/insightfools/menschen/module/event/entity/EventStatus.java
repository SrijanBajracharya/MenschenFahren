package com.insightfools.menschen.module.event.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.insightfools.menschen.orm.BaseEntity;

/**
 * 
 * @author Srijan Bajracharya<srijan.bajracharya@gmail.com>
 *
 */
@Entity
@Table(name = "event_status")
public class EventStatus extends BaseEntity implements Serializable {

    private static final long serialVersionUID = 4246393217135767597L;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "dropdown_order")
    private Integer dropdownOrder;

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

    @Override
    public String toString() {
        return "EventStatus [name=" + name + ", description=" + description + ", dropdownOrder=" + dropdownOrder + "]";
    }

}
