package com.src.barberpoint.service;

import com.src.barberpoint.model.Cliente;
import com.src.barberpoint.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    public List<Cliente> findAll() {
        return clienteRepository.findAll();
    }

    public Optional<Cliente> findById(Long id) {
        return clienteRepository.findById(id);
    }

    public Cliente save(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    public void deleteById(Long id) {
        clienteRepository.deleteById(id);
    }

    public Optional<Cliente> autenticar(String email, String senha) {
        Optional<Cliente> cliente = Optional.ofNullable(clienteRepository.findByEmail(email));
        if (cliente.isPresent() && cliente.get().getSenha().equals(senha)) {
            return cliente; // O cliente é autenticado com sucesso
        } else {
            return Optional.empty(); // Falha na autenticação
        }
    }

}
