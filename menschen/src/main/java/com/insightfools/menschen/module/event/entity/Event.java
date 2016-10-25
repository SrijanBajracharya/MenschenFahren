package com.insightfools.menschen.module.event.entity;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.insightfools.menschen.module.category.entity.Category;

@Entity
@Table(name = "event")
public class Event implements Serializable {

    private static final long serialVersionUID = 6105816132102574483L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private Category category;

    @Column(name = "event_address")
    private String address;

    @Column(name = "event_name")
    private String name;

    @Column(name = "event_title")
    private String title;

    @Column(name = "event_description")
    private String description;

    @Column(name = "event_url")
    private String url;

    @Column(name = "created_by")
    private Long createdBy;

    @Column(name = "status")
    private Boolean status;

    @Column(name = "recorded_at")
    private LocalDateTime recordedAt;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
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

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Long getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(Long createdBy) {
        this.createdBy = createdBy;
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

    @Override
    public String toString() {
        return "Event [id=" + id + ", category=" + category + ", address=" + address + ", name=" + name + ", title=" + title
                + ", description=" + description + ", url=" + url + ", createdBy=" + createdBy + ", status=" + status + ", recordedAt="
                + recordedAt + "]";
    }

}
