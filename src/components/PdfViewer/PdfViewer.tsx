import React from "react";
import { pdfjs, Document, Page } from "react-pdf";
import pdfFile from "../../assets/Brief.pdf";
import "./PdfViewer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface Props {}

const PdfViewer: React.FC<Props> = () => {
  const [numPages, setNumPages] = React.useState<number>(0);
  const [pageNumber, setPageNumber] = React.useState<number>(1);

  function onDocumentLoadSuccess(numPages: number) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset: number) {
    const newPage = pageNumber + offset;

    if (newPage > 0 && newPage <= numPages) {
      setPageNumber(newPage);
    }
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <Document
      // file="http://www.africau.edu/images/default/sample.pdf"
      file={pdfFile}
      onLoadSuccess={(pdf) => onDocumentLoadSuccess(pdf.numPages)}
      // renderMode="svg"
    >
      <div className="document-container">
        <div>
          <Page
            pageNumber={pageNumber}
            width={447}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            className="document-page"
          />
        </div>
        <div className="document-page-control-container">
          <span className="document-page-control-button" onClick={previousPage}>
            {"<"}
          </span>
          <span>
            Page {pageNumber || (numPages ? 1 : "--")} / {numPages || "--"}
          </span>
          <span className="document-page-control-button" onClick={nextPage}>
            {">"}
          </span>
        </div>
      </div>
    </Document>
  );
};

export default PdfViewer;
