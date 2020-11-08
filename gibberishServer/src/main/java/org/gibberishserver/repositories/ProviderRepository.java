package org.gibberishserver.repositories;

import org.gibberishserver.models.Provider;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProviderRepository extends JpaRepository<Provider, Long> {

}
