import express from "express";
import bodyParser from "body-parser";
import { PDFDocument, rgb } from "pdf-lib"; // Correct import for PDFDocument and rgb
import { Document, Packer, Paragraph, TextRun } from "docx";

const router = express.Router();

// Middleware to parse JSON
router.use(bodyParser.json());

// Route for PDF generation
router.post("/generate-pdf", async (req, res) => {
  try {
    const { text } = req.body;

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);

    // Add text to the page
    page.drawText(text, {
      x: 50,
      y: 350,
      size: 30,
      color: rgb(0, 0, 0),
    });

    // Serialize the PDF document to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();

    res.setHeader("Content-Type", "application/pdf");
    res.send(Buffer.from(pdfBytes));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route for DOC generation
router.post("/generate-doc", async (req, res) => {
  try {
    const { text } = req.body;

    const doc = new Document();
console.log(doc,'not');
  doc.addSection({
    properties: {},
    children: [
      new Paragraph({
        children: [new TextRun(text)],
      }),
    ],
  });

    const buffer = await Packer.toBuffer(doc);
console.log(buffer);
    res.setHeader("Content-Disposition", "attachment; filename=document.docx");
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
