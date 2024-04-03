package com.src.barberpoint.controller;

import com.src.barberpoint.model.Cliente;
import com.src.barberpoint.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clientes")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @GetMapping
    public List<Cliente> getAllClientes() {
        return clienteService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cliente> getClienteById(@PathVariable Long id) {
        return clienteService.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Cliente createCliente(@RequestBody Cliente cliente) {
        return clienteService.save(cliente);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cliente> updateCliente(@PathVariable Long id, @RequestBody Cliente clienteDetails) {
        return clienteService.findById(id)
                .map(cliente -> {
                    cliente.setNome(clienteDetails.getNome());
                    cliente.setSobrenome(clienteDetails.getSobrenome());
                    cliente.setEmail(clienteDetails.getEmail());
                    cliente.setTelefone(clienteDetails.getTelefone());
                    cliente.setSenha(clienteDetails.getSenha());
                    Cliente updatedCliente = clienteService.save(cliente);
                    return ResponseEntity.ok(updatedCliente);
                }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCliente(@PathVariable Long id) {
        return clienteService.findById(id)
                .map(cliente -> {
                    clienteService.deleteById(id);
                    return ResponseEntity.ok().build();
                }).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
