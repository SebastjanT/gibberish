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
    @Column(name = "user", nullable = false)
    private User user_id;

    public Device() {
    }

    public Device(long device_id, long device_number, String status, User user_id) {
        this.device_id = device_id;
        this.device_number = device_number;
        this.status = status;
        this.user_id = user_id;
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

    public User getUser_id() {
        return user_id;
    }
}
