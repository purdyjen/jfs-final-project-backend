package com.purrfect.store.service;

import com.purrfect.store.repository.ProductRepository;
import com.purrfect.store.repository.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    public ProductService(@Autowired ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Product save(Product product) {
        return productRepository.save(product);
    }
    public void delete (int productId) {
        productRepository.deleteById(productId);
    }
    public List<Product> all() {
        return productRepository.findAll();
    }
    public Product findById(int productId) {
        Optional<Product> product = productRepository.findById(productId);
        boolean isPresent = product.isPresent();
        if (isPresent) {
            return product.get();
        } else {
            return null;
        }
    }
}
