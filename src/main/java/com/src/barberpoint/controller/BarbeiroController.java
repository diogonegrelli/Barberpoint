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
    public Barbeiro createBarbeiro(@RequestBody Barbeiro barbeiro) {
        return barbeiroService.save(barbeiro);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Barbeiro> updateBarbeiro(@PathVariable Long id, @RequestBody Barbeiro barbeiroDetails) {
        return barbeiroService.findById(id)
                .map(barbeiro -> {
                    barbeiro.setNome(barbeiroDetails.getNome());
                    barbeiro.setSobrenome(barbeiroDetails.getSobrenome());
                    barbeiro.setSenha(barbeiroDetails.getSenha());
                    Barbeiro updatedBarbeiro = barbeiroService.save(barbeiro);
                    return ResponseEntity.ok(updatedBarbeiro);
                }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBarbeiro(@PathVariable Long id) {
        return barbeiroService.findById(id)
                .map(barbeiro -> {
                    barbeiroService.deleteById(id);
                    return ResponseEntity.ok().build();
                }).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
