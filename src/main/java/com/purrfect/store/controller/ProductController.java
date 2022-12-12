package com.purrfect.store.controller;


import com.purrfect.store.controller.dto.ProductDto;
import com.purrfect.store.repository.ProductRepository;
import com.purrfect.store.repository.entity.Product;
import com.purrfect.store.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@RequestMapping(path="/store")
public class ProductController {
    private final ProductRepository productRepository;
    private final ProductService productService;
    private final ProductModelAssembler assembler;
    public ProductController(@Autowired ProductRepository productRepository, @Autowired ProductService productService, ProductModelAssembler assembler) {
        this.productRepository = productRepository;
        this.productService = productService;
        this.assembler = assembler;
    }
    @GetMapping(path="/products")
    CollectionModel<EntityModel<Product>> all() {
        List<EntityModel<Product>> products = productRepository.findAll().stream()
                .map(assembler::toModel)
                .collect(Collectors.toList());

        return CollectionModel.of(products, linkTo(methodOn(ProductController.class).all()).withSelfRel());
    }

    @PostMapping("/products")
    ResponseEntity<?> newProduct(@RequestBody ProductDto productDto) {

        EntityModel<Product> entityModel = assembler.toModel(productRepository.save(new Product(productDto)));

        return ResponseEntity //
                .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri()) //
                .body(entityModel);
    }

    @GetMapping("/products/{id}")
    EntityModel<Product> one(@PathVariable Integer id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));
        return assembler.toModel(product);
    }

@PutMapping("/products/{id}")
ResponseEntity<?> replaceProduct(@RequestBody ProductDto productDto, @PathVariable Integer id) {

    Product updatedProduct = productRepository.findById(id) //
            .map(product -> {
                product.setName(productDto.getName());
                product.setDescription( productDto.getDescription() );
                product.setImageUrl( productDto.getImageUrl() );
                product.setImageAltText(productDto.getImageAltText());
                product.setPrice(productDto.getPrice());
                return productRepository.save(product);
            }) //
            .orElseThrow(() -> new ProductNotFoundException(id));

    EntityModel<Product> entityModel = assembler.toModel(updatedProduct);

    return ResponseEntity //
            .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri()) //
            .body(entityModel);
}

    @DeleteMapping("/products/{id}")
    ResponseEntity<?> deleteProduct(@PathVariable Integer id) {

        productRepository.deleteById(id);

        return ResponseEntity.noContent().build();
}
}
