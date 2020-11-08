package org.gibberishserver.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "devices")
public class Device {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long device_id;

    @Column(name = "device_number", nullable = false)
    private long device_number;

    @Column(name = "status", nullable = false)
    private String status;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    public Device() {
    }

    public Device(long device_number, String status, User user) {
        this.device_number = device_number;
        this.status = status;
        this.user = user;
    }

    public long getDevice_id() {
        return device_id;
    }

    public long getDevice_number() {
        return device_number;
    }

    public String getStatus() {
        return status;
    }

    public User getUser() {
        return user;
    }
}
