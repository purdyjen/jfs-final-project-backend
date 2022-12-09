package com.purrfect.store.repository;

import com.purrfect.store.repository.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Integer> {
}
