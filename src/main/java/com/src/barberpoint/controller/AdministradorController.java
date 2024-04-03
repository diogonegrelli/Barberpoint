package com.src.barberpoint.controller;

import com.src.barberpoint.model.Administrador;
import com.src.barberpoint.service.AdministradorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/administradores")
public class AdministradorController {

    @Autowired
    private AdministradorService administradorService;

    @GetMapping
    public List<Administrador> getAllAdministradores() {
        return administradorService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Administrador> getAdministradorById(@PathVariable Long id) {
        return administradorService.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Administrador createAdministrador(@RequestBody Administrador administrador) {
        return administradorService.save(administrador);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Administrador> updateAdministrador(@PathVariable Long id,
            @RequestBody Administrador administradorDetails) {
        return administradorService.findById(id)
                .map(administrador -> {
                    administrador.setNomeUsuario(administradorDetails.getNomeUsuario());
                    administrador.setSenha(administradorDetails.getSenha());
                    Administrador updatedAdministrador = administradorService.save(administrador);
                    return ResponseEntity.ok(updatedAdministrador);
                }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAdministrador(@PathVariable Long id) {
        return administradorService.findById(id)
                .map(administrador -> {
                    administradorService.deleteById(id);
                    return ResponseEntity.ok().build();
                }).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
