package org.gibberishserver.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "provider")
public class Provider {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long provider_id;

    @Column(name = "location", nullable = false)
    private String location;

    @Column(name = "region_unit", nullable = false)
    private String region_unit;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "address", nullable = false)
    private String address;

    @Column(name = "phone", nullable = false)
    private String phone;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "website", nullable = false)
    private String website;

    public Provider() {
    }

    public Provider(long provider_id, String location, String region_unit, String name, String address, String phone, String email, String website) {
        this.provider_id = provider_id;
        this.location = location;
        this.region_unit = region_unit;
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.website = website;
    }

    public long getProvider_id() {
        return provider_id;
    }

    public String getLocation() {
        return location;
    }

    public String getRegion_unit() {
        return region_unit;
    }

    public String getName() {
        return name;
    }

    public String getAddress() {
        return address;
    }

    public String getPhone() {
        return phone;
    }

    public String getEmail() {
        return email;
    }

    public String getWebsite() {
        return website;
    }
}
