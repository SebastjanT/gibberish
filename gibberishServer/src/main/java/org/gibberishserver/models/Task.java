package org.gibberishserver.models;

import java.sql.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "task")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long task_id;

    @Column(name = "date", nullable = false)
    private Date date;

    @Column(name = "location", nullable = false)
    private String location;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "payment", nullable = false)
    private double payment;

    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    private User worker;

    @ManyToOne(fetch = FetchType.LAZY)
    private User customer;

    @ManyToOne(fetch = FetchType.LAZY)
    private Provider provider;

    public Task() {
    }

    public Task(Date date, String location, String status, double payment, User worker, User customer, Provider provider) {
        this.date = date;
        this.location = location;
        this.status = status;
        this.payment = payment;
        this.worker = worker;
        this.customer = customer;
        this.provider = provider;
    }

    public long getTask_id() {
        return task_id;
    }

    public Date getDate() {
        return date;
    }

    public String getLocation() {
        return location;
    }

    public String getStatus() {
        return status;
    }

    public double getPayment() {
        return payment;
    }

    public User getWorker() {
        return worker;
    }

    public User getCustomer() {
        return customer;
    }

    public Provider getProvider() {
        return provider;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setWorker(User worker) {
        this.worker = worker;
    }
}
