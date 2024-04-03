package com.src.barberpoint.repository;

import com.src.barberpoint.model.Barbeiro;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BarbeiroRepository extends JpaRepository<Barbeiro, Long> {
}
