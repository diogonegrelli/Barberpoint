package com.src.barberpoint.controller;

import com.src.barberpoint.model.Barbeiro;
import com.src.barberpoint.service.BarbeiroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/barbeiros")
public class BarbeiroController {

    @Autowired
    private BarbeiroService barbeiroService;

    @GetMapping
    public List<Barbeiro> getAllBarbeiros() {
        return barbeiroService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Barbeiro> getBarbeiroById(@PathVariable Long id) {
        return barbeiroService.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Barbeiro> createBarbeiro(@RequestBody Barbeiro barbeiro) {
        Barbeiro savedBarbeiro = barbeiroService.save(barbeiro);
        return ResponseEntity.ok(savedBarbeiro);
    }
}