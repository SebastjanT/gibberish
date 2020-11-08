package org.gibberishserver.repositories;

import org.gibberishserver.models.Device;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeviceRepository extends JpaRepository<Device, Long>{
    
}
