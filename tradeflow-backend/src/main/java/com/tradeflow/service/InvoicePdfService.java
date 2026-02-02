package com.tradeflow.service;

import java.io.ByteArrayOutputStream;

import org.springframework.stereotype.Service;

import com.lowagie.text.*;
import com.lowagie.text.pdf.*;
import com.tradeflow.entity.Invoice;
import com.tradeflow.entity.InvoiceItem;

@Service
public class InvoicePdfService {

    public byte[] generate(Invoice invoice) throws Exception {

        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        PdfWriter.getInstance(document, out);
        document.open();

        // Header (company details)
        Font h1 = new Font(Font.HELVETICA, 14, Font.BOLD);
        Font normal = new Font(Font.HELVETICA, 11);
        document.add(new Paragraph(invoice.getCompanyName(), h1));
        document.add(new Paragraph(invoice.getCompanyAddress(), normal));
        document.add(new Paragraph(" "));

        // Invoice meta
        document.add(new Paragraph("Invoice No: " + invoice.getInvoiceNumber()));
        document.add(new Paragraph("Date: " + invoice.getInvoiceDate()));
        document.add(new Paragraph("Customer: " + invoice.getCustomer().getName()));
        document.add(new Paragraph(" "));

        PdfPTable table = new PdfPTable(4);
        table.setWidthPercentage(100);
        table.setWidths(new int[]{6, 2, 1, 2});
        table.addCell("Item");
        table.addCell("Rate");
        table.addCell("Qty");
        table.addCell("Amount");

        if (invoice.getItems() != null) {
            for (InvoiceItem i : invoice.getItems()) {
                String itemName = "";
                if (i.getMachine() != null) itemName = i.getMachine().getName();
                else if (i.getSparePart() != null) itemName = i.getSparePart().getName();
                table.addCell(itemName);
                table.addCell("₹" + i.getRate());
                table.addCell(String.valueOf(i.getQuantity()));
                table.addCell("₹" + i.getAmount());
            }
        }

        document.add(table);
        document.add(new Paragraph(" "));

        document.add(new Paragraph("Subtotal: ₹" + invoice.getSubtotal(), normal));
        document.add(new Paragraph("Discount (" + invoice.getDiscountPercent() + "%): -₹" + invoice.getDiscountAmount(), normal));

        if ("CGST_SGST".equals(invoice.getGstType())) {
            document.add(new Paragraph("CGST: ₹" + invoice.getCgst(), normal));
            document.add(new Paragraph("SGST: ₹" + invoice.getSgst(), normal));
        } else {
            document.add(new Paragraph("IGST: ₹" + invoice.getIgst(), normal));
        }

        document.add(new Paragraph("Total: ₹" + invoice.getTotalAmount(), h1));
        document.close();

        return out.toByteArray();
    }
}
