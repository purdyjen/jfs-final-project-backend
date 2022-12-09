package com.purrfect.store.controller;


import com.purrfect.store.controller.dto.ProductDto;
import com.purrfect.store.repository.ProductRepository;
import com.purrfect.store.repository.entity.Product;
import com.purrfect.store.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping(path="/product")
public class ProductController {
    final ProductRepository productRepository;
    final ProductService productService;
    public ProductController(@Autowired ProductRepository productRepository, @Autowired ProductService productService) {
        this.productRepository = productRepository;
        this.productService = productService;
    }

    @GetMapping(path="/all")
    public Iterable<Product> getProducts(){
        return productRepository.findAll();
    }

    @PostMapping
    public Product save( @RequestBody ProductDto productDto) {
        return productService.save( new Product( productDto ));
    }

    @GetMapping("/{id}")
    public Product findProductById(@PathVariable Integer id) {
        return productService.findById(id);
    }

    @PutMapping("/{id}")
    public Product update( @RequestBody ProductDto productDto, @PathVariable Integer id) {
        Product product = productService.findById(id);
        product.setName( productDto.getName());
        product.setDescription( productDto.getDescription() );
        product.setImageUrl( productDto.getImageUrl() );
        product.setImageAltText(productDto.getImageAltText());
        product.setPrice(productDto.getPrice());
        return productService.save( product );
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        productService.delete(id);
    }
}
