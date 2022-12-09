package com.purrfect.store.controller;


import com.purrfect.store.repository.ProductRepository;
import com.purrfect.store.repository.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path="/products")
public class ProductController {
    final ProductRepository productRepository;

    public ProductController(@Autowired ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping()
    public Iterable<Product> getProducts(){
        return productRepository.findAll();
    }

}
