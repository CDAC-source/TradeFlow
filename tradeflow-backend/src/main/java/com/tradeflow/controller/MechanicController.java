package com.tradeflow.controller;

import com.tradeflow.entity.Mechanic;
import com.tradeflow.repository.MechanicRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mechanics")
@CrossOrigin(origins = "http://localhost:5173")
public class MechanicController {

    private final MechanicRepository repo;

    public MechanicController(MechanicRepository repo) {
        this.repo = repo;
    }

    // ✅ GET ALL
    @GetMapping
    public List<Mechanic> getAll() {
        return repo.findAll();
    }

    // ✅ GET BY ID (USED IN FRONTEND)
    @GetMapping("/{id}")
    public Mechanic getById(@PathVariable Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Mechanic not found"));
    }

    // ✅ CREATE
    @PostMapping
    public Mechanic create(@RequestBody Mechanic mechanic) {
        return repo.save(mechanic);
    }

    // ✅ UPDATE
    @PutMapping("/{id}")
    public Mechanic update(@PathVariable Long id, @RequestBody Mechanic updated) {
        Mechanic m = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Mechanic not found"));

        m.setName(updated.getName());
        m.setPhone(updated.getPhone());

        return repo.save(m);
    }

    // ✅ DELETE
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}
