package com.src.barberpoint.controller;

import com.src.barberpoint.model.Cliente;
import com.src.barberpoint.service.AgendamentoService;
import com.src.barberpoint.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/clientes")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @Autowired
    private AgendamentoService agendamentoService;

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
    public ResponseEntity<Cliente> createCliente(@RequestBody Cliente cliente) {
        Cliente novoCliente = clienteService.save(cliente);
        return new ResponseEntity<>(novoCliente, HttpStatus.CREATED);
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

    // @DeleteMapping("/{id}")
    // public ResponseEntity<?> deleteCliente(@PathVariable Long id) {
    // return clienteService.findById(id)
    // .map(cliente -> {
    // clienteService.deleteById(id);
    // return ResponseEntity.ok().build();
    // }).orElseGet(() -> ResponseEntity.notFound().build());
    // }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String senha = loginData.get("senha");

        Optional<Cliente> cliente = clienteService.autenticar(email, senha);

        if (cliente.isPresent()) {
            return ResponseEntity.ok(cliente.get());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email ou senha inválidos.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCliente(@PathVariable Long id) {
        if (agendamentoService.existsByClienteId(id)) {
            return ResponseEntity.status(409).build(); // Conflito - Cliente tem agendamentos
        }
        clienteService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}/with-agendamentos")
    public ResponseEntity<Void> deleteClienteWithAgendamentos(@PathVariable Long id) {
        agendamentoService.deleteByClienteId(id);
        clienteService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
