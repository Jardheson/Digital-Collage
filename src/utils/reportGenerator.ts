import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import type { Order, User } from "../context/SettingsContext";
import type { Product } from "../types/Product";

export type ReportType = "sales" | "products" | "customers";

interface ReportData {
  orders: Order[];
  users: User[];
  products: Product[];
  period: string;
  type: ReportType;
}

const formatCurrency = (value: number) =>
  `R$ ${value.toFixed(2).replace(".", ",")}`;

export const generatePDF = (data: ReportData) => {
  const doc = new jsPDF();
  const date = new Date().toLocaleDateString("pt-BR");
  const title =
    data.type === "sales"
      ? "Relatório de Vendas"
      : data.type === "products"
        ? "Relatório de Produtos"
        : "Relatório de Clientes";

  doc.setFontSize(20);
  doc.setTextColor(201, 32, 113); // Primary Color
  doc.text(`Digital Store - ${title}`, 14, 22);

  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Gerado em: ${date}`, 14, 28);
  doc.text(`Período: ${data.period}`, 14, 33);

  if (data.type === "sales") {
    const totalRevenue = data.orders.reduce(
      (acc, order) => acc + order.total,
      0,
    );

    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text("Resumo Financeiro", 14, 45);

    const summaryData = [
      ["Total de Pedidos", data.orders.length.toString()],
      ["Receita Total", formatCurrency(totalRevenue)],
      [
        "Ticket Médio",
        formatCurrency(
          data.orders.length ? totalRevenue / data.orders.length : 0,
        ),
      ],
    ];

    autoTable(doc, {
      startY: 50,
      head: [["Métrica", "Valor"]],
      body: summaryData,
      theme: "striped",
      headStyles: { fillColor: [201, 32, 113] },
    });

    const lastY = (doc as any).lastAutoTable.finalY + 15;
    doc.text("Detalhamento de Pedidos", 14, lastY);

    const orderRows = data.orders.map((order) => [
      order.id,
      order.customer,
      order.date,
      order.status,
      formatCurrency(order.total),
    ]);

    autoTable(doc, {
      startY: lastY + 5,
      head: [["ID", "Cliente", "Data", "Status", "Total"]],
      body: orderRows,
      theme: "grid",
      headStyles: { fillColor: [66, 66, 66] },
    });
  } else if (data.type === "products") {
    doc.text("Lista de Produtos", 14, 45);

    const productRows = data.products.map((product) => [
      product.name,
      product.category,
      product.brand,
      formatCurrency(product.price),
      product.state,
    ]);

    autoTable(doc, {
      startY: 50,
      head: [["Nome", "Categoria", "Marca", "Preço", "Estado"]],
      body: productRows,
      theme: "grid",
      headStyles: { fillColor: [201, 32, 113] },
    });
  } else if (data.type === "customers") {
    doc.text("Base de Clientes", 14, 45);

    const userRows = data.users.map((user) => [
      user.name,
      user.email,
      user.phone,
      user.role,
      user.status,
    ]);

    autoTable(doc, {
      startY: 50,
      head: [["Nome", "Email", "Telefone", "Tipo", "Status"]],
      body: userRows,
      theme: "grid",
      headStyles: { fillColor: [201, 32, 113] },
    });
  }

  doc.save(`relatorio-${data.type}-${Date.now()}.pdf`);
};

export const generateExcel = (data: ReportData) => {
  const workbook = XLSX.utils.book_new();

  if (data.type === "sales") {
    const orderData = data.orders.map((order) => ({
      "ID do Pedido": order.id,
      Cliente: order.customer,
      Data: order.date,
      Status: order.status,
      "Valor Total": order.total,
    }));
    const ordersSheet = XLSX.utils.json_to_sheet(orderData);
    XLSX.utils.book_append_sheet(workbook, ordersSheet, "Vendas");
  } else if (data.type === "products") {
    const productData = data.products.map((product) => ({
      ID: product.id,
      Nome: product.name,
      Categoria: product.category,
      Marca: product.brand,
      Preço: product.price,
      "Preço Promo": product.priceDiscount || "-",
      Gênero: product.gender,
      Estado: product.state,
    }));
    const productsSheet = XLSX.utils.json_to_sheet(productData);
    XLSX.utils.book_append_sheet(workbook, productsSheet, "Produtos");
  } else if (data.type === "customers") {
    const userData = data.users.map((user) => ({
      ID: user.id,
      Nome: user.name,
      Email: user.email,
      Telefone: user.phone,
      Tipo: user.role,
      Status: user.status,
    }));
    const usersSheet = XLSX.utils.json_to_sheet(userData);
    XLSX.utils.book_append_sheet(workbook, usersSheet, "Clientes");
  }

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, `relatorio-${data.type}-${Date.now()}.xlsx`);
};

export const generateCSV = (data: ReportData) => {
  let headers: string[] = [];
  let rows: (string | number)[][] = [];

  if (data.type === "sales") {
    headers = ["ID", "Cliente", "Data", "Status", "Total"];
    rows = data.orders.map((order) => [
      order.id,
      order.customer,
      order.date,
      order.status,
      order.total.toFixed(2),
    ]);
  } else if (data.type === "products") {
    headers = ["ID", "Nome", "Categoria", "Marca", "Preço"];
    rows = data.products.map((product) => [
      product.id,
      `"${product.name}"`, 
      product.category,
      product.brand,
      product.price.toFixed(2),
    ]);
  } else if (data.type === "customers") {
    headers = ["ID", "Nome", "Email", "Telefone", "Status"];
    rows = data.users.map((user) => [
      user.id,
      `"${user.name}"`,
      user.email,
      user.phone,
      user.status,
    ]);
  }

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, `relatorio-${data.type}-${Date.now()}.csv`);
};
