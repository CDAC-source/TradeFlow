package com.tradeflow.controller;

import java.util.List;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.tradeflow.entity.Customer;
import com.tradeflow.repository.CustomerRepository;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "http://localhost:5173")
public class CustomerController {

    @Autowired
    private CustomerRepository customerRepository;

    // =========================
    // GET ALL CUSTOMERS
    // =========================
    @GetMapping
    public ResponseEntity<List<Customer>> getAllCustomers() {
        return ResponseEntity.ok(customerRepository.findAll());
    }

    // =========================
    // GET CUSTOMER BY ID
    // =========================
    @GetMapping("/{id}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable Long id) {
        return customerRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // =========================
    // ADD CUSTOMER
    // =========================
    @PostMapping
    public ResponseEntity<Customer> addCustomer(
            @Valid @RequestBody Customer customer) {

        Customer savedCustomer = customerRepository.save(customer);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCustomer);
    }

    // =========================
    // UPDATE CUSTOMER
    // =========================
    @PutMapping("/{id}")
    public ResponseEntity<Customer> updateCustomer(
            @PathVariable Long id,
            @Valid @RequestBody Customer updatedCustomer) {

        return customerRepository.findById(id)
                .map(existing -> {

                    existing.setName(updatedCustomer.getName());
                    existing.setEmail(updatedCustomer.getEmail());
                    existing.setPhone(updatedCustomer.getPhone());
                    existing.setAddress(updatedCustomer.getAddress());
                    existing.setCity(updatedCustomer.getCity());

                    Customer saved = customerRepository.save(existing);
                    return ResponseEntity.ok(saved);

                }).orElse(ResponseEntity.notFound().build());
    }

    // =========================
    // DELETE CUSTOMER
    // =========================
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable Long id) {

        if (!customerRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        customerRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
