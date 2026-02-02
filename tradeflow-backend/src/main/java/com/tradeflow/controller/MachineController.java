package com.tradeflow.controller;

import com.tradeflow.entity.Customer;
import com.tradeflow.entity.Machine;
import com.tradeflow.repository.CustomerRepository;
import com.tradeflow.repository.MachineRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/machines")
@CrossOrigin(origins = "http://localhost:5173")
public class MachineController {

    private final MachineRepository machineRepository;
    private final CustomerRepository customerRepository;

    public MachineController(
            MachineRepository machineRepository,
            CustomerRepository customerRepository) {
        this.machineRepository = machineRepository;
        this.customerRepository = customerRepository;
    }

    // =========================
    // GET ALL MACHINES
    // =========================
    @GetMapping
    public ResponseEntity<List<Machine>> getAll() {
        return ResponseEntity.ok(machineRepository.findAll());
    }

    // =========================
    // GET BY ID
    // =========================
    @GetMapping("/{id}")
    public ResponseEntity<Machine> getById(@PathVariable Long id) {
        return machineRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // =========================
    // CREATE
    // =========================
    @PostMapping
    public ResponseEntity<Machine> create(@RequestBody Machine machine) {

        if (machine.getCustomer() == null || machine.getCustomer().getId() == null) {
            return ResponseEntity.badRequest().build();
        }

        Customer customer = customerRepository
                .findById(machine.getCustomer().getId())
                .orElse(null);

        if (customer == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        machine.setCustomer(customer);

        if (machine.getPrice() == null) {
            machine.setPrice(0.0);
        }

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(machineRepository.save(machine));
    }


    // =========================
    // UPDATE
    // =========================
    @PutMapping("/{id}")
    public ResponseEntity<Machine> update(
            @PathVariable Long id,
            @RequestBody Machine updated) {

        return machineRepository.findById(id).map(machine -> {

            machine.setName(updated.getName());
            machine.setModel(updated.getModel());
            machine.setSerial(updated.getSerial());
            machine.setPurchaseDate(updated.getPurchaseDate());

            // ✅ ADD PRICE UPDATE
            machine.setPrice(updated.getPrice());

            if (updated.getCustomer() != null &&
                updated.getCustomer().getId() != null) {

                Customer customer = customerRepository
                        .findById(updated.getCustomer().getId())
                        .orElse(null);

                machine.setCustomer(customer);
            }

            return ResponseEntity.ok(machineRepository.save(machine));

        }).orElse(ResponseEntity.notFound().build());
    }

    // =========================
    // DELETE
    // =========================
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!machineRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        machineRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
