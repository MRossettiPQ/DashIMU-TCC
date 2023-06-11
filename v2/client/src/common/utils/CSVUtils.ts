import NotifyUtils from 'src/common/utils/NotifyUtils';
import { GyroMeasurementUtil } from 'src/common/utils/SessionController/GyroMeasurementUtil';

export interface CsvData {
  [key: string]: string | number | unknown; // Define os tipos das propriedades do objeto
}

declare global {
  interface Navigator {
    msSaveBlob: (blob: Blob, fileName: string) => boolean;
  }
}

class BlobDownloader {
  download(
    content: string | BlobPart[],
    filename = 'filename',
    options?: BlobPropertyBag
  ): void {
    let blob = null;
    if (typeof content === 'string') {
      blob = new Blob([content], options);
    } else {
      blob = new Blob(content, options);
    }

    if (navigator.msSaveBlob) {
      // Para o Internet Explorer
      navigator.msSaveBlob(blob, filename);
    } else {
      // Para outros navegadores
      const link = document.createElement('a');
      if (link.download != undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }
}

class ExportCSV {
  notify = NotifyUtils;

  loading = false;

  convertAndExport(
    data: (CsvData | GyroMeasurementUtil)[],
    filename = 'csvFile'
  ) {
    this.downloadCsv(this.convertToCsv(data), filename);
  }

  convertToCsv(data: (CsvData | GyroMeasurementUtil)[]): string {
    const csvRows: string[] = [];

    // Obter os cabeçalhos do CSV
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(','));

    // Converter cada objeto em uma linha do CSV
    for (const obj of data) {
      if (typeof obj === 'object') {
        const values = headers.map((header) => {
          const cellValue =
            obj[header as keyof (CsvData | GyroMeasurementUtil)] || '';
          return typeof cellValue === 'string' ? `"${cellValue}"` : cellValue;
        });
        csvRows.push(values.join(','));
      }
    }

    // Concatenar todas as linhas com quebras de linha
    return csvRows.join('\n');
  }

  downloadCsv(csvContent: string | BlobPart[], filename = 'csvFile'): void {
    const blob = new BlobDownloader();
    blob.download(csvContent, filename);
  }
}
export { ExportCSV, BlobDownloader };
