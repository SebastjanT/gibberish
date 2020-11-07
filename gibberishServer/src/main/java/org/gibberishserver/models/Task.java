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

    @ManyToOne(fetch = FetchType.LAZY)
    @Column(name = "worker", nullable = false)
    private User worker_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @Column(name = "client", nullable = false)
    private User client_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @Column(name = "provider", nullable = false)
    private Provider provider_id;

    public Task() {
    }

    public Task(long task_id, Date date, String location, String status, double payment, User worker_id, User client_id, Provider provider_id) {
        this.task_id = task_id;
        this.date = date;
        this.location = location;
        this.status = status;
        this.payment = payment;
        this.worker_id = worker_id;
        this.client_id = client_id;
        this.provider_id = provider_id;
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

    public User getWorker_id() {
        return worker_id;
    }

    public User getClient_id() {
        return client_id;
    }

    public Provider getProvider_id() {
        return provider_id;
    }
}
