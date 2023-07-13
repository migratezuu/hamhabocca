package com.hamhabocca.dallibocca.rally.repository;

import com.hamhabocca.dallibocca.rally.entity.RallyMate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RallyMateRepository extends JpaRepository<RallyMate, Long> {

    List<RallyMate> findAllByRallyId(long rallyId);

    RallyMate findByRallyIdAndMemberId(long rallyId, long memberId);

    List<RallyMate> findAllByMemberId(long currentMemberId);

    boolean existsByRallyIdAndMemberId(long rallyId, long memberId);
}
