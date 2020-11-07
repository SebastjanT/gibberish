package org.gibberishserver.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.gibberishserver.models.Tutorial;
import java.util.List;

public interface TutorialRepository extends JpaRepository<Tutorial, Long> {
  List<Tutorial> findByPublished(boolean published);
  List<Tutorial> findByTitleContaining(String title);
}
