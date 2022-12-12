package com.purrfect.store.controller;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

import com.purrfect.store.repository.entity.Product;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

@Component
class ProductModelAssembler implements RepresentationModelAssembler<Product, EntityModel<Product>> {

    @Override
    public EntityModel<Product> toModel(Product product) {

        return EntityModel.of(product, //
                linkTo(methodOn(ProductController.class).one(product.getId())).withSelfRel(),
                linkTo(methodOn(ProductController.class).all()).withRel("products"));
    }
}