package com.tradeflow.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.tradeflow.entity.User;
import com.tradeflow.repository.UserRepository;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    // ===============================
    // GET ALL USERS
    // ===============================
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // ===============================
    // UPDATE USER ROLE (ADMIN ONLY)
    // ===============================
    @PutMapping("/users/{id}/role")
    public ResponseEntity<?> updateUserRole(
            @PathVariable Long id,
            @RequestBody Map<String, String> body
    ) {
        String newRole = body.get("role");

        if (newRole == null || (!newRole.equals("ADMIN") && !newRole.equals("USER"))) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Invalid role"));
        }

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 🔐 FIRST REGISTERED USER (LOWEST ID)
        Optional<User> firstUser = userRepository.findAll()
                .stream()
                .min((u1, u2) -> u1.getId().compareTo(u2.getId()));

        // 🚫 Prevent demoting FIRST USER
        if (firstUser.isPresent()
                && user.getId().equals(firstUser.get().getId())
                && newRole.equals("USER")) {

            return ResponseEntity.status(403)
                    .body(Map.of(
                            "message", "First registered user must always remain ADMIN"
                    ));
        }

        // 🚫 Prevent removing LAST ADMIN
        if ("ADMIN".equals(user.getRole()) && "USER".equals(newRole)) {
            long adminCount = userRepository.findAll()
                    .stream()
                    .filter(u -> "ADMIN".equals(u.getRole()))
                    .count();

            if (adminCount <= 1) {
                return ResponseEntity.status(403)
                        .body(Map.of(
                                "message", "At least one ADMIN must exist"
                        ));
            }
        }

        user.setRole(newRole);
        userRepository.save(user);

        return ResponseEntity.ok(
                Map.of(
                        "message", "Role updated successfully",
                        "userId", user.getId(),
                        "email", user.getEmail(),
                        "role", user.getRole()
                )
        );
    }
}
