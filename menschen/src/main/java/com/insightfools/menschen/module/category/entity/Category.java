package com.insightfools.menschen.module.category.entity;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@Table(name = "category")
@NamedQueries({ @NamedQuery(name = Category.FIND_ALL, query = Category.FIND_ALL_QUERY) })
public class Category implements Serializable {

    private static final long serialVersionUID = -4794797347059804500L;

    public static final String PREFIX = "category.category";
    public static final String FIND_ALL = PREFIX + "findAll";
    public static final String FIND_ALL_QUERY = "SELECT c FROM Category c";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "status")
    private Boolean status;

    @Column(name = "recorded_at")
    private LocalDateTime recordedAt;

    @Column(name = "dropdown_order")
    private Integer dropdownOrder;

    public Category() {

    }

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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public LocalDateTime getRecordedAt() {
        return recordedAt;
    }

    public void setRecordedAt(LocalDateTime recordedAt) {
        this.recordedAt = recordedAt;
    }

    public Integer getDropdownOrder() {
        return dropdownOrder;
    }

    public void setDropdownOrder(Integer dropdownOrder) {
        this.dropdownOrder = dropdownOrder;
    }

    @Override
    public String toString() {
        return "Category [id=" + id + ", name=" + name + ", title=" + title + ", description=" + description + ", status=" + status
                + ", recordedAt=" + recordedAt + ", dropdownOrder=" + dropdownOrder + "]";
    }

}
