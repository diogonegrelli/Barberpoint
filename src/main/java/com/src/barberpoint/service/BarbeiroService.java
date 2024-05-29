package com.src.barberpoint.service;

import com.src.barberpoint.model.Barbeiro;
import com.src.barberpoint.repository.BarbeiroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BarbeiroService {

    @Autowired
    private BarbeiroRepository barbeiroRepository;

    public List<Barbeiro> findAll() {
        return barbeiroRepository.findAll();
    }

    public Optional<Barbeiro> findById(Long id) {
        return barbeiroRepository.findById(id);
    }

    public Barbeiro save(Barbeiro barbeiro) {
        return barbeiroRepository.save(barbeiro);
    }

    public boolean deleteById(Long id) {
        if (barbeiroRepository.existsById(id)) {
            barbeiroRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}
