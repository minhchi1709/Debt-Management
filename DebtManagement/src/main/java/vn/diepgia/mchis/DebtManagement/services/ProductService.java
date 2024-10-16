package vn.diepgia.mchis.DebtManagement.services;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import vn.diepgia.mchis.DebtManagement.models.Invoice;
import vn.diepgia.mchis.DebtManagement.models.Product;
import vn.diepgia.mchis.DebtManagement.models.Specification;
import vn.diepgia.mchis.DebtManagement.models.InvoiceLine;
import vn.diepgia.mchis.DebtManagement.repositories.InvoiceRepository;
import vn.diepgia.mchis.DebtManagement.repositories.ProductRepository;
import vn.diepgia.mchis.DebtManagement.repositories.SpecificationRepository;
import vn.diepgia.mchis.DebtManagement.repositories.InvoiceLineRepository;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final SpecificationRepository specificationRepository;
    private final InvoiceLineRepository invoiceLineRepository;
    private final InvoiceRepository invoiceRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public String createProduct(Product product) {
        if (productRepository.findByProductId(product.getProductId()).isPresent()) {
            throw new RuntimeException(String.format("Mã sản phẩm %s đã tồn tại!", product.getId()));
        }
        return productRepository.save(
                Product.builder()
                        .productId(product.getProductId())
                        .specifications(product.getSpecifications())
                        .name(product.getName())
                        .build()
        ).getProductId();
    }

    public Product getProductById(String id) {
        return productRepository.findByProductId(id).orElseThrow(
                () -> new EntityNotFoundException(String.format("Mã sản phẩm %s không tồn tại!", id))
        );
    }

    public String updateProduct(
            String id,
            Product request
    ) {
        Product product = getProductById(id);
        product.setProductId(request.getProductId());
        product.setName(request.getName());
        product.setSpecifications(request.getSpecifications());
        productRepository.save(product);
        for (InvoiceLine invoiceLine: invoiceLineRepository.findAll().stream().filter(line -> line.getProduct().getProductId().equals(id)).toList()) {
            invoiceLine.calculateTotal();
            invoiceLineRepository.save(invoiceLine);
        }
        for (Invoice invoice: invoiceRepository.findAll()) {
            invoice.calculateTotal();
            invoiceRepository.save(invoice);
        }
        return product.getProductId();
    }

    public void deleteProduct(String id) {
        Product product = getProductById(id);
        for (Invoice invoice: invoiceRepository.findAll()){
            List<InvoiceLine> filteredInvoiceLines = invoice.getInvoiceLines()
                    .stream().filter(t -> t.getProduct().getProductId().equals(id)).toList();
            List<InvoiceLine> invoiceLines = invoice.getInvoiceLines();
            invoiceLines.removeAll(filteredInvoiceLines);
            invoice.setInvoiceLines(invoiceLines);
            invoiceRepository.save(invoice);
            invoiceLineRepository.deleteAll(filteredInvoiceLines);
        }
        specificationRepository.deleteAll(product.getSpecifications());
        productRepository.delete(product);
    }

    public List<String> getAllProductIds() {
        return getAllProducts()
                .stream()
                .map(Product::getProductId)
                .toList();
    }

    public void deleteSpecification(String id, Integer specificationId) {
        Product product = getProductById(id);
        Specification specification = specificationRepository.findById(specificationId).orElseThrow(
                () -> new EntityNotFoundException("Không tìm thấy quy cách")
        );
        if (!product.getSpecifications().contains(specification)) {
            throw new EntityNotFoundException("Không tìm thấy quy cách");
        }
        List<Specification> specifications = product.getSpecifications();
        specifications.remove(specification);
        product.setSpecifications(specifications);
        productRepository.save(product);
        specificationRepository.delete(specification);
    }

    public List<Specification> getAllSpecifications() {
        return specificationRepository.findAll();
    }
}
